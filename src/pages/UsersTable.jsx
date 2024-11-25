import { useState, useEffect } from "react";
import api from "../axiosConfig";
import UserModal from "./UserModal";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [Id, setId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde el backend
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

    fetchUsers();
  }, []);

  // Abrir el modal con la información del usuario seleccionado
  const handleUserClick = async (userId) => {
    try {
        setId(userId)
      const response = await api.get(`/private/user/${userId}`);
      setSelectedUser(response.data.user); // Asegúrate de que el ID esté incluido
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Guardar cambios en el backend
  const handleSave = async (updatedUser) => {
    try {
      
      await api.put(`/private/user/${Id}`, updatedUser);
      Swal.fire("Success", "User updated successfully", "success");

      // Actualizar la lista de usuarios después de guardar
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );

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
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Invoices
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td
                    className="px-4 py-3 border-b text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleUserClick(user.id)}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="px-4 py-3 border-b">{user.email}</td>
                  <td className="px-4 py-3 border-b">{user.phone || "N/A"}</td>
                  <td className="px-4 py-3 border-b">
                    {user.address || "N/A"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : user.role === "special"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">{user.invoiceCount || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UsersTable;
