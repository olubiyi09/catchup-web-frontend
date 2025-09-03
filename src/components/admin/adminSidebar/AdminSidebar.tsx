"use client";
import React, { useState } from "react";
import styles from "./AdminSidebar.module.css";
import DashboardIcon from "@/components/IconsAndLogo/DashboardIcon";
import Logo from "@/components/IconsAndLogo/Logo";
import StudentIcon from "@/components/IconsAndLogo/StudentIcon";
import ContentIcon from "@/components/IconsAndLogo/ContentIcon";
import SubscriptionIcon from "@/components/IconsAndLogo/SubscriptionIcon";
import NotificationIcon from "@/components/IconsAndLogo/NotificationIcon";
import SettingsIcon from "@/components/IconsAndLogo/SettingsIcon";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

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
  const [contentOpen, setContentOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: DashboardIcon },
    { name: "Students", key: "students", icon: StudentIcon },
    {
      name: "Content",
      key: "content",
      icon: ContentIcon,
      hasSub: true,
      subItems: [
        { name: "Exams", key: "content-exams" },
        { name: "Lessons", key: "content-lessons" },
        { name: "Practice", key: "content-practice" },
      ],
    },
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

            if (item.hasSub) {
              return (
                <div key={item.key} className={styles.navGroup}>
                  <button
                    className={`${styles.navButton} ${
                      activeTab === item.key ? styles.active : ""
                    }`}
                    onClick={() => setContentOpen(!contentOpen)}
                  >
                    <Icon className="w-5 h-5" />
                    <p className={styles.navText}>{item.name}</p>
                    {contentOpen ? (
                      <FiChevronDown className={styles.arrowIcon} />
                    ) : (
                      <FiChevronRight className={styles.arrowIcon} />
                    )}
                  </button>

                  {contentOpen && (
                    <div className={styles.subMenu}>
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => {
                            setActiveTab(sub.key);
                            setOpen(false);
                          }}
                          className={`${styles.subNavButton} ${
                            activeTab === sub.key ? styles.active : ""
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setOpen(false);
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
