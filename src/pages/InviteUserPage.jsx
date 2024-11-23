import { useState } from "react";
import api from "../axiosConfig";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner"; // Asegúrate de ajustar la ruta según la ubicación del archivo

const InviteUserPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire("Error", "Please enter a valid email.", "error");
    }

    try {
      setLoading(true);
      await api.post("/private/invitation", { email });
      Swal.fire(
        "Success",
        "The invitation email has been sent successfully.",
        "success"
      );
      setEmail(""); // Limpiar el campo después de enviar la invitación
    } catch (error) {
      console.error("Error sending invitation:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Failed to send the invitation. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Invite a New User</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the email address of the person you would like to invite.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600`}
          >
            Send Invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteUserPage;
