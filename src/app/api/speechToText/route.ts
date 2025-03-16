import "dotenv/config";
import { ElevenLabsClient } from "elevenlabs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as Blob | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    // Convert audio to text synchronously
    const transcription = await client.speechToText.convert({
      file: audioFile,
      model_id: "scribe_v1",
      tag_audio_events: true,
      language_code: "eng",
      diarize: true,
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Error in speech-to-text conversion:", error);
    return NextResponse.json(
      { error: "Speech-to-text conversion failed" },
      { status: 500 }
    );
  }
} 