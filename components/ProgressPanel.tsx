"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  MONTHLY_FREEZE_ALLOWANCE,
  getReadingDays,
  getStreakState,
  setWeeklyGoal,
  type ReadingDayMap,
  type StreakState,
  type WeeklyGoal,
} from "@/lib/reading-storage";
import { buildYearGrid, columnMonthLabels, currentWeekActiveDays } from "@/lib/streak-grid";

const GOAL_OPTIONS: WeeklyGoal[] = [3, 5, 7];

const DEPTH_LABELS: Record<number, string> = {
  0: "No reading",
  1: "A quick angle",
  2: "A couple of angles",
  3: "A full chapter",
  4: "A finished book",
};

export default function ProgressPanel() {
  const { user } = useAuth();
  const [readingDays, setReadingDays] = useState<ReadingDayMap>({});
  const [streak, setStreak] = useState<StreakState | null>(null);

  useEffect(() => {
    if (!user) return;
    setReadingDays(getReadingDays(user.uid));
    setStreak(getStreakState(user.uid));
  }, [user]);

  function handleGoalChange(goal: WeeklyGoal) {
    if (!user) return;
    setStreak(setWeeklyGoal(user.uid, goal));
  }

  if (!user || !streak) {
    return (
      <div className="dash-empty">
        <span className="eyebrow">Progress</span>
        <h2>Loading your progress</h2>
      </div>
    );
  }

  const columns = buildYearGrid(readingDays);
  const monthLabels = columnMonthLabels(columns);
  const weekCount = currentWeekActiveDays(readingDays);

  return (
    <div className="progress-panel">
      <span className="eyebrow">Progress</span>
      <h2 className="progress-title">Your reading habit</h2>

      <div className="progress-stats">
        <div className="stat-block">
          <span className="stat-value">{streak.currentStreak}</span>
          <span className="stat-label">Current streak</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">{streak.longestStreak}</span>
          <span className="stat-label">Longest streak</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">{streak.totalActiveDays}</span>
          <span className="stat-label">Total active days</span>
        </div>
      </div>

      <div className="streak-grid-outer">
        <div className="streak-grid-wrap">
          <div className="streak-grid-months">
            {monthLabels.map((label, i) => (
              <span key={i} className="streak-month-label">
                {label ?? ""}
              </span>
            ))}
          </div>
          <div className="streak-grid">
            {columns.map((column, ci) => (
              <div className="streak-column" key={ci}>
                {column.map((cell, ri) => (
                  <div
                    key={ri}
                    className={`streak-cell${cell ? ` depth-${cell.depth}` : " is-empty"}`}
                    title={cell ? `${cell.key}: ${DEPTH_LABELS[cell.depth]}` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-row">
        <div className="freeze-note">
          <span className="freeze-count">
            {streak.freezesAvailable} of {MONTHLY_FREEZE_ALLOWANCE}
          </span>
          <span>streak freezes left this month</span>
        </div>

        <div className="goal-picker">
          <span className="goal-label">Weekly goal</span>
          <div className="goal-options">
            {GOAL_OPTIONS.map((goal) => (
              <button
                key={goal}
                type="button"
                className={`goal-btn${streak.weeklyGoal === goal ? " is-active" : ""}`}
                onClick={() => handleGoalChange(goal)}
              >
                {goal} days
              </button>
            ))}
          </div>
          <span className="goal-progress">
            {weekCount} of {streak.weeklyGoal} days this week
          </span>
        </div>
      </div>
    </div>
  );
}   