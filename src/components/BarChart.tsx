'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Sales made',
        data: [300, 50, 50, 50, 50],
        backgroundColor: 'rgba(50, 205, 50, 0.6)', // lime green
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Growth',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
