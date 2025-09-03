import React, { useEffect, useState } from "react";
import styles from "./AdminStudents.module.css";
import UserIcon from "@/components/IconsAndLogo/UserIcon";
import RevenueIcon from "@/components/IconsAndLogo/RevenueIcon";
import LiveClassIcon from "@/components/IconsAndLogo/LiveClassIcon";
import AdultIcon from "@/components/IconsAndLogo/AdultIcon";
import SearchIcon from "@/components/IconsAndLogo/SearchIcon";
import UsersTable from "./UsersTable";

// const formatNumber = (num: number) =>
//   new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

type BoxData = {
  color: string;
  title: string;
  count: string;
  Icon: React.FC<{ className?: string }>;
};

const dummyUsers = [
  {
    id: 1,
    name: "Oluwaseyi Okediya",
    category: "Adult Education",
    exams: ["Adult Learning"],
    plan: "Free Trial",
    paymentStatus: "Active",
    trialSessions: 3,
  },
  {
    id: 2,
    name: "Aisha Bello",
    category: "High School",
    exams: ["WAEC", "NECO"],
    plan: "Premium Monthly",
    paymentStatus: "Pending Upgrade",
    trialSessions: 1,
  },
  {
    id: 3,
    name: "Chinedu Okafor",
    category: "Common Entrance",
    exams: ["Common Entrance"],
    plan: "Single Subject",
    paymentStatus: "Expired",
    trialSessions: 0,
  },
  {
    id: 4,
    name: "Fatima Abdullahi",
    category: "High School",
    exams: ["JAMB"],
    plan: "Premium Monthly",
    paymentStatus: "Active",
    trialSessions: 2,
  },
  {
    id: 5,
    name: "Emeka Nwosu",
    category: "Adult Education",
    exams: ["Adult Learning"],
    plan: "Free Trial",
    paymentStatus: "Active",
    trialSessions: 1,
  },
  {
    id: 6,
    name: "Grace Johnson",
    category: "High School",
    exams: ["WAEC"],
    plan: "Single Subject",
    paymentStatus: "Expired",
    trialSessions: 0,
  },
  {
    id: 7,
    name: "Samuel Adeyemi",
    category: "Common Entrance",
    exams: ["Common Entrance", "NECO"],
    plan: "Free Trial",
    paymentStatus: "Pending Upgrade",
    trialSessions: 2,
  },
  {
    id: 8,
    name: "Ngozi Uche",
    category: "High School",
    exams: ["JAMB", "WAEC"],
    plan: "Premium Monthly",
    paymentStatus: "Active",
    trialSessions: 3,
  },
  {
    id: 9,
    name: "Bola Adebayo",
    category: "Adult Education",
    exams: ["Adult Learning"],
    plan: "Free Trial",
    paymentStatus: "Expired",
    trialSessions: 0,
  },
  {
    id: 10,
    name: "Mary Okon",
    category: "High School",
    exams: ["WAEC", "NECO", "JAMB"],
    plan: "Single Subject",
    paymentStatus: "Active",
    trialSessions: 1,
  },
];

const colors = ["#0056D2", "#22C55E", "#8B5CF6", "#FB923C"];

const AdminStudents = () => {
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);

  useEffect(() => {
    const dummyBoxes: Omit<BoxData, "color">[] = [
      {
        title: "Total Users",
        count: "1,002",
        Icon: UserIcon,
      },
      {
        title: "Adult Leaners",
        count: "500",
        Icon: AdultIcon,
      },
      {
        title: "Active Today",
        count: "1,728",
        Icon: RevenueIcon,
      },
      {
        title: "Live Class Today",
        count: "10",
        Icon: LiveClassIcon,
      },
    ];
    setBoxesData(
      dummyBoxes.map((item, i) => ({
        ...item,
        color: colors[i % colors.length],
      }))
    );
  }, []);

  return (
    <main className={styles.AdminDashboardMain}>
      <h1 className={styles.pageTitle}>Student Management</h1>

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
          </div>
        ))}
      </section>

      <section className={styles.boxWrapper}>
        <div className={styles.firstItem}>
          <h2>Student Exam Breakdown</h2>
          <div className={styles.examList}>
            <p>
              <span>JAMB</span>
              <span>150 students</span>
            </p>
            <p>
              <span>WAEC</span>
              <span>430 students</span>
            </p>
            <p>
              <span>NECO</span>
              <span>950 students</span>
            </p>
            <p>
              <span>Common Entrance</span>
              <span>1950 students</span>
            </p>
          </div>
        </div>

        <div className={styles.firstItem}>
          <h2>User Status</h2>
          <div className={styles.status}>
            <p>
              <span>Pending Upgrades</span>
              <span>150 users</span>
            </p>
            <p>
              <span>Active Trial</span>
              <span>950 students</span>
            </p>
            <p>
              <span>Trial Expired</span>
              <span>430 users</span>
            </p>
          </div>
        </div>
      </section>

      <div className={styles.DRV}>
        <div className={styles.topSection}>
          <h2 className={styles.sectionHeader}>All Users</h2>

          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search users"
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filters}>
              <select className={styles.filterSelect}>
                <option>All Users</option>
                <option>Common Entrance</option>
                <option>High School</option>
                <option>Adult Learners</option>
              </select>

              <select className={styles.filterSelect}>
                <option>All Exams</option>
                <option>WAEC</option>
                <option>NECO</option>
                <option>Common Entrance</option>
              </select>

              <select className={styles.filterSelect}>
                <option>All Status</option>
                <option>Active</option>
                <option>On Trial</option>
                <option>Pending Upgrade</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
        </div>

        <UsersTable users={dummyUsers} />
      </div>
    </main>
  );
};

export default AdminStudents;
