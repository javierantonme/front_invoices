import PropTypes from "prop-types";

const InvoiceSummary = ({
  total,
  comments,
  setComments,
  handleSaveInvoice,
}) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-semibold mb-2">Additional Comments</h2>
    <textarea
      value={comments}
      onChange={(e) => setComments(e.target.value)}
      placeholder="Enter any comments for this invoice..."
      className="w-full p-2 border border-gray-300 rounded mb-4"
      rows="3"
    ></textarea>
    <h2 className="text-lg font-semibold mb-2">Invoice Total</h2>
    <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
    <button
      onClick={handleSaveInvoice}
      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
    >
      Save Invoice
    </button>
  </div>
);
InvoiceSummary.propTypes = {
  total: PropTypes.number.isRequired,
  comments: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired, // Validación para el total de la factura (debe ser un número)
  handleSaveInvoice: PropTypes.func.isRequired, // Validación para la función de guardar
};
export default InvoiceSummary;
