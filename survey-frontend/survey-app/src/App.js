import React, { useState } from "react";
import SurveyForm from "./components/SurveyForm";
import SurveyStats from "./components/SurveyStats";
import SurveyList from "./components/SurveyList";
import "./App.css";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("form");

  const screens = {
    form: <SurveyForm />,
    stats: <SurveyStats />,
    list: <SurveyList />,
  };

  return (
    <div className="App container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          📊 Survey Application
        </h1>
        <p className="text-muted">Collect feedback and gain insights</p>
      </header>

      {/* Navigation */}
      <nav
        className="d-flex justify-content-between mb-4 custom-nav"
        role="navigation"
        aria-label="Survey Application Navigation"
      >
        <div className="nav-left">
          <button
            aria-pressed={activeScreen === "list"}
            className={`btn btn-outline-primary ${
              activeScreen === "list" ? "active" : ""
            }`}
            onClick={() => setActiveScreen("list")}
          >
            Survey List
          </button>
        </div>

        <div className="nav-center">
          <button
            aria-pressed={activeScreen === "form"}
            className={`btn btn-outline-primary ${
              activeScreen === "form" ? "active" : ""
            }`}
            onClick={() => setActiveScreen("form")}
          >
            Fill Survey
          </button>
        </div>

        <div className="nav-right">
          <button
            aria-pressed={activeScreen === "stats"}
            className={`btn btn-outline-primary ${
              activeScreen === "stats" ? "active" : ""
            }`}
            onClick={() => setActiveScreen("stats")}
          >
            View Stats
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="shadow-lg p-4 bg-white rounded">
        {screens[activeScreen] || <SurveyForm />}
      </main>
    </div>
  );
}
