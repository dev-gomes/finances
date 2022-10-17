import React from "react";

import "./styles.scss";

export const ResumeBox = ({ name, Icon, value, color }) => {
  return (
    <div className="resume-box" style={{ backgroundColor: `${color}2d` }}>
      <header>
        <p>{name}</p>
        <div>
          <Icon size={20} color="#fff" />
        </div>
      </header>
      <h2>R$ {value}</h2>
    </div>
  );
};
