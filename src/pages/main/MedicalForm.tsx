import React, { useState } from 'react';
import NavbarHome from '../../components/NavbarHome';
import axios from 'axios';

const MedicalForm: React.FC = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setPrediction(null);

    const {
      gender,
      age,
      hypertension,
      heart_disease,
      ever_married,
      work_type,
      Residence_type,
      avg_glucose_level,
      bmi,
      smoking_status,
    } = formData;

    // Validate all fields
    if (
      !gender ||
      !age ||
      hypertension === '' ||
      heart_disease === '' ||
      !ever_married ||
      !work_type ||
      !Residence_type ||
      !avg_glucose_level ||
      !bmi ||
      !smoking_status
    ) {
      setError('Please fill in all the required fields.');
      setIsSubmitting(false);
      return;
    }

    // Check numeric values
    if (
      isNaN(Number(age)) ||
      isNaN(Number(avg_glucose_level)) ||
      isNaN(Number(bmi)) ||
      Number(age) <= 0 ||
      Number(avg_glucose_level) <= 0 ||
      Number(bmi) <= 0
    ) {
      setError('Age, Average Glucose Level, and BMI must be valid positive numbers.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.stroke_risk);
      setFormSuccess(true);
    } catch (err) {
      setError('Error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Medical Information Form</h2>

          {formSuccess ? (
            <div className="text-center text-green-600">
              <h3 className="text-xl">Form Submitted Successfully</h3>
              <p>Your medical information has been saved.</p>
              {prediction && (
                <div className="mt-4">
                  <p className="text-xl">Prediction: Stroke Risk - {prediction}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter age"
                />
              </div>

              {/* Hypertension */}
              <div>
                <label htmlFor="hypertension" className="block text-sm font-medium text-gray-700">
                  Hypertension
                </label>
                <select
                  id="hypertension"
                  name="hypertension"
                  value={formData.hypertension}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Heart Disease */}
              <div>
                <label htmlFor="heart_disease" className="block text-sm font-medium text-gray-700">
                  Heart Disease
                </label>
                <select
                  id="heart_disease"
                  name="heart_disease"
                  value={formData.heart_disease}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Ever Married */}
              <div>
                <label htmlFor="ever_married" className="block text-sm font-medium text-gray-700">
                  Ever Married
                </label>
                <select
                  id="ever_married"
                  name="ever_married"
                  value={formData.ever_married}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Work Type */}
              <div>
                <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <select
                  id="work_type"
                  name="work_type"
                  value={formData.work_type}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="Private">Private</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Govt_job">Govt Job</option>
                  <option value="children">Children</option>
                  <option value="Never_worked">Never worked</option>
                </select>
              </div>

              {/* Residence Type */}
              <div>
                <label htmlFor="Residence_type" className="block text-sm font-medium text-gray-700">
                  Residence Type
                </label>
                <select
                  id="Residence_type"
                  name="Residence_type"
                  value={formData.Residence_type}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              {/* Average Glucose Level */}
              <div>
                <label htmlFor="avg_glucose_level" className="block text-sm font-medium text-gray-700">
                  Average Glucose Level
                </label>
                <input
                  type="number"
                  id="avg_glucose_level"
                  name="avg_glucose_level"
                  value={formData.avg_glucose_level}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter average glucose level"
                />
              </div>

              {/* BMI */}
              <div>
                <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
                  BMI
                </label>
                <input
                  type="number"
                  id="bmi"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter BMI"
                />
              </div>

              {/* Smoking Status */}
              <div>
                <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-700">
                  Smoking Status
                </label>
                <select
                  id="smoking_status"
                  name="smoking_status"
                  value={formData.smoking_status}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select</option>
                  <option value="Never smoked">Never smoked</option>
                  <option value="Formerly smoked">Formerly smoked</option>
                  <option value="Smokes">Smokes</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicalForm;

