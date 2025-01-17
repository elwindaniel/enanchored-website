"use client";
import React, { useState } from "react";
import styles from "./EventBanner.module.css";
import Image from "next/image";

interface FormData {
  firstName: string;
  surName: string;
  email: string;
  phoneNumber: string;
  age: string;
  occupation: string;
  place: string;
  church: string;
}

interface FormErrors {
  firstName?: string;
  surName?: string;
  email?: string;
  phoneNumber?: string;
  age?: string;
  occupation?: string;
  place?: string;
  church?: string;
}

function RegistrationForm() {
  // Form state to manage visibility
  const [step, setStep] = useState<number>(1);

  // Form data to handle all form inputs
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surName: "",
    email: "",
    phoneNumber: "",
    age: "",
    occupation: "",
    place: "",
    church: "",
  });

  // Error state to track validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate fields
  const validateFields = (fields: string[]): boolean => {
    const newErrors: FormErrors = {};

    fields.forEach((field) => {
      if (!formData[field as keyof FormData]) {
        newErrors[field as keyof FormErrors] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitFirstForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields(["firstName", "surName", "email", "phoneNumber"])) {
      setStep(2); // Move to next step if validation passes
    }
  };

  const handleSubmitSecondForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (validateFields(["age", "occupation", "place", "church"])) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setStep(3); // Move to thank you step
        } else {
          console.log("Error submitting form");
        }
      } catch (err) {
        console.log("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      {/* Step 1: First Form */}
      <Image
        src="/camp/campBanner.png"
        alt="title-img"
        width={376}
        height={62}
        layout="responsive" // Make the image responsive
      />
      {step === 1 && (
        <form className={styles.formContainer} onSubmit={handleSubmitFirstForm}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName" className={styles.inputLabel}>
                First Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className={styles.errorText}>{errors.firstName}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="surName" className={styles.inputLabel}>
                Last Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="surName"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
              />
              {errors.surName && (
                <p className={styles.errorText}>{errors.surName}</p>
              )}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="phone" className={styles.inputLabel}>
              Phone
            </label>
            <input
              className={styles.input}
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className={styles.errorText}>{errors.phoneNumber}</p>}
          </div>

          <button type="submit" className={styles.registerButton}>
            NEXT
          </button>
        </form>
      )}

      {/* Step 2: Second Form */}
      {step === 2 && (
        <form
          className={styles.formContainer}
          onSubmit={handleSubmitSecondForm}
        >
          <div className={styles.inputContainer}>
            <label htmlFor="age" className={styles.inputLabel}>
              Age
            </label>
            <select
              className={styles.input}
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="">Select Age</option>
              {[...Array(18)].map((_, i) => {
                const age = (i + 13).toString();
                return (
                  <option key={age} value={age}>
                    {age}
                  </option>
                );
              })}
            </select>
            {errors.age && <p className={styles.errorText}>{errors.age}</p>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="occupation" className={styles.inputLabel}>
              Occupation
            </label>
            <select
              className={styles.input}
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {[
                { value: "student", label: "Student" },
                { value: "lookingForJob", label: "Looking for Job" },
                { value: "working", label: "Working" },
                { value: "ministry", label: "Ministry" },
              ].map((item, i) => (
                <option key={i} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.occupation && (
              <p className={styles.errorText}>{errors.occupation}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="place" className={styles.inputLabel}>
              Place
            </label>
            <input
              className={styles.input}
              type="text"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
            {errors.place && <p className={styles.errorText}>{errors.place}</p>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="church" className={styles.inputLabel}>
              Church
            </label>
            <input
              className={styles.input}
              type="text"
              id="church"
              name="church"
              value={formData.church}
              onChange={handleChange}
            />
            {errors.church && (
              <p className={styles.errorText}>{errors.church}</p>
            )}
          </div>

          <button type="submit" className={styles.registerButton}>
            SUBMIT
          </button>
        </form>
      )}

      {/* Step 3: Thank You Screen */}
      {step === 3 && (
        <Image
          src="/camp/thank.png"
          alt="title-img"
          width={376}
          height={196.04}
          layout="responsive" // Make the image responsive

        />
      )}
    </>
  );
}

export default RegistrationForm;
