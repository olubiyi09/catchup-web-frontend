"use client";
import React from "react";
import styles from "./AdminSidebar.module.css";
import DashboardIcon from "@/components/IconsAndLogo/DashboardIcon";
import Logo from "@/components/IconsAndLogo/Logo";
import StudentIcon from "@/components/IconsAndLogo/StudentIcon";
import ContentIcon from "@/components/IconsAndLogo/ContentIcon";
import SubscriptionIcon from "@/components/IconsAndLogo/SubscriptionIcon";
import NotificationIcon from "@/components/IconsAndLogo/NotificationIcon";
import SettingsIcon from "@/components/IconsAndLogo/SettingsIcon";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  open,
  setOpen,
}) => {
  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: DashboardIcon },
    { name: "Students", key: "students", icon: StudentIcon },
    { name: "Content", key: "content", icon: ContentIcon },
    { name: "Subscription", key: "subscription", icon: SubscriptionIcon },
    { name: "Notifications", key: "notifications", icon: NotificationIcon },
    { name: "Settings", key: "settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Hamburger toggle (tablet/mobile) */}
      <div
        className={`${styles.hamburger} ${open ? styles.active : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </div>

      {/* Overlay when sidebar is open */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.title}>
          <Logo />
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setOpen(false); // close sidebar on mobile after click
                }}
                className={`${styles.navButton} ${
                  activeTab === item.key ? styles.active : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <p className={styles.navText}>{item.name}</p>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
