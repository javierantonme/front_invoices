import { useState, useEffect } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerSelection from "./CustomerSelection";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceSummary from "./InvoiceSummary";
import LoaderOverlay from "./LoaderOverlay";

const CreateInvoicePage = () => {
  const navigate = useNavigate();

  // Estados
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [saving, setSaving] = useState(false);

  // Efecto para cargar clientes y servicios al montar el componente
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

  // Funciones
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
      {saving && <LoaderOverlay />}
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <div className="space-y-6">
        <CustomerSelection
          customers={customers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        <InvoiceDetails
          services={services}
          invoiceDetails={invoiceDetails}
          handleServiceChange={handleServiceChange}
          handleAddService={handleAddService}
          handleRemoveService={handleRemoveService}
        />
        <InvoiceSummary
          total={calculateTotal()}
          handleSaveInvoice={handleSaveInvoice}
        />
      </div>
    </div>
  );
};

export default CreateInvoicePage;
