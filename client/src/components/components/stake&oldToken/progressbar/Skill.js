import React from "react";

function Skill({ progress, isVisible }) {
  const { title, percantage, progressColor, days, amount, claim } = progress;

  const progressQuery = () => {
    return (
      <div
        className="progress-bar data-background"
        style={
          isVisible
            ? {
                width: `${percantage}%`,
                background: progressColor,
              }
            : { width: 0, background: progressColor }
        }
      ></div>
    );
  };
  return (
    <div className="progress-item">
      <div className="progress-info">
        <h4 className="title">
          {title} - Initial amount: {amount} Total reward: {claim}
        </h4>
        <span className="progress-number">{days} Days to claim</span>
      </div>
      <div className="progress">{progressQuery()}</div>
    </div>
  );
}
export default Skill;
