import { useState, useEffect } from "react";
import api from "../../axiosConfig";
import UserModal from "./UserModal";
import Spinner from "../Spinner";
import UsersTableContent from "./UsersTableContent";
import Swal from "sweetalert2";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [Id, setId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licences, setLicences] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/private/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLicences = async () => {
      try {
        const response = await api.get("/private/licences");
        setLicences(response.data.licences);
      } catch (error) {
        console.error("Error fetching licences:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchLicences()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      setId(userId);
      const response = await api.get(`/private/user/${userId}`);
      setSelectedUser(response.data.user);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSave = async (updatedUser) => {
    try {
      await api.put(`/private/user/${Id}`, updatedUser);
      Swal.fire("Success", "User updated successfully", "success");

      // Recargar la lista de usuarios desde el backend
      const response = await api.get("/private/users");
      setUsers(response.data.users);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Failed to update user. Please try again.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      {loading ? (
        <Spinner />
      ) : (
        <UsersTableContent users={users} onUserClick={handleUserClick} />
      )}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          licences={licences}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UsersTable;
