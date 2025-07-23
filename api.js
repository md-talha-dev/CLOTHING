const API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  // Order endpoints
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  getOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    }
  },

  markWhatsAppSent: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/whatsapp-sent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error marking WhatsApp sent:', error)
      throw error
    }
  },

  // Contact form endpoint
  submitContactForm: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error submitting contact form:', error)
      throw error
    }
  }
}

export default api

