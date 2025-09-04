"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";

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
  const [contentOpen, setContentOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: DashboardIcon },
    { name: "Students", key: "students", icon: StudentIcon },
    {
      name: "Content Library",
      key: "content",
      icon: ContentIcon,
      subItems: [
        { name: "Question Manager", key: "question-manager" },
        { name: "By Subject", key: "by-subject" },
        { name: "By Exam Type", key: "by-exam-type" },
      ],
    },
    { name: "Subscription", key: "subscription", icon: SubscriptionIcon },
    { name: "Notifications", key: "notifications", icon: NotificationIcon },
    { name: "Settings", key: "settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Hamburger - visible on mobile */}
      {/* Hamburger - visible on mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.title}>
          <Logo />
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.subItems) {
              return (
                <div key={item.key}>
                  <button
                    className={`${styles.navButton} ${
                      activeTab.startsWith("content") ? styles.active : ""
                    }`}
                    onClick={() => setContentOpen(!contentOpen)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <p className={styles.navText}>{item.name}</p>
                    </div>
                    {contentOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>

                  {contentOpen && (
                    <div className={styles.subNav}>
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => {
                            setActiveTab(sub.key);
                            setOpen(false);
                          }}
                          className={`${styles.subNavButton} ${
                            activeTab === sub.key ? styles.subItemsActive : ""
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
