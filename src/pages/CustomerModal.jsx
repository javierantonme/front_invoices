import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CustomerModal = ({ isOpen, onClose, onSubmit, customer }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    suburb: "",
    phone: "",
    email: "",
    rate: "",
    observations: "",
  });

  const initialFormState = {
    code: "",
    name: "",
    address: "",
    suburb: "",
    phone: "",
    email: "",
    rate: "",
    observations: "",
  };

  // Rellenar los datos si se edita un cliente
  useEffect(() => {
    if (customer) {
      setFormData({
        code: customer.code || "",
        name: customer.name || "",
        address: customer.address || "",
        suburb: customer.suburb || "",
        phone: customer.phone || "",
        email: customer.email || "",
        rate: customer.rate || "",
        observations: customer.observations || "",
      });
    }else {
        setFormData(initialFormState); // Limpia el formulario cuando no hay cliente
      }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Cierra el modal después de enviar
  };

  if (!isOpen) return null; // No renderizar si el modal está cerrado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {customer ? "Edit Customer" : "Add New Customer"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Code"
              className="border rounded px-4 py-2 w-full"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded px-4 py-2 w-full"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              name="suburb"
              value={formData.suburb}
              onChange={handleChange}
              placeholder="Suburb"
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded px-4 py-2 w-full"
              required
            />
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              placeholder="Rate"
              className="border rounded px-4 py-2 w-full"
              required
            />
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Observations"
              className="border rounded px-4 py-2 w-full"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {customer ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CustomerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object,
};

export default CustomerModal;
