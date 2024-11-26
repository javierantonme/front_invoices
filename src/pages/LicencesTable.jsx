import { useState, useEffect } from "react";
import api from "../axiosConfig";
import Swal from "sweetalert2";
import LicenceModal from "./LicenceModal";
import Spinner from "../components/Spinner";

const LicencesTable = () => {
  const [licences, setLicences] = useState([]);
  const [selectedLicence, setSelectedLicence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar licencias desde el backend
  useEffect(() => {
    const fetchLicences = async () => {
      try {
        const response = await api.get("/private/licences");
        setLicences(response.data.licences);
      } catch (error) {
        console.error("Error fetching licences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicences();
  }, []);

  // Abrir el modal para crear o editar una licencia
  const handleOpenModal = (licence = null) => {
    setSelectedLicence(licence);
    setIsModalOpen(true);
  };

  // Guardar o actualizar una licencia
  const handleSaveLicence = async (licenceData) => {
    try {
      if (licenceData.id) {
        // Actualizar licencia existente
        await api.put(`/private/licence/${licenceData.id}`, licenceData);
        Swal.fire("Success", "Licence updated successfully", "success");
      } else {
        // Crear nueva licencia
        const response = await api.post("/private/licence", licenceData);
        Swal.fire("Success", "Licence created successfully", "success");

        // Añadir la nueva licencia a la lista
        setLicences((prev) => [...prev, response.data.licence]);
      }

      // Actualizar la tabla para reflejar cambios
      setLicences((prev) =>
        licenceData.id
          ? prev.map((licence) =>
              licence.id === licenceData.id ? licenceData : licence
            )
          : prev
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving licence:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error ||
          "Failed to save licence. Please try again.",
        "error"
      );
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Licences</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => handleOpenModal()}
        >
          Add Licence
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Invoices</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {licences.map((licence) => (
              <tr key={licence.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{licence.code}</td>
                <td className="px-4 py-3 border-b">{licence.name}</td>
                <td className="px-4 py-3 border-b">{licence.numberInvoices}</td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      licence.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {licence.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleOpenModal(licence)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <LicenceModal
          licence={selectedLicence}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveLicence}
        />
      )}
    </div>
  );
};

export default LicencesTable;
