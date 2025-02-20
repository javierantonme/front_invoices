import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import InvoiceTable from "./InvoiceTable.jsx";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/private/invoice");
       
        setInvoices(response.data.invoices.reverse() || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handlePrintPDF = async (invoiceId, customerName) => {

 
    setProcessing(true);
    try {

      const endpoint = customerName === "ProClean Commercial Cleaning"
          ? `/private/invoices/${invoiceId}/print` 
          : `/private/invoices/${invoiceId}/printf2`;  

          const response = await api.get(endpoint, {
            responseType: 'blob',
          });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");

      setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 1000);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      Swal.fire("Error", "Failed to fetch the PDF.", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleSendEmail = async (invoiceId) => {
    setProcessing(true);
    try {
      await api.get(`/private/invoices/sendpdf/${invoiceId}`);
      Swal.fire("Success", "Invoice sent via email successfully!", "success");
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "Failed to send invoice via email.", "error");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {processing && <Spinner />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Invoices</h1>
        <button
          onClick={() => navigate("/invoices/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Invoice
        </button>
      </div>
      <InvoiceTable
        invoices={invoices}
        onPrint={handlePrintPDF}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
};

export default InvoicesPage;
