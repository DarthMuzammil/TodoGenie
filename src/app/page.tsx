export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to TodoGenie</h1>
      <p className="text-xl mb-8">Your AI-powered, voice-controlled todo assistant</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Voice Control"
          description="Manage your tasks naturally with voice commands"
          icon="🎤"
        />
        <FeatureCard
          title="Smart AI"
          description="Powered by advanced LLMs for natural interaction"
          icon="🤖"
        />
        <FeatureCard
          title="Calendar View"
          description="Visualize your tasks in an intuitive calendar"
          icon="📅"
        />
        <FeatureCard
          title="Enterprise Ready"
          description="Secure, scalable, and reliable task management"
          icon="🏢"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { 
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
