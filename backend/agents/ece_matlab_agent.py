from .base_agent import BaseAgent
from .theory_agent import TheoryAgent
from .code_generator_agent import CodeGeneratorAgent
from .code_explainer_agent import CodeExplainerAgent
from .latex_generator_agent import LaTeXGeneratorAgent
import json

class ECEMatlabAgent(BaseAgent):
    """
    Main orchestrator agent for ECE MATLAB Practical Helper.
    
    Workflow:
    1. Theory Explanation (TheoryAgent)
    2. Brute-Force Code Generation (CodeGeneratorAgent)
    3. Brute-Force Code Explanation (CodeExplainerAgent)
    4. Efficient Code Generation (CodeGeneratorAgent) - if applicable
    5. Efficient Code Explanation (CodeExplainerAgent) - if applicable
    6. LaTeX Report Generation (LaTeXGeneratorAgent)
    """
    
    def __init__(self):
        super().__init__("ECEMatlabAgent", "ECE MATLAB Practical Helper orchestrator")
        
        # Initialize all specialist agents
        self.theory_agent = TheoryAgent()
        self.code_generator_agent = CodeGeneratorAgent()
        self.code_explainer_agent = CodeExplainerAgent()
        self.latex_generator_agent = LaTeXGeneratorAgent()
    
    def process_practical(self, topic: str) -> dict:
        """
        Complete workflow for processing an ECE MATLAB practical topic.
        
        Args:
            topic: The ECE practical topic (e.g., "Convolution of two signals")
            
        Returns:
            Dictionary containing all generated content
        """
        try:
            print(f"[ECEMatlabAgent] Starting processing for topic: {topic}")
            
            # Step 1: Generate Theory Explanation
            print("[ECEMatlabAgent] Step 1: Generating theory explanation...")
            theory = self.theory_agent.explain_concept(topic)

            # Check if theory generation failed (only check for actual error messages, not content)
            if not theory or len(theory.strip()) < 50:  # Basic validation
                raise Exception(f"Theory generation failed: Empty or too short response")

            # Step 2: Generate Brute-Force Code
            print("[ECEMatlabAgent] Step 2: Generating brute-force MATLAB code...")
            brute_force_code = self.code_generator_agent.generate_brute_force_code(topic, theory)

            # Check if code generation failed
            if not brute_force_code or len(brute_force_code.strip()) < 20:
                raise Exception(f"Code generation failed: Empty or too short response")
            
            # Step 3: Explain Brute-Force Code
            print("[ECEMatlabAgent] Step 3: Explaining brute-force code...")
            brute_force_explanation = self.code_explainer_agent.explain_code(
                topic, brute_force_code, "brute-force"
            )
            
            # Step 4: Generate Efficient Code (conditional)
            print("[ECEMatlabAgent] Step 4: Attempting to generate efficient code...")
            efficient_code_response = self.code_generator_agent.generate_efficient_code(
                topic, brute_force_code
            )
            
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
                efficient_explanation = self.code_explainer_agent.explain_optimizations(
                    brute_force_code, efficient_code, topic
                )
            else:
                print("[ECEMatlabAgent] No significant optimization possible.")
            
            # Step 6: Generate LaTeX Report
            print("[ECEMatlabAgent] Step 6: Generating LaTeX report...")
            final_code = efficient_code if optimization_applicable else brute_force_code
            
            latex_report = self.latex_generator_agent.generate_report(
                topic=topic,
                theory=theory,
                matlab_code=final_code,
                code_explanation=brute_force_explanation if not optimization_applicable else efficient_explanation,
                optimization_notes=efficient_explanation if optimization_applicable else ""
            )
            
            print("[ECEMatlabAgent] Processing completed successfully!")
            
            return {
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
                "error_message": user_message,
                "theory": None,
                "brute_force_code": None,
                "brute_force_explanation": None,
                "efficient_code": None,
                "efficient_explanation": None,
                "optimization_applicable": False,
                "latex_report": None
            }
    
    def process_practical_streaming(self, topic: str):
        """
        Generator version for streaming responses step-by-step.
        Yields partial results as each step completes.
        
        Args:
            topic: The ECE practical topic
            
        Yields:
            Dictionaries with step updates
        """
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
