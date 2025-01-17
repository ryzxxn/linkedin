import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables")
    }

    const { content, type } = await req.json()

    if (!content || !type) {
      throw new Error("Missing required fields: content and type")
    }

    const prompts = {
      achievement: "Transform this achievement into an engaging LinkedIn post that's inspiring yet humble: ",
      experience: "Create a compelling LinkedIn post about this professional experience that offers value to others: ",
      professional: "Convert this message into a professional LinkedIn post that helps others grow: ",
      story: "Transform this story into an engaging LinkedIn post that captures attention and delivers value: ",
      fun: "Turn this fun fact into a light-hearted LinkedIn post that entertains and engages your audience: "
    }

    const prompt = prompts[type as keyof typeof prompts] || prompts.achievement

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent(`
      You are an expert LinkedIn post writer. Your posts are:
          1. **Engaging and hook readers in the first line** with a bold statement or a provocative question related to the trend or topic.(format:[emoji] [question or statement][emoji])
          2. **Well-structured with SHORT paragraphs** (1 - 3 lines) to ensure readability, especially on mobile devices.
          3. **Include relevant emojis** to add visual interest and convey emotions or key points effectively.
          4. **End with a call to action** that encourages engagement.
          5. **Use appropriate hashtags** and connect with the relevant audience.
          6. **Between 100-300 words** for optimal engagement, ensuring the message is concise yet informative.
          Be humble and write prompts from the writers point of view, be relatable and try not use too fancy words.
          // dont use face emojis //

      ${prompt}${content}
    `)

    const generatedPost = result.response.text()

    if (!generatedPost) {
      throw new Error("No content generated from Gemini API")
    }

    return NextResponse.json({ post: generatedPost })
  } catch (error) {
    console.error("Error in generate route:", error)
    return NextResponse.json({ error: `Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 })
  }
}

