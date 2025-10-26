from .base_agent import BaseAgent

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
        # Removed classifier - not needed since we have separate endpoints

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
    
    def route_stream(self, messages: list[dict]):
        """Streaming version of route method"""
        trimmed_messages = self._trim_messages(messages)

        user_query = ""
        for msg in reversed(trimmed_messages):
            if msg["role"] == "user":
                user_query = msg["content"]
                break

        if not user_query:
            yield "No user question found in the message history."
            return

        try:
            # For simple questions, stream the response
            context = "\n".join([
                f"{msg['role']}: {msg['content']}" 
                for msg in trimmed_messages[-5:]
            ])
            
            full_query = f"Context:\n{context}\n\nCurrent query: {user_query}"
            
            # Use streaming response
            for chunk in super().respond_stream(full_query):
                yield chunk

        except Exception as e:
            yield f"Sorry, there was an error processing your request: {str(e)}"
    
    def _trim_messages(self, messages):
        # First limit by message count
        if len(messages) > MAX_MESSAGES:
            messages = messages[-MAX_MESSAGES:]

        return messages