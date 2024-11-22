import { useState, useEffect } from "react";
import api from "../axiosConfig";
import Swal from "sweetalert2";

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
    initialValue: 0.0,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/private/user");
        setProfile((prev) => ({
          ...prev,
          ...response.data.user,
        }));
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

    // Validar contraseñas
    if (profile.password && profile.password !== profile.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match.", "error");
    }

    try {
      const response = await api.put("/private/user", profile);
      Swal.fire("Success", "Your profile has been updated!", "success");
      setProfile((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        ...response.data,
      }));
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          {/* Información Personal */}
          <div className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
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
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
              {/* Campos de Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
          {/* Repetir para información bancaria */}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
