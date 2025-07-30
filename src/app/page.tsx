'use client';
import Image from "next/image";
import {useState, useEffect} from "react";


type Metrics = {
  cpu: number
  ram: number
  temp: number
  storage: number
}

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics')
        const data = await res.json()
        setMetrics(data)
        console.log('Fetched metrics:', data)
      } catch (err) {
        console.error('Failed to fetch metrics:', err)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000) // Updates every 5 seconds
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Stream View */}
        <div className="w-full aspect-video bg-black rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
          {/* Replace with <video> or <img src="..." /> later */}
          <p className="text-gray-500">Live Stream Loading...</p>
        </div>

        {/* Usage Metrics */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Device Metrics</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-600">
                <th className="py-2">Metric</th>
                <th className="py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">CPU Usage</td>
                <td className="py-2">{metrics?.cpu ?? '--'}%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">RAM Usage</td>
                <td className="py-2">{metrics?.ram ?? '--'} MB</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Temperature</td>
                <td className="py-2">{metrics?.temp ?? '--'} °C</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Storage Used</td>
                <td className="py-2">{metrics?.storage ?? '--'} GB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
