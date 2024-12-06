import PropTypes from "prop-types";
import { useState } from "react";

const RegistrationForm = ({ formData, setFormData, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordValidation({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, termsAccepted);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Complete Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            <li className={passwordValidation.length ? "text-green-500" : ""}>
              At least 8 characters
            </li>
            <li className={passwordValidation.uppercase ? "text-green-500" : ""}>
              At least one uppercase letter
            </li>
            <li className={passwordValidation.lowercase ? "text-green-500" : ""}>
              At least one lowercase letter
            </li>
            <li className={passwordValidation.number ? "text-green-500" : ""}>
              At least one number
            </li>
            <li
              className={
                passwordValidation.specialChar ? "text-green-500" : ""
              }
            >
              At least one special character
            </li>
          </ul>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-checkbox text-blue-500"
              />
              <span className="text-sm text-gray-600 ml-2">
                I agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-blue-500 underline hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`w-full py-2 px-4 rounded text-white ${
              termsAccepted
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
