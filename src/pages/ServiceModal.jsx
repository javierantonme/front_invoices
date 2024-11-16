import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ServiceModal = ({ isOpen, onClose, onSubmit, service }) => {
  const initialFormState = {
    code: "",
    name: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Rellenar los datos si se edita un servicio
  useEffect(() => {
    if (service) {
      setFormData({
        code: service.code || "",
        name: service.name || "",
      });
    } else {
      setFormData(initialFormState); // Limpiar el formulario cuando no hay servicio
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Envía los datos al método `onSubmit` del padre
    onClose(); // Cierra el modal después de enviar
  };

  if (!isOpen) return null; // No renderizar si el modal está cerrado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {service ? "Edit Service" : "Add New Service"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Service Code"
              className="border rounded px-4 py-2 w-full"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Service Name"
              className="border rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormState); // Limpia los campos al cerrar
                onClose();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {service ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  service: PropTypes.object,
};

export default ServiceModal;
