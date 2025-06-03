import React, { useEffect, useState } from "react";
import axios from "../services/api";

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inline style for padding on table cells
  const cellPadding = { paddingLeft: "1.5rem", paddingRight: "1.5rem" };

  useEffect(() => {
    axios
      .get("/surveys")
      .then((res) => {
        setSurveys(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center my-4">Loading surveys...</p>;
  if (surveys.length === 0)
    return <p className="text-center my-4">No surveys found.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary text-center">All Submitted Surveys</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-center">
            <tr>
              <th style={cellPadding}>Full Name</th>
              <th style={cellPadding}>Email</th>
              <th style={cellPadding}>Date of Birth</th>
              <th style={cellPadding}>Contact Number</th>
              <th style={cellPadding}>Favorite Foods</th>
              <th style={cellPadding}>
                Ratings{" "}
                <small className="text-muted">
                  (Movies, Radio, Eat Out, TV)
                </small>
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((s, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "table-secondary" : ""}>
                <td style={cellPadding}>{s.fullName}</td>
                <td style={cellPadding}>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-decoration-none"
                  >
                    {s.email}
                  </a>
                </td>
                <td style={{ ...cellPadding, textAlign: "center" }}>
                  {new Date(s.dateOfBirth).toLocaleDateString()}
                </td>
                <td style={{ ...cellPadding, textAlign: "center" }}>
                  {s.contactNumber}
                </td>
                <td style={cellPadding}>
                  {[
                    s.likesPizza && "Pizza",
                    s.likesPasta && "Pasta",
                    s.likesPapAndWors && "Pap & Wors",
                    s.likesOtherFood && "Other",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </td>
                <td
                  style={{
                    ...cellPadding,
                    textAlign: "center",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                  }}
                >
                  {`${s.rateMovies}, ${s.rateRadio}, ${s.rateEatOut}, ${s.rateWatchTV}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
