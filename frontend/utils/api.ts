import type { ChatResponse, ECEPracticalResponse } from "@/types/chat"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export const chatApi = {
  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API Error:", error)
      throw new Error("Failed to send message to backend")
    }
  },

  async* sendMessageStream(messages: ChatMessage[]): AsyncGenerator<string> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body")
      }

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6))
            
            if (data.error) {
              throw new Error(data.error)
            }
            
            if (data.done) {
              return
            }
            
            if (data.chunk) {
              yield data.chunk
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming API Error:", error)
      throw new Error("Failed to stream message from backend")
    }
  },
  
  async processECEPractical(topic: string): Promise<ECEPracticalResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/ece-practical`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("ECE API Error:", error)
      throw new Error("Failed to process ECE practical")
    }
  },
}
