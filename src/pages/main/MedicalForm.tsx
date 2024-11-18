import React, { useState } from 'react';
import NavbarHome from '../../components/NavbarHome';

const MedicalForm: React.FC = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: 0,
    ever_married: '',
    work_type: '',
    residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
    stroke: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [error, setError] = useState('');

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

    // Basic validation (could be extended)
    if (!formData.gender || !formData.age || !formData.ever_married || !formData.work_type || !formData.residence_type) {
      setError('Please fill in all the required fields.');
      setIsSubmitting(false);
      return;
    }

    // Simulate API submission (replace with actual backend logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
    }, 2000);
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
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

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
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

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
                  <option value="">Select Work Type</option>
                  <option value="Children">Children</option>
                  <option value="Govt_job">Govt_job</option>
                  <option value="Never_worked">Never_worked</option>
                  <option value="Private">Private</option>
                  <option value="Self-employed">Self-employed</option>
                </select>
              </div>

              <div>
                <label htmlFor="residence_type" className="block text-sm font-medium text-gray-700">
                  Residence Type
                </label>
                <select
                  id="residence_type"
                  name="residence_type"
                  value={formData.residence_type}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Residence Type</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

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

              <div>
                <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
                  BMI (Body Mass Index)
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
                  <option value="">Select Smoking Status</option>
                  <option value="Formerly smoked">Formerly smoked</option>
                  <option value="Never smoked">Never smoked</option>
                  <option value="Smokes">Smokes</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label htmlFor="stroke" className="block text-sm font-medium text-gray-700">
                  Stroke History
                </label>
                <select
                  id="stroke"
                  name="stroke"
                  value={formData.stroke}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 text-white px-6 py-2 rounded-md font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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

