import { useState } from "react";
import api from "../../axiosConfig";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import InviteForm from "./InviteForm";

const InviteUserPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

  return (
    <div className="flex justify-center items-center h-full">
      {loading ? (
        <Spinner />
      ) : (
        <InviteForm email={email} setEmail={setEmail} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default InviteUserPage;
