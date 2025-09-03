import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./AdminDashboard.module.css";
import StartIcon from "@/components/IconsAndLogo/StartIcon";
import ActiveSubIcon from "@/components/IconsAndLogo/ActiveSubIcon";
import RevenueIcon from "@/components/IconsAndLogo/RevenueIcon";
import UserIcon from "@/components/IconsAndLogo/UserIcon";

export type ActivityType = "newUser" | "content" | "liveClass" | "payment";

export interface Activity {
  id: number;
  title: string;
  type: ActivityType;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "New User Registered",
    type: "newUser",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 2,
    title: "English Questions Uploaded",
    type: "content",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 3,
    title: "Live Class Completed",
    type: "liveClass",
    timestamp: new Date(Date.now() - 2 * 3600 * 1000),
  },
  {
    id: 4,
    title: "Payment Received",
    type: "payment",
    timestamp: new Date(Date.now() - 2 * 3600 * 1000),
  },
];

<RecentActivities activities={activities} />;

// ApexCharts dynamic import
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Chart.js Doughnut
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import RecentActivities from "../recentActivities/RecentActivities";
ChartJS.register(ArcElement, Tooltip, Legend);

type BoxData = {
  color: string;
  title: string;
  count: string;
  change: string;
  Icon: React.FC<{ className?: string }>;
};

const colors = ["#0056D2", "#22C55E", "#8B5CF6", "#FB923C"];
// const formatNumber = (num: number) =>
//   new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

const getShiftedMonths = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth(); // 0-11
  const firstMonthIndex = (currentMonth + 1) % 12;
  return [
    ...monthNames.slice(firstMonthIndex),
    ...monthNames.slice(0, firstMonthIndex),
  ];
};

const AdminDashboard: React.FC = () => {
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);
  const [userGrowth, setUserGrowth] = useState<{
    highSchool: number[];
    adult: number[];
  }>({ highSchool: [], adult: [] });

  useEffect(() => {
    const dummyBoxes: Omit<BoxData, "color">[] = [
      {
        title: "Total Users",
        count: "1,002",
        change: "+12.5%",
        Icon: UserIcon,
      },
      {
        title: "Monthly Revenue",
        count: "₦12.6M",
        change: "+8.2%",
        Icon: RevenueIcon,
      },
      {
        title: "Active Subscriptions",
        count: "1,728",
        change: "+5.1%",
        Icon: ActiveSubIcon,
      },
      {
        title: "Satisfaction Rate",
        count: "4.6/5",
        change: "+15.4%",
        Icon: StartIcon,
      },
    ];
    setBoxesData(
      dummyBoxes.map((item, i) => ({
        ...item,
        color: colors[i % colors.length],
      }))
    );

    setUserGrowth({
      highSchool: [0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 320],
      adult: [0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 220],
    });
  }, []);

  const months = getShiftedMonths();

  const chartState = {
    series: [
      { name: "High School Users", data: userGrowth.highSchool },
      { name: "Adult Education Users", data: userGrowth.adult },
    ],
    options: {
      chart: { type: "area", height: 300, toolbar: { show: false } },
      stroke: { curve: "smooth" },
      xaxis: { categories: months },
      colors: ["#0056D2", "#22C55E"],
      tooltip: {
        shared: true,
        intersect: false,
        y: { formatter: formatNumber },
      },
      legend: { position: "top" },
      yaxis: { labels: { formatter: formatNumber } },
    },
  };

  const doughnutData = {
    labels: ["High School Students", "Adult Education Students"],
    datasets: [
      {
        data: [1200, 200],
        backgroundColor: ["#0056D2", "#22C55E"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    layout: {
      padding: {
        bottom: 20,
        top: 10,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20, // space between legend items & chart
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (!data.labels.length) return [];
            return data.labels.map((label: string, i: number) => {
              const value = data.datasets[0].data[i];
              return {
                text: `${label}: ${value} subscribers`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${
              tooltipItem.label
            }: ${tooltipItem.raw.toLocaleString()} subscribers`,
        },
      },
    },
  };

  return (
    <main className={styles.AdminDashboardMain}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>

      {/* Boxes */}
      <section className={styles.boxesSection}>
        {boxesData.map((box, index) => (
          <div
            key={index}
            className={styles.dashboardBox}
            style={{ borderLeftColor: box.color }}
          >
            <div className={styles.boxIconTitle}>
              <div className={styles.boxIcon}>
                <box.Icon />
              </div>
              <span className={styles.boxTitle}>{box.title}</span>
            </div>
            <div className={styles.boxCount}>
              {box.title === "Monthly Revenue" ||
              box.title === "Satisfaction Rate"
                ? box.count
                : formatNumber(Number(box.count.replace(/,/g, "")))}
            </div>
            <div className={styles.boxChange}>{box.change} this month</div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className={styles.chartRightContainer}>
        <div className={styles.chartContainer}>
          <h2 className={styles.h2}>User Growth Trends</h2>
          <p className={styles.para}>
            Student and adult user registration over time
          </p>
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="area"
            height={300}
          />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.rightSectionCard}>
            <h2>Subscription Breakdown</h2>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </section>

      <div className={styles.plansContainer}>
        <div className={styles.plansCard}>
          <h2>Student Plans</h2>
          <p>Subscription Breakdown</p>
          <div className={styles.plansList}>
            <div className={styles.planItem}>
              <span className={styles.planName}>Free Trial</span>
              <span>1,200 users</span>
            </div>
            <div className={styles.planItem}>
              <span className={styles.planName}>Monthly</span>
              <span>5000 users</span>
            </div>
            <div className={styles.planItem}>
              <span className={styles.planName}>Pay-Per-Subject</span>
              <span>300 users</span>
            </div>
          </div>
        </div>

        <div className={styles.plansCard}>
          <h2>Adult Education</h2>
          <p>Live Class Subscriptions</p>
          <div className={styles.plansList}>
            <div className={styles.planItem}>
              <span className={styles.planName}>Pay-Per-class</span>
              <span>1,200 users</span>
            </div>
            <div className={styles.planItem}>
              <span className={styles.planName}>Monthly Unlimited</span>
              <span>5000 users</span>
            </div>
            <div className={styles.planItem}>
              <span className={styles.planName}>Total Revenue</span>
              <span className={styles.revSpan}>₦1.23M</span>
            </div>
          </div>
        </div>

        <div className={`${styles.plansLastCard} `}>
          <h2>Daily Activity</h2>
          <p>Practice Sessions per Day</p>
          <div className={styles.dailyChart}>
            <ReactApexChart
              options={{
                chart: {
                  type: "bar",
                  height: 250,
                  toolbar: { show: false },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: false, // vertical bars
                    columnWidth: "50%",
                  },
                },
                dataLabels: { enabled: false }, // remove numbers on bars
                xaxis: {
                  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yaxis: {
                  title: { text: "Total Sessions" },
                  min: 0,
                  max: 16000, // adjust to max session number + margin
                  tickAmount: 7, // 7 lines
                  labels: {
                    formatter: (val: number) => val.toLocaleString(),
                  },
                },
                grid: {
                  borderColor: "#e0e0e0",
                  strokeDashArray: 3, // dashed lines
                },
                tooltip: {
                  y: {
                    formatter: (val: number) =>
                      val.toLocaleString() + " sessions",
                  },
                },
                colors: ["#0056D2"],
              }}
              series={[
                {
                  name: "Practice Sessions",
                  data: [10000, 9000, 12000, 15000, 8000, 6000, 4000],
                },
              ]}
              type="bar"
              height={250}
            />
          </div>
        </div>
      </div>

      <div className={styles.recentActivities}>
        <RecentActivities activities={activities} />
      </div>
    </main>
  );
};

export default AdminDashboard;
