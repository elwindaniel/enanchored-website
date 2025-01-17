// /app/feedback/page.tsx

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/form/FeedbackRegistrationForm.module.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  gender: string;
  referral: string[];
  programAttended: string[];
  satisfaction: string;
  favoriteAspect: string[];
  spiritualEnrichment: string;
  futureEvents: string;
  volunteer: string;
  programSuggestions: string[];
  additionalComments: string;
}

const initialState: FormData = {
  fullName: '',
  email: '',
  phone: '',
  ageGroup: '',
  gender: '',
  referral: [],
  programAttended: [],
  satisfaction: '',
  favoriteAspect: [],
  spiritualEnrichment: '',
  futureEvents: '',
  volunteer: '',
  programSuggestions: [],
  additionalComments: '',
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      const currentArray = prev[name as keyof FormData] as string[];

      if (checked) {
        return {
          ...prev,
          [name]: [...currentArray, value],
        };
      } else {
        return {
          ...prev,
          [name]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Send form data to the API
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData(initialState);
      } else {
        setSubmissionStatus(`error: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error: Something went wrong.');
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2>Feedback Form</h2>
      {submissionStatus === 'success' ? (
        <p className={styles.successMessage}>Thank you for your feedback!</p>
      ) : (
        <>
          {submissionStatus && submissionStatus.startsWith('error') && (
            <p className={styles.errorMessage}>{submissionStatus}</p>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Section 1: Personal Information */}
            <h3>Section 1: Personal Information</h3>

            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Email ID:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Phone Number / WhatsApp Number:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Age Group:
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Age Group</option>
                <option value="Under 18">Under 18</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </label>

            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>

            {/* Uncomment and customize the following sections as needed */}
            {/* 
            <label>
              How did you hear about this program?
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="referral"
                    value="Church"
                    checked={formData.referral.includes('Church')}
                    onChange={handleCheckboxChange}
                  />
                  Church
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="referral"
                    value="Social Media"
                    checked={formData.referral.includes('Social Media')}
                    onChange={handleCheckboxChange}
                  />
                  Social Media
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="referral"
                    value="Family/Friend"
                    checked={formData.referral.includes('Family/Friend')}
                    onChange={handleCheckboxChange}
                  />
                  Family/Friend
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="referral"
                    value="Other"
                    checked={formData.referral.includes('Other')}
                    onChange={handleCheckboxChange}
                  />
                  Other
                </label>
              </div>
            </label>
            */}

            {/* Section 2: Program Experience */}
            <h3>Section 2: Program Experience</h3>

            {/* 
            <label>
              Which program or event did you attend?
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Bible Study"
                    checked={formData.programAttended.includes('Bible Study')}
                    onChange={handleCheckboxChange}
                  />
                  Bible Study
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Worship Service"
                    checked={formData.programAttended.includes('Worship Service')}
                    onChange={handleCheckboxChange}
                  />
                  Worship Service
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Fellowship Meeting"
                    checked={formData.programAttended.includes('Fellowship Meeting')}
                    onChange={handleCheckboxChange}
                  />
                  Fellowship Meeting
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Youth Gathering"
                    checked={formData.programAttended.includes('Youth Gathering')}
                    onChange={handleCheckboxChange}
                  />
                  Youth Gathering
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Retreat"
                    checked={formData.programAttended.includes('Retreat')}
                    onChange={handleCheckboxChange}
                  />
                  Retreat
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programAttended"
                    value="Other"
                    checked={formData.programAttended.includes('Other')}
                    onChange={handleCheckboxChange}
                  />
                  Other
                </label>
              </div>
            </label>
            */}

            <label>
              How satisfied were you with the program?
              <select
                name="satisfaction"
                value={formData.satisfaction}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Satisfaction Level</option>
                <option value="Very Satisfied">Very Satisfied</option>
                <option value="Satisfied">Satisfied</option>
                <option value="Neutral">Neutral</option>
                <option value="Unsatisfied">Unsatisfied</option>
                <option value="Very Unsatisfied">Very Unsatisfied</option>
              </select>
            </label>

            <label>
              What aspect of the program did you enjoy the most?
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="favoriteAspect"
                    value="Worship and Music"
                    checked={formData.favoriteAspect.includes('Worship and Music')}
                    onChange={handleCheckboxChange}
                  />
                  Worship and Music
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="favoriteAspect"
                    value="Teaching/Message"
                    checked={formData.favoriteAspect.includes('Teaching/Message')}
                    onChange={handleCheckboxChange}
                  />
                  Teaching/Message
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="favoriteAspect"
                    value="Fellowship/Community"
                    checked={formData.favoriteAspect.includes('Fellowship/Community')}
                    onChange={handleCheckboxChange}
                  />
                  Fellowship/Community
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="favoriteAspect"
                    value="Activities and Games"
                    checked={formData.favoriteAspect.includes('Activities and Games')}
                    onChange={handleCheckboxChange}
                  />
                  Activities and Games
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="favoriteAspect"
                    value="Other"
                    checked={formData.favoriteAspect.includes('Other')}
                    onChange={handleCheckboxChange}
                  />
                  Other
                </label>
              </div>
            </label>

            <label>
              Was the program content spiritually enriching for you?
              <select
                name="spiritualEnrichment"
                value={formData.spiritualEnrichment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an Option</option>
                <option value="Yes, very much">Yes, very much</option>
                <option value="Somewhat">Somewhat</option>
                <option value="Not really">Not really</option>
                <option value="Not at all">Not at all</option>
              </select>
            </label>

            {/* Section 3: Future Involvement and Suggestions */}
            <h3>Section 3: Future Involvement and Suggestions</h3>

            <label>
              Would you be interested in attending similar events in the future?
              <select
                name="futureEvents"
                value={formData.futureEvents}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an Option</option>
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
                <option value="No">No</option>
              </select>
            </label>

            <label>
              Would you like to volunteer or join us in organizing future programs?
              <select
                name="volunteer"
                value={formData.volunteer}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an Option</option>
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
                <option value="No">No</option>
              </select>
            </label>

            <label>
              What other types of programs or topics would you like to see offered?
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Bible Studies on Specific Topics"
                    checked={formData.programSuggestions.includes('Bible Studies on Specific Topics')}
                    onChange={handleCheckboxChange}
                  />
                  Bible Studies on Specific Topics
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Worship Nights"
                    checked={formData.programSuggestions.includes('Worship Nights')}
                    onChange={handleCheckboxChange}
                  />
                  Worship Nights
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Community Service Projects"
                    checked={formData.programSuggestions.includes('Community Service Projects')}
                    onChange={handleCheckboxChange}
                  />
                  Community Service Projects
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Family Events"
                    checked={formData.programSuggestions.includes('Family Events')}
                    onChange={handleCheckboxChange}
                  />
                  Family Events
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Youth/Teen Activities"
                    checked={formData.programSuggestions.includes('Youth/Teen Activities')}
                    onChange={handleCheckboxChange}
                  />
                  Youth/Teen Activities
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="programSuggestions"
                    value="Other"
                    checked={formData.programSuggestions.includes('Other')}
                    onChange={handleCheckboxChange}
                  />
                  Other
                </label>
              </div>
            </label>

            <label>
              Any additional comments or suggestions?
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={4}
              />
            </label>

            <button type="submit" className={styles.saveButton}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
