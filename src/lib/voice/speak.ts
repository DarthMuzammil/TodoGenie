interface SpeakOptions {
  voiceId?: string;
  model?: string;
}

const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Default ElevenLabs voice
const DEFAULT_MODEL = 'eleven_monolingual_v1';

export async function speak(text: string, options: SpeakOptions = {}) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set in environment variables');
  }

  const voiceId = options.voiceId || DEFAULT_VOICE_ID;
  const model = options.model || DEFAULT_MODEL;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.statusText}`);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);

  return new Promise<void>((resolve, reject) => {
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      resolve();
    };
    audio.onerror = (error) => {
      URL.revokeObjectURL(audioUrl);
      reject(error);
    };
    audio.play().catch(reject);
  });
} 