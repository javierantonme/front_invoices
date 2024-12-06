import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../axiosConfig";
import ServiceModal from "./ServiceModal";
import ServicesTable from "./ServicesTable";
import Spinner from "../Spinner";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await api.get("/private/service");
      setServices(response.data.services || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddNewService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/private/service/${id}`);
          Swal.fire("Deleted!", "The service has been deleted.", "success");
          fetchServices();
        } catch (err) {
          console.error("Error deleting service:", err);
          Swal.fire("Error!", "Failed to delete the service.", "error");
        }
      }
    });
  };

  const handleSubmitService = async (serviceData) => {
    try {
      if (editingService) {
        await api.put(`/private/service/${editingService.id}`, serviceData);
        Swal.fire("Updated!", "The service has been updated.", "success");
      } else {
        await api.post("/private/service", serviceData);
        Swal.fire("Added!", "The service has been added.", "success");
      }
      fetchServices();
    } catch (err) {
      console.error("Error saving service:", err);
      Swal.fire("Error!", err.response?.data?.error || "Failed to save service.", "error");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={handleAddNewService}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-md transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Service
        </button>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitService}
        service={editingService}
      />

      <ServicesTable
        services={services}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
      />
    </div>
  );
};

export default ServicesPage;
