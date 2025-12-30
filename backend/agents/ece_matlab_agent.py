from .base_agent import BaseAgent
from .theory_agent import TheoryAgent
from .code_generator_agent import CodeGeneratorAgent
from .code_explainer_agent import CodeExplainerAgent
from .latex_generator_agent import LaTeXGeneratorAgent
import json
import time
import threading
import os

# In-memory cache for practical results
PRACTICAL_CACHE = {}
CACHE_MAX_SIZE = 50  # Limit cache size to prevent memory issues
PRACTICAL_CACHE_LOCK = threading.Lock()

# Validation thresholds - configurable via environment variables
MIN_THEORY_LENGTH = int(os.getenv('MIN_THEORY_LENGTH', 50))
MIN_CODE_LENGTH = int(os.getenv('MIN_CODE_LENGTH', 20))
MIN_THEORY_WORDS = int(os.getenv('MIN_THEORY_WORDS', 20))  # approximate minimum word count

class ECEMatlabAgent(BaseAgent):
    # Main orchestrator: Theory -> Code -> Explain -> LaTeX
    # Parallel threads use karta hai speed ke liye
    
    def __init__(self):
        super().__init__("ECEMatlabAgent", "MATist Orchestrator")
        
        # Initialize all specialist agents
        self.theory_agent = TheoryAgent()
        self.code_generator_agent = CodeGeneratorAgent()
        self.code_explainer_agent = CodeExplainerAgent()
        self.latex_generator_agent = LaTeXGeneratorAgent()
    
    def _generate_theory_thread(self, topic: str, results: dict):
        # Thread worker - theory generate karta hai background mein
        try:
            print("[THREAD] Generating theory...")
            start = time.time()
            results['theory'] = self.theory_agent.explain_concept(topic)
            print(f"[THREAD] Theory finished in {time.time() - start:.2f}s")
        except Exception as e:
            results['theory_error'] = e
            print(f"[THREAD] Theory failed: {str(e)}")
    
    def _generate_brute_code_thread(self, topic: str, results: dict):
        # Thread worker - brute force code banata hai parallel mein
        try:
            print("[THREAD] Generating brute code...")
            start = time.time()
            # Pass minimal context initially; will be improved with theory later for better quality
            results['brute_code'] = self.code_generator_agent.generate_brute_force_code(topic, "")
            print(f"[THREAD] Brute code finished in {time.time() - start:.2f}s")
        except Exception as e:
            results['brute_code_error'] = e
            print(f"[THREAD] Brute code failed: {str(e)}")
    
    def process_practical(self, topic: str) -> dict:
        # Pura practical generate karta hai - theory, code, explanation, latex sab
        # --- Caching: Check if result exists ---
        normalized_topic = topic.strip().lower()
        with PRACTICAL_CACHE_LOCK:
            if normalized_topic in PRACTICAL_CACHE:
                print(f"[CACHE] HIT for topic: {topic}")
                return PRACTICAL_CACHE[normalized_topic]
        print(f"[CACHE] MISS for topic: {topic}")
        # --- End Caching Check ---
        
        results = {}  # Initialize results dict for thread communication
        
        try:
            print(f"[ECEMatlabAgent] Starting processing for topic: {topic}")
            start_time = time.time()  # Start global timer
            
            # Steps 1 & 2: Generate Theory and Brute-Force Code in Parallel
            print("[ECEMatlabAgent] Steps 1 & 2: Generating theory and brute-force code in parallel...")
            # results = {}  # Dictionary to store results from threads
            
            # Create threads for Step 1 and Step 2
            theory_thread = threading.Thread(target=self._generate_theory_thread, args=(topic, results), daemon=True)
            brute_code_thread = threading.Thread(target=self._generate_brute_code_thread, args=(topic, results), daemon=True)
            
            # Start both threads
            step1_2_start = time.time()
            theory_thread.start()
            brute_code_thread.start()
            
            # Wait for both threads to complete with timeout
            THREAD_TIMEOUT = 30  # seconds
            theory_thread.join(timeout=THREAD_TIMEOUT)
            brute_code_thread.join(timeout=THREAD_TIMEOUT)
            step1_2_duration = time.time() - step1_2_start
            print(f"[TIMER] Parallel Steps 1 & 2 took: {step1_2_duration:.2f} seconds")
            
            # Check for thread timeouts
            if theory_thread.is_alive():
                raise Exception(f"Theory generation thread timed out after {THREAD_TIMEOUT} seconds for topic: {topic}")
            if brute_code_thread.is_alive():
                raise Exception(f"Brute-force code generation thread timed out after {THREAD_TIMEOUT} seconds for topic: {topic}")
            
            # Check for errors from threads
            if 'theory_error' in results:
                raise results['theory_error']
            if 'brute_code_error' in results:
                raise results['brute_code_error']
            
            theory = results.get('theory')
            brute_force_code = results.get('brute_code')
            
            # Improve brute-force code quality by regenerating with theory context
            if theory and brute_force_code:
                try:
                    print("[ECEMatlabAgent] Regenerating brute-force code with theory context for better quality...")
                    improved_code = self.code_generator_agent.generate_brute_force_code(topic, theory)
                    if improved_code and len(improved_code.strip()) > 10:  # basic validation
                        brute_force_code = improved_code
                        results['brute_code'] = brute_force_code
                        print("[ECEMatlabAgent] Brute-force code improved with theory context")
                except Exception as e:
                    print(f"[ECEMatlabAgent] Failed to improve brute-force code: {e}")
                    # Keep original brute_force_code
            
            # Validate results
            theory_stripped = theory.strip() if theory else ""
            theory_length = len(theory_stripped)
            theory_words = len(theory_stripped.split()) if theory_stripped else 0
            
            if not theory or theory_length < MIN_THEORY_LENGTH or theory_words < MIN_THEORY_WORDS:
                raise Exception(f"Theory generation failed: Empty or too short response (length: {theory_length}, words: {theory_words}, min_length: {MIN_THEORY_LENGTH}, min_words: {MIN_THEORY_WORDS})")
            
            code_stripped = brute_force_code.strip() if brute_force_code else ""
            code_length = len(code_stripped)
            has_code_elements = '=' in code_stripped or '(' in code_stripped or '[' in code_stripped  # basic check for code-like content
            
            if not brute_force_code or code_length < MIN_CODE_LENGTH or not has_code_elements:
                raise Exception(f"Code generation failed: Empty, too short, or invalid response (length: {code_length}, has_code_elements: {has_code_elements}, min_length: {MIN_CODE_LENGTH})")
            
            # Step 3: Explain Brute-Force Code
            print("[ECEMatlabAgent] Step 3: Explaining brute-force code...")
            step3_start = time.time()
            brute_force_explanation = self.code_explainer_agent.explain_code(
                topic, brute_force_code, "brute-force"
            )
            step3_duration = time.time() - step3_start
            print(f"[TIMER] Step 3 (Brute Explain) took: {step3_duration:.2f} seconds")
            
            # Step 4: Generate Efficient Code (conditional)
            print("[ECEMatlabAgent] Step 4: Attempting to generate efficient code...")
            step4_start = time.time()
            efficient_code_response = self.code_generator_agent.generate_efficient_code(
                topic, brute_force_code
            )
            step4_duration = time.time() - step4_start
            print(f"[TIMER] Step 4 (Efficient Code) took: {step4_duration:.2f} seconds")
            
            # Check if optimization is applicable
            optimization_applicable = not (
                "no significant optimization" in efficient_code_response.lower() or
                "no optimization possible" in efficient_code_response.lower()
            )
            
            efficient_code = None
            efficient_explanation = None
            
            if optimization_applicable:
                print("[ECEMatlabAgent] Optimization applicable. Generating efficient code explanation...")
                efficient_code = efficient_code_response
                
                # Step 5: Explain Efficient Code
                step5_start = time.time()
                efficient_explanation = self.code_explainer_agent.explain_optimizations(
                    brute_force_code, efficient_code, topic
                )
                step5_duration = time.time() - step5_start
                print(f"[TIMER] Step 5 (Efficient Explain) took: {step5_duration:.2f} seconds")
            else:
                print("[ECEMatlabAgent] No significant optimization possible.")
            
            # Step 6: Generate LaTeX Report
            print("[ECEMatlabAgent] Step 6: Generating LaTeX report...")
            step6_start = time.time()
            final_code = efficient_code if optimization_applicable else brute_force_code
            
            latex_report = self.latex_generator_agent.generate_report(
                topic=topic,
                theory=theory,
                matlab_code=final_code,
                code_explanation=brute_force_explanation if not optimization_applicable else efficient_explanation,
                optimization_notes=efficient_explanation if optimization_applicable else ""
            )
            step6_duration = time.time() - step6_start
            print(f"[TIMER] Step 6 (LaTeX Report) took: {step6_duration:.2f} seconds")
            
            total_duration = time.time() - start_time
            print(f"[TIMER] Total processing time: {total_duration:.2f} seconds")
            print("[ECEMatlabAgent] Processing completed successfully!")
            
            result = {
                "topic": topic,
                "theory": theory,
                "brute_force_code": brute_force_code,
                "brute_force_explanation": brute_force_explanation,
                "efficient_code": efficient_code,
                "efficient_explanation": efficient_explanation,
                "optimization_applicable": optimization_applicable,
                "latex_report": latex_report,
                "status": "success"
            }
            
            # --- Caching: Store successful result ---
            if result["status"] == "success":
                with PRACTICAL_CACHE_LOCK:
                    # Simple FIFO cache size limiting
                    if len(PRACTICAL_CACHE) >= CACHE_MAX_SIZE:
                        # Remove the oldest item
                        oldest_key = next(iter(PRACTICAL_CACHE))
                        del PRACTICAL_CACHE[oldest_key]
                        print(f"[CACHE] Removed oldest entry to make space")
                    PRACTICAL_CACHE[normalized_topic] = result
                    print(f"[CACHE] Stored result for topic: {topic}")
            # --- End Caching Storage ---
            
            return result
            
        except Exception as e:
            error_message = str(e)
            print(f"[ECEMatlabAgent] Error occurred: {error_message}")
            
            # Return user-friendly error message
            user_message = "Failed to process practical. "
            if "quota" in error_message.lower() or "429" in error_message:
                user_message += "API quota exceeded. Please try again later."
            elif "timeout" in error_message.lower():
                user_message += "Request timed out. Please try again or use a simpler topic."
            else:
                user_message += "Please try again later."
            
            return {
                 "topic": topic,
                 "status": "error",
                 "error_message": str(e),
                 "theory": results.get('theory'),  # Use results.get() to safely access
                 "brute_force_code": results.get('brute_code'),  # Use results.get() to safely access
                 "brute_force_explanation": None,
                 "efficient_code": None,
                 "efficient_explanation": None,
                 "optimization_applicable": False,
                 "latex_report": None
             }
    
    def process_practical_streaming(self, topic: str):
        # Step-by-step yield wala version - real-time updates ke liye
        try:
            yield {"step": "theory", "status": "processing", "message": "Generating theory explanation..."}
            theory = self.theory_agent.explain_concept(topic)
            yield {"step": "theory", "status": "complete", "content": theory}
            
            yield {"step": "brute_force_code", "status": "processing", "message": "Generating brute-force code..."}
            brute_force_code = self.code_generator_agent.generate_brute_force_code(topic, theory)
            yield {"step": "brute_force_code", "status": "complete", "content": brute_force_code}
            
            yield {"step": "brute_force_explanation", "status": "processing", "message": "Explaining brute-force code..."}
            brute_force_explanation = self.code_explainer_agent.explain_code(
                topic, brute_force_code, "brute-force"
            )
            yield {"step": "brute_force_explanation", "status": "complete", "content": brute_force_explanation}
            
            yield {"step": "efficient_code", "status": "processing", "message": "Checking for optimization opportunities..."}
            efficient_code_response = self.code_generator_agent.generate_efficient_code(topic, brute_force_code)
            
            optimization_applicable = not (
                "no significant optimization" in efficient_code_response.lower() or
                "no optimization possible" in efficient_code_response.lower()
            )
            
            if optimization_applicable:
                yield {"step": "efficient_code", "status": "complete", "content": efficient_code_response}
                
                yield {"step": "efficient_explanation", "status": "processing", "message": "Explaining optimizations..."}
                efficient_explanation = self.code_explainer_agent.explain_optimizations(
                    brute_force_code, efficient_code_response, topic
                )
                yield {"step": "efficient_explanation", "status": "complete", "content": efficient_explanation}
                
                final_code = efficient_code_response
            else:
                yield {"step": "efficient_code", "status": "not_applicable", "message": "No significant optimization possible"}
                final_code = brute_force_code
                efficient_explanation = None
            
            yield {"step": "latex_report", "status": "processing", "message": "Generating LaTeX report..."}
            latex_report = self.latex_generator_agent.generate_report(
                topic=topic,
                theory=theory,
                matlab_code=final_code,
                code_explanation=brute_force_explanation if not optimization_applicable else efficient_explanation,
                optimization_notes=efficient_explanation if optimization_applicable else ""
            )
            yield {"step": "latex_report", "status": "complete", "content": latex_report}
            
            yield {
                "step": "complete",
                "status": "success",
                "message": "All steps completed successfully!",
                "summary": {
                    "topic": topic,
                    "optimization_applicable": optimization_applicable
                }
            }
            
        except Exception as e:
            yield {
                "step": "error",
                "status": "error",
                "message": f"Error occurred: {str(e)}"
            }
