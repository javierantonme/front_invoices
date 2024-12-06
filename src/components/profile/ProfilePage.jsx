import { useState, useEffect } from "react";
import api from "../../axiosConfig";
import Swal from "sweetalert2";
import ChangePasswordModal from "./ChangePasswordModal";
import PersonalInformation from "./PersonalInformation";
import BankingInformation from "./BankingInformation";
import BillingInformation from "./BillingInformation";
import Spinner from "../Spinner";

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
  });

  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

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
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update your profile.", "error");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <PersonalInformation profile={profile} onChange={handleChange} />
          <BankingInformation profile={profile} onChange={handleChange} />
        </div>
        <BillingInformation profile={profile} onChange={handleChange} />
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
