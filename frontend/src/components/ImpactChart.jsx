import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import 'chart.js/auto';
import '../styles/impactChart.css';

const ImpactChart = ({ data }) => {
  const impactCounts = data.reduce((acc, item) => {
    acc[item.Impact] = (acc[item.Impact] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(impactCounts),
    datasets: [
      {
        label: 'Impact Count',
        data: Object.values(impactCounts),
        backgroundColor: ['rgba(0, 128, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
        borderColor: ['rgba(0, 128, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

ImpactChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ImpactChart;
