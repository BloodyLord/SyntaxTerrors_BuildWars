import { NextResponse } from 'next/server'

const responses = {
  greeting: "Hello! I'm your agricultural assistant. How can I help you?",
  weather: "I can help you with weather information. Please provide your location.",
  crop: "I can help you with crop information. Please specify the crop name.",
  price: "I can help you with crop prices. Please specify the crop name.",
  scheme: "I can help you with information about government schemes.",
  default: "I'm sorry, I didn't understand your question. Please ask again."
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase()
    
    // Simple response logic based on keywords
    let response = responses.default
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = responses.greeting
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || lowerMessage.includes('rain')) {
      response = responses.weather
    } else if (lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      response = responses.crop
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = responses.price
    } else if (lowerMessage.includes('scheme') || lowerMessage.includes('government')) {
      response = responses.scheme
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { response: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    )
  }
} 