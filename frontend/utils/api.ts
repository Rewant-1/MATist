// API utility - backend se communicate karta hai

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const chatApi = {
  // Chat message bhejta hai - streaming response ke liye
  async sendMessage(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    
    if (!response.ok) {
      throw new Error('Chat request failed');
    }
    
    return response.json();
  },

  // Streaming chat - real-time response
  async sendMessageStream(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(`${API_URL}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    
    if (!response.ok) {
      throw new Error('Stream request failed');
    }
    
    return response;
  },

  // ECE practical generate karta hai
  async processECEPractical(topic: string) {
    const response = await fetch(`${API_URL}/api/ece-practical`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    
    if (!response.ok) {
      throw new Error('ECE practical request failed');
    }
    
    return response.json();
  },

  // Topics list fetch karta hai
  async getTopics() {
    const response = await fetch(`${API_URL}/api/topics`);
    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    return response.json();
  },

  // History fetch karta hai
  async getHistory(limit = 20) {
    const response = await fetch(`${API_URL}/api/history?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    return response.json();
  },

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_URL}/api/health`);
    return response.json();
  }
};
