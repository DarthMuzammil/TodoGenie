# TodoGenie - Voice-Controlled Todo Application

An enterprise-grade, voice-controlled todo application built with Next.js, featuring AI-powered task management and natural language processing.

## Features

- 🎤 **Voice Control**: Natural voice commands for task management
- 🤖 **AI Integration**: Powered by Llama3.2 and LangChain
- 📅 **Calendar View**: Intuitive task visualization
- 🔒 **Enterprise Ready**: Secure, scalable, and reliable
- 🎯 **Context Aware**: Maintains conversation context with Chromadb
- 🗣️ **Natural Responses**: ElevenLabs voice synthesis

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **AI/ML**: Llama3.2 (via Ollama), LangChain
- **Voice**: Browser Web Speech API, ElevenLabs
- **Storage**: MongoDB with Chromadb for context
- **Deployment**: v0.dev

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
ELEVENLABS_API_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         
│   ├── ui/             # Reusable UI components
│   ├── voice/          # Voice control components
│   └── todo/           # Todo-specific components
└── lib/
    ├── api/            # API utilities
    ├── db/             # Database connections
    ├── llm/            # LLM integration
    └── voice/          # Voice processing utilities
```

## Voice Commands

Examples of supported voice commands:

- "Add a new task to buy groceries tomorrow"
- "Mark the grocery task as complete"
- "Show me my tasks for next week"
- "What's on my calendar for today?"

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
