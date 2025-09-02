"use client";
import { useState } from "react";
import AdminContents from "@/components/admin/AdminContents/AdminContents";
import AdminDashboard from "@/components/admin/AdminDashboard/AdminDashboard";
import AdminNotificationsAndAlerts from "@/components/admin/AdminNotificationsAndAlerts/AdminNotificationsAndAlerts";
import AdminSettings from "@/components/admin/AdminSettings/AdminSettings";
import AdminSidebar from "@/components/admin/adminSidebar/AdminSidebar";
import AdminStudents from "@/components/admin/AdminStudents/AdminStudents";
import AdminSubscriptions from "@/components/admin/AdminSubscriptions/AdminSubscriptions";
import styles from "./Admin.module.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "students":
        return <AdminStudents />;
      case "content":
        return <AdminContents />;
      case "subscription":
        return <AdminSubscriptions />;
      case "notifications":
        return <AdminNotificationsAndAlerts />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen relative">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main
        className={`${styles.content} ${
          sidebarOpen ? styles.contentShifted : ""
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
