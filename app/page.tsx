import { WeatherDashboard } from '@/components/WeatherDashboard';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
      <WeatherDashboard />
    </div>
  );
}