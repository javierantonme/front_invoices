import { useState, useEffect } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDate } from "../helpers/dateFunction";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // Estado para mostrar el spinner
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/private/invoice");
        setInvoices(response.data.invoices || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (invoiceId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This invoice will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      setProcessing(true); // Mostrar spinner
      try {
        await api.delete(`private/invoices/${invoiceId}`);
        setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
        Swal.fire("Deleted!", "Your invoice has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting invoice:", error);
        Swal.fire("Error", "Failed to delete invoice.", "error");
      } finally {
        setProcessing(false); // Ocultar spinner
      }
    }
  };

  const handlePrintPDF = async (invoiceId) => {
    setProcessing(true); // Mostrar spinner
    try {
      const response = await api.get(`/private/invoices/${invoiceId}/print`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");

      setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 1000);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      Swal.fire("Error", "Failed to fetch the PDF.", "error");
    } finally {
      setProcessing(false); // Ocultar spinner
    }
  };

  const handleSendEmail = async (invoiceId) => {
    setProcessing(true); // Mostrar spinner
    try {
      await api.get(`/private/invoices/sendpdf/${invoiceId}`);
      Swal.fire("Success", "Invoice sent via email successfully!", "success");
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "Failed to send invoice via email.", "error");
    } finally {
      setProcessing(false); // Ocultar spinner
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {processing && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Invoices</h1>
        <button
          onClick={() => navigate("/invoices/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Invoice
        </button>
      </div>

      <div className="overflow-x-auto">
        {invoices.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No Invoices found. Click Add New Invoice to create one.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Invoice #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Customer
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {invoice.consecutive}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(invoice.dateInvoice)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {invoice.customer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${Number(invoice.totalInvoice || 0).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handlePrintPDF(invoice.id)}
                      className="mx-2"
                      title="Print PDF"
                    >
                      🖨️
                    </button>
                    <button
                      onClick={() => handleSendEmail(invoice.id)}
                      className="mx-2"
                      title="Send Email"
                    >
                      ✉️
                    </button>
                    <button
                      onClick={() => handleDelete(invoice.id)}
                      className="mx-2 text-red-500"
                      title="Delete Invoice"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
