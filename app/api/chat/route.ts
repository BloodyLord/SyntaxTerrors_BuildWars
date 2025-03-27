import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI("AIzaSyDInX-I16yN-4HwyJw48f13VTnppuY37Qk")
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-thinking-exp-01-21",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "text/plain",
  },
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const result = await model.generateContent(message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
} 