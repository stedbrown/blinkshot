import { NextRequest, NextResponse } from 'next/server'
import Together from 'together-ai'

// Initialize Together client with the correct syntax for v0.16.0
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { prompt, seed, steps = 3, width = 1024, height = 768, model = 'black-forest-labs/FLUX.1-schnell' } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      )
    }

    if (!process.env.TOGETHER_API_KEY) {
      return NextResponse.json(
        { error: 'Together AI API key not configured. Please add TOGETHER_API_KEY to your .env.local file' },
        { status: 500 }
      )
    }

    // Validate parameters
    const validatedSteps = Math.max(1, Math.min(8, parseInt(steps) || 3))
    const validatedWidth = Math.max(512, Math.min(1344, parseInt(width) || 1024))
    const validatedHeight = Math.max(512, Math.min(1344, parseInt(height) || 768))
    
    // Ensure dimensions are multiples of 64 for FLUX
    const finalWidth = Math.round(validatedWidth / 64) * 64
    const finalHeight = Math.round(validatedHeight / 64) * 64

    // Use the correct API method for image generation in v0.16.0
    const response = await together.images.create({
      prompt: prompt,
      model: model,
      width: finalWidth,
      height: finalHeight,
      steps: validatedSteps,
      response_format: 'base64',
      seed: seed || undefined,
    })

    return NextResponse.json(response.data[0])
  } catch (error) {
    console.error('Error generating image:', error)
    
    // More detailed error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to generate image: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
} 