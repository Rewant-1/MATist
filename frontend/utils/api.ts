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
