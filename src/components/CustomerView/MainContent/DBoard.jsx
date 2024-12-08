import React from "react";
import { FaUser, FaChartLine, FaBox, FaDollarSign } from "react-icons/fa";
import {
  Bar,
  Doughnut,
  Line,
  PolarArea,
  Radar,
  Scatter,
  Pie,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Dashboard = () => {
  const industriesData = [
    "Frozen Goods",
    "Retail",
    "Electronics",
    "Healthcare",
    "Energy",
  ];
  const transportationData = [
    "Air Transport",
    "Sea Transport",
    "Land Transport",
  ];
  const servicesData = ["Courier and Cargo", "Warhousing", "Transporting"];

  // Summary card data
  const totalOrders = 2500;
  const totalRevenue = "$500,000";
  const totalClients = 150;
  const totalLogisticsRoutes = 45;

  // Chart data
  const doughnutData = {
    labels: industriesData,
    datasets: [
      {
        data: [60, 20, 10, 5, 5],
        backgroundColor: [
          "#4caf50",
          "#ff9800",
          "#2196f3",
          "#9c27b0",
          "#e91e63",
        ],
        hoverBackgroundColor: [
          "#388e3c",
          "#f57c00",
          "#1976d2",
          "#7b1fa2",
          "#d81b60",
        ],
      },
    ],
  };

  const mixedBarData = {
    labels: servicesData,
    datasets: [
      {
        type: "bar",
        label: "Delivery Service",
        data: [50, 60, 70], // Combined all data into one dataset
        backgroundColor: "#4caf50",
      },
    ],
  };

  const polarAreaData = {
    labels: transportationData,
    datasets: [
      {
        data: [25, 35, 40],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
        hoverBackgroundColor: ["#388e3c", "#f57c00", "#1976d2"],
        borderColor: ["#fff", "#fff", "#fff"],
      },
    ],
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "Courier and Cargo Orders",
        data: [120, 150, 170, 140, 180, 200], // Actual data for first few months
        borderColor: "#4caf50", // Color for actual data
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Warhousing Orders",
        data: [100, 120, 140, 110, 150, 180], // Actual data for first few months
        borderColor: "#ff9800", // Color for actual data
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Transporting Orders",
        data: [80, 100, 120, 90, 130, 160], // Actual data for first few months
        borderColor: "#2196f3", // Color for actual data
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Courier and Cargo Orders (Forecast)",
        data: [null, null, null, null, null, 200, 240, 280], // Forecasted data (only last 3 months)
        borderColor: "#4caf50", // Color for actual data
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5], // Dashed line for forecast
      },
      {
        label: "Warhousing Orders (Forecast)",
        data: [null, null, null, null, null, 180, 250, 280], // Forecasted data (only last 3 months)
        borderColor: "#ff9800", // Color for actual data
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5], // Dashed line for forecast
      },
      {
        label: "Transporting Orders (Forecast)",
        data: [null, null, null, null, null, 160, 210, 240], // Forecasted data (only last 3 months)
        borderColor: "#2196f3", // Color for actual data
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.4,
        fill: true,
        borderDash: [5, 5], // Dashed line for forecast
      },
    ],
  };

  const radarChartData = {
    labels: [
      "Speed",
      "Cost Efficiency",
      "Reliability",
      "Coverage",
      "Flexibility",
    ],
    datasets: [
      {
        label: "Logistics Performance",
        data: [4, 3, 5, 4, 4],
        backgroundColor: "rgba(33, 150, 243, 0.5)",
        borderColor: "#2196f3",
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: "Delivery Times",
        data: [
          { x: 5, y: 10 },
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
        ],
        backgroundColor: "#4caf50",
      },
    ],
  };

  const stats = [
    {
      id: 3,
      title: "Orders",
      value: "7",
      icon: <FaBox />,
      bgColor: "bg-accent",
    },
    {
      id: 4,
      title: "Jumlah Order Tepat waktu",
      value: "98%",
      icon: <FaChartLine />,
      bgColor: "bg-info",
    },
  ];

  // Chart.js data configuration
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 2400, 3200],
        backgroundColor: "#4ade80",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [400, 600, 800, 1000, 1200, 1400],
        borderColor: "#38bdf8",
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Electronics", "Fashion", "Groceries", "Others"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: ["#f87171", "#4ade80", "#38bdf8", "#facc15"],
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Table data
  const tableData = [
    {
      id: 1,
      name: "John Doe",
      order: "#1234",
      amount: "$150",
      status: "Completed",
    },
    {
      id: 2,
      name: "Jane Smith",
      order: "#1235",
      amount: "$200",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      order: "#1236",
      amount: "$75",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-6">
      {/* Page Header */}
      {/* put button here */}

      {/* Stats Cards */}
      <div className="flex flex-wrap">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`card shadow-md ${stat.bgColor} text-white flex-1 m-2`}
          >
            <div className="card-body flex flex-col items-center justify-center">
              <div>
                <h2 className="text-lg font-bold text-center">{stat.title}</h2>
                <p className="text-2xl font-bold text-center">{stat.value}</p>
              </div>
              <div className="text-4xl mt-2">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Industries Share</h2>
          <div className="relative h-72">
            {/* Set uniform height */}
            <Doughnut
              data={doughnutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Transportation Usage</h2>
          <div className="relative h-72">
            {/* Set uniform height */}
            <PolarArea
              data={polarAreaData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="card bg-base-100 shadow-md p-4 col-span-full">
          <h2 className="text-lg font-semibold mb-4">
            Order Trends (Forecast)
          </h2>
          <div className="relative h-72">
            {/* Set uniform height */}
            <Line
              data={lineChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      {/* <div className="mt-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Order</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.order}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
