import { memo } from 'react';

interface VoiceStatusProps {
  error: string | null;
  transcript: string;
}

const VoiceStatus = memo(function VoiceStatus({ error, transcript }: VoiceStatusProps) {
  return (
    <div className="mb-8">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          {error}
        </div>
      )}
      {transcript && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-semibold mb-2">Last Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
});

VoiceStatus.displayName = 'VoiceStatus';

export default VoiceStatus; 