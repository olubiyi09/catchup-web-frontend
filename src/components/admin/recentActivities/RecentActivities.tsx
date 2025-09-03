"use client";
import React from "react";
import styles from "./RecentActivities.module.css";

// 1️⃣ Define Activity type here
type ActivityType = "newUser" | "content" | "liveClass" | "payment";

interface Activity {
  id: number;
  title: string;
  type: ActivityType;
  timestamp: Date;
}

interface Props {
  activities: Activity[];
}

// 2️⃣ Helper function for formatting time
const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // in seconds

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleDateString();
};

// 3️⃣ Map activity type to dot color
const dotColors: Record<ActivityType, string> = {
  newUser: "green",
  content: "blue",
  liveClass: "purple",
  payment: "orange",
};

// 4️⃣ Component
const RecentActivities: React.FC<Props> = ({ activities }) => {
  return (
    <div className={styles.parent}>
      <h2>Recent Activities</h2>
      <p>Latest platform events</p>

      <div className={styles.activitiesList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: dotColors[activity.type] }}
            />
            <div className={styles.activityContent}>
              <h3>{activity.title}</h3>
              <p>{timeAgo(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
