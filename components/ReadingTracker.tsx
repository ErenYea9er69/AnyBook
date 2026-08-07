"use client";

export default function ReadingTracker() {
  return (
    <div className="tracker-wrap">
      <div className="tracker-months">
        <div className="tracker-month-spacer" />
        {/* Placeholder for months */}
        <span className="tracker-month-label">Aug</span>
      </div>
      <div className="tracker-body">
        <div className="tracker-day-labels">
          <span className="tracker-day-label">Mon</span>
          <span className="tracker-day-label">Wed</span>
          <span className="tracker-day-label">Fri</span>
        </div>
        <div className="tracker-grid">
          {/* Placeholder for weeks */}
          <div className="tracker-week">
            <div className="tracker-cell level-1" />
            <div className="tracker-cell level-0" />
            <div className="tracker-cell level-3" />
            <div className="tracker-cell level-0" />
            <div className="tracker-cell level-2" />
            <div className="tracker-cell level-4" />
            <div className="tracker-cell level-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
