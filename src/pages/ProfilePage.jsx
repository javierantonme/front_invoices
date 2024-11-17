import { useState, useEffect } from "react";
import api from "../axiosConfig";
import Swal from "sweetalert2";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    abn: "",
    bsb: "",
    accountNumber: "",
    consecInit: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/private/user");
        setProfile(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/private/user", profile);
      Swal.fire("Success", "Your profile has been updated!", "success");
      setProfile(response.data); // Actualizar la información local con los datos del backend
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update your profile.", "error");
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Diseño responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          {/* Información Personal */}
          <div className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border rounded px-4 py-2 w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border rounded px-4 py-2 w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email (cannot be changed)
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email}
                  readOnly
                  className="border rounded px-4 py-2 w-full bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Información Bancaria */}
          <div className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Banking Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="abn" className="block text-sm font-medium text-gray-700">
                  ABN
                </label>
                <input
                  type="text"
                  name="abn"
                  id="abn"
                  value={profile.abn}
                  onChange={handleChange}
                  placeholder="ABN"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="bsb" className="block text-sm font-medium text-gray-700">
                  BSB
                </label>
                <input
                  type="text"
                  name="bsb"
                  id="bsb"
                  value={profile.bsb}
                  onChange={handleChange}
                  placeholder="BSB"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="number"
                  name="accountNumber"
                  id="accountNumber"
                  value={profile.accountNumber}
                  onChange={handleChange}
                  placeholder="Account Number"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Información de Facturación */}
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Billing Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="consecInit" className="block text-sm font-medium text-gray-700">
                Invoice Consecutive Start
              </label>
              <input
                type="number"
                name="consecInit"
                id="consecInit"
                value={profile.consecInit}
                onChange={handleChange}
                placeholder="Invoice Consecutive Start"
                className="border rounded px-4 py-2 w-full"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
        <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Change Password
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
