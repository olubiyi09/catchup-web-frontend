import React, { useEffect, useState } from "react";
import styles from "./AdminSubscriptions.module.css";
import UserIcon from "@/components/IconsAndLogo/UserIcon";
import PublishIcon from "@/components/IconsAndLogo/PublishIcon";
import DraftIcon from "@/components/IconsAndLogo/DraftIcon";
import PracticeIcon from "@/components/IconsAndLogo/PracticeIcon";

// Helper to format numbers
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

type BoxData = {
  color: string;
  title: string;
  count: string;
  Icon: React.FC<{ className?: string }>;
};

const AdminSubscriptions = () => {
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);

  const colors = ["#0056D2", "#22C55E", "#8B5CF6", "#FB923C"];

  useEffect(() => {
    const dummyBoxes: Omit<BoxData, "color">[] = [
      { title: "Total Users", count: "1,002", Icon: UserIcon },
      { title: "Adult Learners", count: "500", Icon: PublishIcon },
      { title: "Active Today", count: "300", Icon: DraftIcon },
      { title: "Live Class Today", count: "10", Icon: PracticeIcon },
    ];

    setBoxesData(
      dummyBoxes.map((item, i) => ({
        ...item,
        color: colors[i % colors.length],
      }))
    );
  }, []);

  return (
    <div>
      {/* Page Title */}
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

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
              {formatNumber(Number(box.count.replace(/,/g, "")))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminSubscriptions;
