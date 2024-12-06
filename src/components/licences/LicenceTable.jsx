import PropTypes from "prop-types";

const LicenceTable = ({ licences, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left">Code</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Invoices</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licences.map((licence) => (
            <tr key={licence.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 border-b">{licence.code}</td>
              <td className="px-4 py-3 border-b">{licence.name}</td>
              <td className="px-4 py-3 border-b">{licence.numberInvoices}</td>
              <td className="px-4 py-3 border-b">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    licence.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {licence.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3 border-b">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(licence)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LicenceTable.propTypes = {
  licences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      numberInvoices: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default LicenceTable;
