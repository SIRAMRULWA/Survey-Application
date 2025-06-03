import React, { useEffect, useState } from "react";
import axios from "../services/api";

export default function SurveyStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("/surveys/stats")
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No Surveys Available
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Survey Results
      </h2>
      <ul className="list-group">
        <li className="list-group-item" style={rowStyle}>
          <span>Total number of surveys:</span>{" "}
          <span>{stats.totalSurveys}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Average Age:</span> <span>{stats.averageAge}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Oldest person who participated in survey:</span>{" "}
          <span>{stats.oldestAge}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Youngest person who participated in survey:</span>{" "}
          <span>{stats.youngestAge}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Percentage of people who like Pizza:</span>{" "}
          <span>{stats.pizzaPercentage}%</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Percentage of people who like Pasta:</span>{" "}
          <span>{stats.pastaPercentage}%</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>Percentage of people who like Pap and Wors:</span>{" "}
          <span>{stats.papPercentage}%</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>People who like to watch movies:</span>{" "}
          <span>{stats.avgMovies}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>People who like to listen to radio:</span>{" "}
          <span>{stats.avgRadio}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>People who like to eat out:</span>{" "}
          <span>{stats.avgEatOut}</span>
        </li>
        <li className="list-group-item" style={rowStyle}>
          <span>People who like to watch TV:</span> <span>{stats.avgTV}</span>
        </li>
      </ul>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.75rem 1rem",
};
