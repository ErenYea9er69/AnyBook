"use client";

export default function MonthlyChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const maxBooks = 10;
  
  return (
    <div className="month-chart">
      {months.map((month, i) => (
        <div key={month} className="month-bar-wrap">
          <div className="month-bar-track">
            <div 
              className="month-bar-fill" 
              style={{ height: `${(Math.random() * maxBooks) * 10}%` }}
            />
          </div>
          <span className="month-bar-label">{month}</span>
        </div>
      ))}
    </div>
  );
}
