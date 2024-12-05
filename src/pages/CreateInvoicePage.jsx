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

    Swal.fire({
      title: "Confirm Invoice",
      text: `The total invoice amount is $${totalAmount.toFixed(
        2
      )}. Do you want to save?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSaving(true);
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
          Swal.fire("Error", error.response.data.error, "error");
        } finally {
          setSaving(false);
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
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <div className="space-y-6">
        {/* Customer Selection */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Step 1: Select Customer</h2>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
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

        {/* Invoice Details */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Step 2: Add Services</h2>
          {invoiceDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-4 border-b pb-2"
            >
              <div className="flex-1">
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
                  className="w-full p-2 border border-gray-300 rounded"
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
                  placeholder="Qty"
                  className="w-20 p-2 border border-gray-300 rounded"
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
                  placeholder="Price"
                  className="w-28 p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={() => handleRemoveService(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Service
          </button>
        </div>

        {/* Total and Save */}
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Invoice Total</h2>
          <p className="text-2xl font-bold text-blue-600">
            ${calculateTotal().toFixed(2)}
          </p>
          <button
            onClick={handleSaveInvoice}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
