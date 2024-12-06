import { useEffect, useState } from "react";
import api from "../../axiosConfig.js";
import LicenceModal from "./LicenceModal";
import Spinner from "../../components/Spinner";
import LicenceTable from "./LicenceTable";
import Swal from "sweetalert2";

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
      <LicenceTable licences={licences} onEdit={handleOpenModal} />
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
