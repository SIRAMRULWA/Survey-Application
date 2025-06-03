import React from "react";

const likertOptions = [
  { label: "Strongly Agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly Disagree", value: 1 },
];

export default function RatingGroup({ title, name, value, onChange, error }) {
  return (
    <tr className={error ? "table-danger" : ""}>
      <td>{title}</td>
      {likertOptions.map((option) => (
        <td key={option.value} className="text-center">
          <input
            type="radio"
            className="form-check-input"
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
        </td>
      ))}
    </tr>
  );
}
