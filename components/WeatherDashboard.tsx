'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CloudRain, Thermometer, Wind } from 'lucide-react';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export function WeatherDashboard() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('https://localhost:7240/WeatherForecast');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setForecasts(data);
    } catch (err) {
      setError('Error fetching weather data. Please check the API URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="Enter API URL"
          className="flex-grow"
        />
        <Button onClick={fetchWeatherData} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecasts.map((forecast, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{new Date(forecast.date).toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5" />
                <span>{forecast.temperatureC}°C / {forecast.temperatureF}°F</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <CloudRain className="h-5 w-5" />
                <span>{forecast.summary}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}