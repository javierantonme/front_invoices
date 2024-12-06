import { useEffect, useState } from "react";
import api from "../../axiosConfig";
import CustomerTable from "./CustomerTable";
import CustomerModal from "./CustomerModal";
import Swal from "sweetalert2";
import Spinner from "../Spinner";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
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
        setActionLoading(true);
        try {
          await api.delete(`/private/customer/${id}`);
          Swal.fire("Deleted!", "The customer has been deleted.", "success");
          fetchCustomers();
        } catch (err) {
          console.error("Error deleting customer:", err);
          Swal.fire("Error!", "Failed to delete the customer.", "error");
        } finally {
          setActionLoading(false);
        }
      }
    });
  };

  const handleSubmitCustomer = async (customerData) => {
    setActionLoading(true);
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
      setActionLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      {(loading || actionLoading) && <Spinner />}
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
          <CustomerTable
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        </>
      )}
    </div>
  );
};

export default CustomersPage;
