export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  eceData?: ECEPracticalResponse // For ECE practical responses
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatResponse {
  message?: string
  response?: string
  error?: string
  ece_data?: ECEPracticalResponse  // Add ece_data field
}

// ECE MATLAB Practical Types
export interface ECEPracticalResponse {
  status: "success" | "error"
  topic: string
  theory?: string
  brute_force_code?: string
  brute_force_explanation?: string
  efficient_code?: string | null
  efficient_explanation?: string | null
  optimization_applicable?: boolean
  latex_report?: string
  error_message?: string
}
