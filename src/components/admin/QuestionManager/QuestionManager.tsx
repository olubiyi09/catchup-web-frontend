"use client";
import React, { useEffect, useState } from "react";
import styles from "./QuestionManager.module.css";
import PublishIcon from "@/components/IconsAndLogo/PublishIcon";
import DraftIcon from "@/components/IconsAndLogo/DraftIcon";
import PracticeIcon from "@/components/IconsAndLogo/PracticeIcon";
import TotalQuestionsIcon from "@/components/IconsAndLogo/TotalQuestionsIcon";
import ManualEntry from "../ManualEntry/ManualEntry";
import QuestionLibrary from "../QuestionLibrary/QuestionLibrary";
import GradientButton from "../../../../reusable/GradientButton";

// import your tab contents

// Helper to format numbers
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

type BoxData = {
  color: string;
  title: string;
  count: string;
  Icon: React.FC<{ className?: string }>;
};

const QuestionManager = () => {
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);
  const [activeTab, setActiveTab] = useState<"manual" | "library">("manual");

  const colors = ["#0056D2", "#22C55E", "#8B5CF6", "#FB923C"];

  useEffect(() => {
    const dummyBoxes: Omit<BoxData, "color">[] = [
      { title: "Total Questions", count: "1,002", Icon: TotalQuestionsIcon },
      { title: "Published Sets", count: "500", Icon: PublishIcon },
      { title: "Draft Sets", count: "300", Icon: DraftIcon },
      { title: "Daily Practice Sessions", count: "10", Icon: PracticeIcon },
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
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Content Library - Question Manager</h1>
        <GradientButton onClick={() => alert("Clicked!")}>
          Add Question
        </GradientButton>
      </div>
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

      {/* Tabs */}
      <section className={styles.contentWrapper}>
        <div className={styles.headerTab}>
          <span
            className={`${activeTab === "manual" ? styles.active : ""}`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Entry
          </span>
          <span
            className={`${activeTab === "library" ? styles.active : ""}`}
            onClick={() => setActiveTab("library")}
          >
            Question Library
          </span>
          <div
            className={`${styles.indicator} ${
              activeTab === "manual" ? styles.left : styles.right
            }`}
          />
        </div>

        <div className={styles.tabContent}>
          {activeTab === "manual" && <ManualEntry />}
          {activeTab === "library" && <QuestionLibrary />}
        </div>
      </section>
    </div>
  );
};

export default QuestionManager;
