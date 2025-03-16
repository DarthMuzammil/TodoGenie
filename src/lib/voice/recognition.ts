import { EventEmitter } from 'events';

declare global {
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (event: Event) => void;
    onend: (event: Event) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start(): void;
    stop(): void;
  }

  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

class VoiceRecognition extends EventEmitter {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;

  constructor() {
    super();
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      }
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.emit('start');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.emit('end');
    };

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const voiceResult: VoiceRecognitionResult = {
        transcript: result[0].transcript,
        confidence: result[0].confidence,
        isFinal: result.isFinal
      };
      this.emit('result', voiceResult);
    };

    this.recognition.onerror = (event) => {
      this.emit('error', event.error);
    };
  }

  public start() {
    if (!this.recognition || this.isListening) return;
    this.recognition.start();
  }

  public stop() {
    if (!this.recognition || !this.isListening) return;
    this.recognition.stop();
  }

  public isActive(): boolean {
    return this.isListening;
  }
}

export const voiceRecognition = new VoiceRecognition(); 