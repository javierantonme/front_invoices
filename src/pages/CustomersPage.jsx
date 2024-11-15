import { useEffect, useState } from "react";
import api from "../axiosConfig";
import CustomerModal from "./CustomerModal";
import Swal from "sweetalert2";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/private/customer");

      setCustomers(response.data.customers);
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
        try {
          await api.delete(`private/customer/${id}`);
          Swal.fire("Deleted!", "The customer has been deleted.", "success");
          fetchCustomers(); // Actualiza la lista después de eliminar
        } catch (err) {
          console.error("Error deleting customer:", err);
          Swal.fire("Error!", "Failed to delete the customer.", "error");
        }
      }
    });
  };

  const handleSubmitCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        // Update existing customer
        await api.put(`/private/customer/${editingCustomer.id}`, customerData);
      } else {
        // Create new customer
        await api.post("/private/customer", customerData);
      }
      fetchCustomers(); // Refresh customers after update/create
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
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
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Code
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Suburb
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {customer.code}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.suburb}
                </td>
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
      </div>
    </div>
  );
};

export default CustomersPage;
