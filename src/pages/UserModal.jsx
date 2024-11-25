import { useState } from "react";

const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">
          Edit User: {formData.firstName} {formData.lastName}
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="special">Special</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="active"
              value={formData.active}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "active", value: e.target.value === "true" },
                })
              }
              className="w-full px-3 py-2 border rounded"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
