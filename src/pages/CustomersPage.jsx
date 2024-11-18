import { useEffect, useState } from "react";
import api from "../axiosConfig";
import CustomerModal from "./CustomerModal";
import Swal from "sweetalert2";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner de carga inicial
  const [actionLoading, setActionLoading] = useState(false); // Spinner para acciones
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/private/customer");
      setCustomers(response.data.customers || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddNewCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id) => {
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
        setActionLoading(true); // Mostrar spinner para la acción
        try {
          await api.delete(`/private/customer/${id}`);
          Swal.fire("Deleted!", "The customer has been deleted.", "success");
          fetchCustomers();
        } catch (err) {
          console.error("Error deleting customer:", err);
          Swal.fire("Error!", "Failed to delete the customer.", "error");
        } finally {
          setActionLoading(false); // Ocultar spinner
        }
      }
    });
  };

  const handleSubmitCustomer = async (customerData) => {
    setActionLoading(true); // Mostrar spinner para la acción
    try {
      if (editingCustomer) {
        await api.put(`/private/customer/${editingCustomer.id}`, customerData);
        Swal.fire("Updated!", "The customer has been updated.", "success");
      } else {
        await api.post("/private/customer", customerData);
        Swal.fire("Added!", "The customer has been added.", "success");
      }
      fetchCustomers();
    } catch (err) {
      console.error("Error saving customer:", err);
      Swal.fire("Error!", "Failed to save the customer.", "error");
    } finally {
      setActionLoading(false); // Ocultar spinner
      setIsModalOpen(false); // Cerrar el modal
    }
  };

  return (
    <div className="p-4">
      {(loading || actionLoading) && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && !actionLoading && error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Customers</h1>
            <button
              onClick={handleAddNewCustomer}
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
              Add New Customer
            </button>
          </div>

          <CustomerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitCustomer}
            customer={editingCustomer}
          />

          <div className="overflow-x-auto">
            {customers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No customers found for this user. Click Add New Customer to create one.
              </p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Code</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Name</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Phone</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Suburb</th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="border border-gray-300 px-4 py-2">{customer.code}</td>
                      <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{customer.phone}</td>
                      <td className="border border-gray-300 px-4 py-2">{customer.suburb}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 w-full">
                          <button
                            className="bg-blue-500 text-white w-full md:w-auto px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white w-full md:w-auto px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomersPage;
