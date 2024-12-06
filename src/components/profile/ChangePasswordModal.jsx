import { useState } from "react";
import PropTypes from "prop-types";
import api from "../../axiosConfig.js";
import Swal from "sweetalert2";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar errores al cambiar el input
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.password) {
      errors.password = "Current password is required.";
      valid = false;
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required.";
      valid = false;
    }

    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password.";
      valid = false;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
       await api.put("/private/user/changepassword", {
        password: formData.password,
        newPassword: formData.newPassword,
      });

      Swal.fire("Success", "Your password has been updated!", "success");
      onClose();
      setFormData({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);

    //   let errorMessage = "Failed to change password.";
    //   if (error.response && error.response.data && error.response.data.message) {
    //     errorMessage = error.response.data.message;
    //   }

      Swal.fire("Error", error.response.data.error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Current Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
                required
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
                required
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({
                  password: "",
                  newPassword: "",
                  confirmNewPassword: "",
                });
                setErrors({});
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
