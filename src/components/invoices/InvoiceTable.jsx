import PropTypes from "prop-types";
import { formatDate } from "../../helpers/dateFunction";

const InvoiceTable = ({ invoices, onPrint, onSendEmail }) => {
  return (
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
                    onClick={() => onPrint(invoice.id, invoice.customer.name)}
                    className="mx-2"
                    title="Print PDF"
                  >
                    🖨️
                  </button>
                  <button
                    onClick={() => onSendEmail(invoice.id)}
                    className="mx-2"
                    title="Send Email"
                  >
                    ✉️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

InvoiceTable.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      consecutive: PropTypes.number.isRequired,
      dateInvoice: PropTypes.string.isRequired,
      customer: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      totalInvoice: PropTypes.number,
    })
  ).isRequired,
  onPrint: PropTypes.func.isRequired,
  onSendEmail: PropTypes.func.isRequired,
};

export default InvoiceTable;
