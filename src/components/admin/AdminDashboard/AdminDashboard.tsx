// import React from "react";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   return (
//     <main className={styles.AdminDashboardMain}>
//       <div>
//         <h1 className={styles.pageTitle}>Dashboard Overview</h1>
//       </div>

//       <section></section>
//     </main>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./AdminDashboard.module.css";

// Define a type for each box
type BoxData = {
  color: string;
  title: string;
  count: number;
  change: string;
};

const colors = ["#0056D2", "#22C55E", "#8B5CF6", "#FB923C"];

const AdminDashboard: React.FC = () => {
  // Set the state type
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);

  useEffect(() => {
    // Dummy data simulating DB fetch
    const data: Omit<BoxData, "color">[] = [
      { title: "Total Users", count: 1200, change: "+12.5%" },
      { title: "Active Users", count: 950, change: "+8.2%" },
      { title: "New Signups", count: 720, change: "+5.1%" },
      { title: "Inactive Users", count: 430, change: "+15.4%" },
    ];

    // Add colors
    const dataWithColors: BoxData[] = data.map((item, index) => ({
      ...item,
      color: colors[index % colors.length],
    }));

    setBoxesData(dataWithColors);
  }, []);

  return (
    <main className={styles.AdminDashboardMain}>
      <div>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>

      <section className={styles.boxesSection}>
        {boxesData.map((box, index) => (
          <div
            key={index}
            className={styles.dashboardBox}
            style={{ borderLeftColor: box.color }}
          >
            <div className={styles.boxIconTitle}>
              <FaUser className={styles.boxIcon} />
              <span>{box.title}</span>
            </div>
            <div className={styles.boxCount}>{box.count}</div>
            <div className={styles.boxChange}>{box.change} this month</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AdminDashboard;
