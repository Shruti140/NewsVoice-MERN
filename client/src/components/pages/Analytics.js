import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Analytics = () => {
  const [stats, setStats] = useState({
    postCount: 0,
    userCount: 0,
    interactionCount: 0,
    activeUsers: 0,
  });

  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    const fetchTopArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/top-articles');
        setTopArticles(response.data);
      } catch (error) {
        console.error('Error fetching top articles:', error);
      }
    };

    fetchStats();
    fetchTopArticles();
  }, []);

  const postData = {
    labels: ['Post Count'],
    datasets: [
      {
        label: 'Posts',
        data: [stats.postCount],
        backgroundColor: ['#FF6384'],
      },
    ],
  };

  const userData = {
    labels: ['User Count'],
    datasets: [
      {
        label: 'Users',
        data: [stats.userCount],
        backgroundColor: ['#36A2EB'],
      },
    ],
  };

  const interactionData = {
    labels: ['Interaction Count'],
    datasets: [
      {
        label: 'Interactions',
        data: [stats.interactionCount],
        backgroundColor: ['#FFCE56'],
      },
    ],
  };

  const activeUserData = {
    labels: ['Active Users'],
    datasets: [
      {
        label: 'Active Users',
        data: [stats.activeUsers],
        backgroundColor: ['#4BC0C0'],
      },
    ],
  };

  const topArticlesData = {
    labels: topArticles.map(article => article.title),
    datasets: [
      {
        label: 'Views',
        data: topArticles.map(article => article.views),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-charts">
        <div className="chart">
          <Bar data={postData} />
          <p>Posts</p>
        </div>
        <div className="chart">
          <Bar data={userData} />
          <p>Users</p>
        </div>
        <div className="chart">
          <Bar data={interactionData} />
          <p>Interactions</p>
        </div>
        <div className="chart">
          <Bar data={activeUserData} />
          <p>Active Users</p>
        </div>
      </div>
      <div className="top-articles">
        <h2>Top Articles</h2>
        <Doughnut data={topArticlesData} />
      </div>
    </div>
  );
};

export default Analytics;
