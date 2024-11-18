import { useState, useEffect } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateInvoicePage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCustomersAndServices = async () => {
      try {
        const [customersResponse, servicesResponse] = await Promise.all([
          api.get("/private/customer"),
          api.get("/private/service"),
        ]);
        setCustomers(customersResponse.data.customers || []);
        setServices(servicesResponse.data.services || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomersAndServices();
  }, []);

  const handleAddService = () => {
    setInvoiceDetails([
      ...invoiceDetails,
      { serviceId: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveService = (index) => {
    const updatedDetails = invoiceDetails.filter((_, i) => i !== index);
    setInvoiceDetails(updatedDetails);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedDetails = [...invoiceDetails];
    updatedDetails[index][field] = value;
    setInvoiceDetails(updatedDetails);
  };

  const calculateTotal = () => {
    return invoiceDetails.reduce(
      (total, detail) => total + detail.quantity * detail.unitPrice,
      0
    );
  };

  const handleSaveInvoice = async () => {
    const totalAmount = calculateTotal();

    if (!selectedCustomer) {
      Swal.fire(
        "Error",
        "Please select a customer before saving the invoice.",
        "error"
      );
      return;
    }

    const customer = customers.find(
      (c) => String(c.id) === String(selectedCustomer)
    );

    if (totalAmount <= 0) {
      Swal.fire(
        "Error",
        "The total amount of the invoice must be greater than 0.",
        "error"
      );
      return;
    }

    if (!customer) {
      Swal.fire("Error", "Invalid customer selected.", "error");
      return;
    }

    const details = invoiceDetails.map((detail) => {
      const service = services.find(
        (s) => String(s.id) === String(detail.serviceId)
      );
      const unitPrice = parseFloat(detail.unitPrice) || 0;
      const quantity = parseFloat(detail.quantity) || 0;

      return {
        serviceName: service ? service.name : "N/A",
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    });

    Swal.fire({
      title: "Invoice Summary",
      html: `
        <p><strong>Customer:</strong> ${customer.name}</p>
        <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
        <p><strong>Details:</strong></p>
        <ul>
          ${details
            .map(
              (detail) => `
            <li>
              ${detail.serviceName} - Quantity: ${
                detail.quantity
              }, Unit Price: $${detail.unitPrice.toFixed(
                2
              )}, Total: $${detail.total.toFixed(2)}
            </li>
          `
            )
            .join("")}
        </ul>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Save Invoice",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSaving(true); // Mostrar spinner
        try {
          const detailsPayload = invoiceDetails.map((detail) => ({
            serviceId: detail.serviceId,
            quantity: parseFloat(detail.quantity) || 0,
            unitPrice: parseFloat(detail.unitPrice) || 0,
          }));

          await api.post("/private/invoice", {
            customerId: selectedCustomer,
            details: detailsPayload,
          });
          Swal.fire("Success", "Invoice created successfully!", "success");
          navigate("/invoices");
        } catch (error) {
          console.error("Error creating invoice:", error);
          Swal.fire("Error", "Failed to create invoice.", "error");
        } finally {
          setSaving(false); // Ocultar spinner
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {saving && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="customerId"
            className="block text-sm font-medium text-gray-700"
          >
            Customer
          </label>
          <select
            id="customerId"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Invoice Details</h2>
          {invoiceDetails.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center"
            >
              <div>
                <label
                  htmlFor={`serviceId-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Service
                </label>
                <select
                  id={`serviceId-${index}`}
                  value={detail.serviceId}
                  onChange={(e) =>
                    handleServiceChange(index, "serviceId", e.target.value)
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor={`quantity-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  value={detail.quantity}
                  onChange={(e) =>
                    handleServiceChange(index, "quantity", e.target.value)
                  }
                  placeholder="Quantity"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor={`unitPrice-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Unit Price
                </label>
                <input
                  id={`unitPrice-${index}`}
                  type="number"
                  value={detail.unitPrice}
                  onChange={(e) =>
                    handleServiceChange(index, "unitPrice", e.target.value)
                  }
                  placeholder="Unit Price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveService(index)}
                className="bg-gray-200 text-red-500 hover:text-red-700 px-2 py-2 rounded-full focus:outline-none"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddService}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Service
          </button>

          <button
            type="button"
            onClick={handleSaveInvoice}
            className={`px-4 py-2 rounded ${
              saving
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoicePage;
