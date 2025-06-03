import React, { useState } from "react";
import axios from "../services/api";
import FoodCheckboxGroup from "./FoodCheckboxGroup";

export default function SurveyForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    contactNumber: "",
    likesPizza: false,
    likesPasta: false,
    likesPapAndWors: false,
    likesOtherFood: false,
    rateMovies: "",
    rateRadio: "",
    rateEatOut: "",
    rateWatchTV: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const { fullName, email, dateOfBirth, contactNumber } = form;

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long.";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Date of Birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 5 || age > 120) {
        newErrors.dateOfBirth = "Age must be between 5 and 120 years.";
      }
    }

    // Contact Number validation
    if (!contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10,}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be at least 10 digits.";
    }

    // Favorite Foods validation — at least one must be checked
    const { likesPizza, likesPasta, likesPapAndWors, likesOtherFood } = form;
    if (!(likesPizza || likesPasta || likesPapAndWors || likesOtherFood)) {
      newErrors.food = "Please select at least one favorite food.";
    }

    // Ratings validation
    if (!form.rateMovies) newErrors.rateMovies = "Please rate movies.";
    if (!form.rateRadio) newErrors.rateRadio = "Please rate radio.";
    if (!form.rateEatOut) newErrors.rateEatOut = "Please rate eating out.";
    if (!form.rateWatchTV) newErrors.rateWatchTV = "Please rate watching TV.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing or checking
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Also clear 'food' error if any checkbox changed
    if (name.startsWith("likes") && errors.food) {
      setErrors((prev) => ({ ...prev, food: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post("/surveys", form);
      alert("Survey submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        email: "",
        dateOfBirth: "",
        contactNumber: "",
        likesPizza: false,
        likesPasta: false,
        likesPapAndWors: false,
        likesOtherFood: false,
        rateMovies: "",
        rateRadio: "",
        rateEatOut: "",
        rateWatchTV: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);

      // Handle email already exists error from backend
      if (err.response?.data?.message) {
        const message = err.response.data.message.toLowerCase();
        if (
          message.includes("email already exists") ||
          message.includes("email")
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "This email is already registered.",
          }));
        } else if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setError("Failed to submit survey. Please try again.");
        }
      } else {
        setError("Failed to submit survey. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Survey Form</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Personal Information Section */}
            <fieldset className="mb-4">
              <legend className="h5">Personal Information</legend>

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name*
                </label>
                <input
                  id="fullName"
                  className={`form-control ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth*
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  className={`form-control ${
                    errors.dateOfBirth ? "is-invalid" : ""
                  }`}
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateOfBirth && (
                  <div className="invalid-feedback">{errors.dateOfBirth}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number*
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  className={`form-control ${
                    errors.contactNumber ? "is-invalid" : ""
                  }`}
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                />
                {errors.contactNumber && (
                  <div className="invalid-feedback">{errors.contactNumber}</div>
                )}
              </div>
            </fieldset>

            {/* Favorite Foods Section */}
            <div className="mb-3">
              <label className="h5">Favorite Foods</label>
            </div>

            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Question</th>
                  <th className="text-center">Pizza</th>
                  <th className="text-center">Pasta</th>
                  <th className="text-center">Pap and Wors</th>
                  <th className="text-center">Other Food</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <FoodCheckboxGroup
                  form={form}
                  handleChange={handleChange}
                  error={errors.food}
                />
              </tbody>
            </table>

            {/* Ratings Section */}
            <table
              className="table table-bordered mt-4"
              style={{
                border: "1px solid #dee2e6",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th style={{ border: "1px solid #dee2e6", padding: "8px" }}>
                    Question
                  </th>
                  <th
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Strongly Agree
                  </th>
                  <th
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Agree
                  </th>
                  <th
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Neutral
                  </th>
                  <th
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Disagree
                  </th>
                  <th
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Strongly Disagree
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Rate Movies", name: "rateMovies" },
                  { label: "Rate Radio", name: "rateRadio" },
                  { label: "Rate Eating Out", name: "rateEatOut" },
                  { label: "Rate Watching TV", name: "rateWatchTV" },
                ].map(({ label, name }) => (
                  <tr key={name}>
                    <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>
                      {label}
                    </td>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <td
                        key={value}
                        style={{
                          border: "1px solid #dee2e6",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name={name}
                          value={value}
                          checked={form[name] === value.toString()}
                          onChange={handleChange}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show validation errors for ratings */}
            {(errors.rateMovies ||
              errors.rateRadio ||
              errors.rateEatOut ||
              errors.rateWatchTV) && (
              <div className="text-danger mt-2">
                {errors.rateMovies && <div>{errors.rateMovies}</div>}
                {errors.rateRadio && <div>{errors.rateRadio}</div>}
                {errors.rateEatOut && <div>{errors.rateEatOut}</div>}
                {errors.rateWatchTV && <div>{errors.rateWatchTV}</div>}
              </div>
            )}

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                style={{
                  backgroundColor: "#0d6efd",
                  borderColor: "#0d6efd",
                  width: "auto",
                  marginTop: "10px",
                  marginLeft: "20%",
                  display: "block",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Survey"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
