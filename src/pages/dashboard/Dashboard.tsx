import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HealingIcon from '@mui/icons-material/Healing';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

interface UserData {
  totalUsers: number;
  submittedForms: number;
  testedUsers: number;
  usersWithStroke: number;
}

const Dashboard: React.FC = () => {
  const userData: UserData | null = {
    totalUsers: 120,
    submittedForms: 80,
    testedUsers: 60,
    usersWithStroke: 20,
  };

  // Chart Data
  const barChartData = userData
    ? {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Users with Stroke',
          data: [5, 10, 6, 12, 8],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    }
    : null;

  const doughnutData = userData
    ? {
      labels: ['Stroke', 'No Stroke'],
      datasets: [
        {
          data: [userData.usersWithStroke, userData.testedUsers - userData.usersWithStroke],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    }
    : null;

  const lineChartData = userData
    ? {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Total Users',
          data: [100, 120, 140, 150, 180],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    }
    : null;

  const barChartTotalUsers = userData
    ? {
      labels: ['Submitted Form', 'Tested', 'Stroke'],
      datasets: [
        {
          label: 'User Breakdown',
          data: [userData.submittedForms, userData.testedUsers, userData.usersWithStroke],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        },
      ],
    }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!userData) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="font-bold">
          No data available. Please check back later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="font-bold mb-6">
        Welcome to the Dashboard
      </Typography>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex items-center">
              <PersonIcon className="text-blue-500 mr-4" fontSize="large" />
              <div>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h5" className="font-bold">
                  {userData.totalUsers}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex items-center">
              <AssignmentTurnedInIcon className="text-green-500 mr-4" fontSize="large" />
              <div>
                <Typography variant="h6">Users Submitted Form</Typography>
                <Typography variant="h5" className="font-bold">
                  {userData.submittedForms}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex items-center">
              <HealingIcon className="text-red-500 mr-4" fontSize="large" />
              <div>
                <Typography variant="h6">Users Tested</Typography>
                <Typography variant="h5" className="font-bold">
                  {userData.testedUsers}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Typography variant="h6" className="mb-4 font-bold">
            Users with Stroke Over Time
          </Typography>
          {barChartData ? <Bar data={barChartData} options={chartOptions} /> : <Typography>No Data</Typography>}
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Typography variant="h6" className="mb-4 font-bold">
            Stroke vs Non-Stroke (Tested)
          </Typography>
          {doughnutData ? <Doughnut data={doughnutData} /> : <Typography>No Data</Typography>}
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Typography variant="h6" className="mb-4 font-bold">
            Total Users Over Time
          </Typography>
          {lineChartData ? <Line data={lineChartData} options={chartOptions} /> : <Typography>No Data</Typography>}
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Typography variant="h6" className="mb-4 font-bold">
            User Breakdown
          </Typography>
          {barChartTotalUsers ? <Bar data={barChartTotalUsers} options={chartOptions} /> : <Typography>No Data</Typography>}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

