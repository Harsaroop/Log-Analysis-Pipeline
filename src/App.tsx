import React, { useState, useEffect } from 'react';
import { AlertTriangle, BarChart3 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [logData, setLogData] = useState<{ timestamp: string; level: string; message: string }[]>([]);
  const [anomalies, setAnomalies] = useState<string[]>([]);

  useEffect(() => {
    // Simulating log data fetching
    const fetchLogData = () => {
      const mockLogs = [
        { timestamp: '2023-04-01 10:00:00', level: 'INFO', message: 'Application started' },
        { timestamp: '2023-04-01 10:05:00', level: 'WARNING', message: 'High CPU usage detected' },
        { timestamp: '2023-04-01 10:10:00', level: 'ERROR', message: 'Database connection failed' },
        { timestamp: '2023-04-01 10:15:00', level: 'INFO', message: 'User login successful' },
        { timestamp: '2023-04-01 10:20:00', level: 'WARNING', message: 'Unusual network activity detected' },
      ];
      setLogData(mockLogs);
      setAnomalies(['High CPU usage', 'Database connection failure', 'Unusual network activity']);
    };

    fetchLogData();
  }, []);

  const chartData = {
    labels: ['INFO', 'WARNING', 'ERROR'],
    datasets: [
      {
        label: 'Log Level Distribution',
        data: [
          logData.filter(log => log.level === 'INFO').length,
          logData.filter(log => log.level === 'WARNING').length,
          logData.filter(log => log.level === 'ERROR').length,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Log Analysis Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2" /> Log Level Distribution
          </h2>
          <Bar data={chartData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2" /> Detected Anomalies
          </h2>
          <ul className="list-disc pl-5">
            {anomalies.map((anomaly, index) => (
              <li key={index} className="text-red-600">{anomaly}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Timestamp</th>
              <th className="p-2 text-left">Level</th>
              <th className="p-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{log.timestamp}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${
                    log.level === 'INFO' ? 'bg-blue-200 text-blue-800' :
                    log.level === 'WARNING' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {log.level}
                  </span>
                </td>
                <td className="p-2">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;