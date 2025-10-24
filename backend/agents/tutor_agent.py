from .base_agent import BaseAgent
from .ece_matlab_agent import ECEMatlabAgent
import json

MAX_MESSAGES = 10

class TutorAgent(BaseAgent):
    def __init__(self):
        super().__init__("TutorAgent", """
            You are an expert ECE (Electronics and Communication Engineering) MATLAB helper.
            You assist students with:
            - ECE concepts and theory (signal processing, communication systems, circuits, etc.)
            - MATLAB programming for ECE practicals
            - Code explanations and debugging
            - Academic questions related to ECE
            
            Provide clear, educational responses that help students understand both the theory and implementation.
        """)
        self.ece_agent = ECEMatlabAgent()
        self.classifier = BaseAgent("Classifier", """
            You are a query classifier for an ECE MATLAB helper system.
            
            Classify user queries into two types:
            
            1. "complete_practical" - User wants a FULL practical with theory, code, explanations, and LaTeX report
               Keywords to look for: "generate", "create", "complete", "full", "practical", "implementation"
               Examples: 
               - "generate practical for convolution"
               - "create complete practical on FFT"
               - "I need full implementation of FIR filter"
               - "generate complete practical for amplitude modulation"
               - "create full practical on [topic]"
            
            2. "simple_question" - User has a specific question or needs help
               Examples: 
               - "what is convolution?"
               - "explain this code"
               - "how does FFT work?"
               - "help me fix this error"
            
            IMPORTANT: If query contains words like "generate", "create", "complete", or "full practical", 
            classify as "complete_practical".
            
            Respond with ONLY this JSON format (no other text):
            {"type": "complete_practical", "topic": "extracted topic name"}
            OR
            {"type": "simple_question"}
            
            Extract the topic name without words like "generate", "create", "practical for", etc.
            Example: "generate complete practical for amplitude modulation" → topic: "amplitude modulation"
        """)

    def route(self, messages: list[dict]) -> dict:
        # Trim message history to fit under token and message limit
        trimmed_messages = self._trim_messages(messages)

        # Extract latest question from user
        user_query = ""
        for msg in reversed(trimmed_messages):
            if msg["role"] == "user":
                user_query = msg["content"]
                break

        if not user_query:
            return {
                "agent": "TutorAgent",
                "response": "No user question found in the message history.",
                "reason": "Missing user query."
            }

        try:
            # Classify the query
            print(f"[TutorAgent] Classifying query: {user_query}")
            classification_result = self.classifier.respond(f"Classify this query: {user_query}")
            classification_result = classification_result.strip().strip("```json").strip("```").strip()
            print(f"[TutorAgent] Classification result: {classification_result}")
            
            try:
                classification = json.loads(classification_result)
                print(f"[TutorAgent] Parsed classification: {classification}")
            except Exception as e:
                # Default to simple question if classification fails
                print(f"[TutorAgent] Classification parsing failed: {e}")
                classification = {"type": "simple_question"}
            
            # If it's a request for complete practical, use full ECE workflow
            if classification.get("type") == "complete_practical":
                topic = classification.get("topic", user_query)
                print(f"[TutorAgent] Detected complete practical request for: {topic}")
                
                # Use the full ECE MATLAB workflow
                practical_result = self.ece_agent.process_practical(topic)
                
                if practical_result.get("status") == "success":
                    # Format the complete response with all sections
                    response = self._format_complete_practical_response(practical_result)
                    return {
                        "agent": "ECE MATLAB Complete Practical",
                        "response": response,
                        "reason": "Complete practical workflow",
                        "ece_data": practical_result  # Include full data for frontend
                    }
                else:
                    return {
                        "agent": "ECE MATLAB Helper",
                        "response": f"Error generating practical: {practical_result.get('error_message')}",
                        "reason": "Practical generation error"
                    }
            
            else:
                # For simple questions, use the base agent response
                context = "\n".join([
                    f"{msg['role']}: {msg['content']}" 
                    for msg in trimmed_messages[-5:]  # Last 5 messages for context
                ])
                
                full_query = f"Context:\n{context}\n\nCurrent query: {user_query}"
                result = super().respond(full_query)

                return {
                    "agent": "ECE MATLAB Helper",
                    "response": result,
                    "reason": "ECE MATLAB educational assistant"
                }

        except Exception as e:
            return {
                "agent": "TutorAgent",
                "response": f"Sorry, there was an error processing your request: {str(e)}",
                "reason": "Processing error."
            }
    
    def _format_complete_practical_response(self, result: dict) -> str:
        """Format the complete practical result into a readable response"""
        sections = []
        
        sections.append("# 📚 Complete ECE MATLAB Practical\n")
        sections.append(f"**Topic:** {result['topic']}\n")
        
        # Theory
        if result.get('theory'):
            sections.append("## 🎓 Theory\n")
            sections.append(result['theory'])
            sections.append("\n---\n")
        
        # Brute-Force Code
        if result.get('brute_force_code'):
            sections.append("## 💻 MATLAB Code (Basic Implementation)\n")
            sections.append("```matlab\n")
            sections.append(result['brute_force_code'])
            sections.append("\n```\n")
        
        # Code Explanation
        if result.get('brute_force_explanation'):
            sections.append("## 📖 Code Explanation\n")
            sections.append(result['brute_force_explanation'])
            sections.append("\n---\n")
        
        # Optimized Code (if applicable)
        if result.get('optimization_applicable') and result.get('efficient_code'):
            sections.append("## ⚡ Optimized Implementation\n")
            sections.append("```matlab\n")
            sections.append(result['efficient_code'])
            sections.append("\n```\n")
            
            if result.get('efficient_explanation'):
                sections.append("## 🔧 Optimization Details\n")
                sections.append(result['efficient_explanation'])
                sections.append("\n---\n")
        
        # LaTeX Report
        if result.get('latex_report'):
            sections.append("## 📄 LaTeX Report\n")
            sections.append("Complete academic report generated! You can:")
            sections.append("- Copy the LaTeX code below")
            sections.append("- Paste it into Overleaf")
            sections.append("- Compile to get a professional PDF\n")
            sections.append("```latex\n")
            sections.append(result['latex_report'][:500] + "...")  # Show preview
            sections.append("\n```\n")
            sections.append("*Full LaTeX report available in response data*\n")
        
        return "\n".join(sections)

    def _trim_messages(self, messages):
        # First limit by message count
        if len(messages) > MAX_MESSAGES:
            messages = messages[-MAX_MESSAGES:]

        return messages
