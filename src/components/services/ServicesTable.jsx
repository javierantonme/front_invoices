import PropTypes from "prop-types";

const ServicesTable = ({ services, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {services.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No services found. Click Add New Service to create one.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Code</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Name</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100 transition-colors">
                <td className="border border-gray-300 px-4 py-2">{service.code}</td>
                <td className="border border-gray-300 px-4 py-2">{service.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 w-full">
                    <button
                      className="bg-blue-500 text-white w-full md:w-auto px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => onEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white w-full md:w-auto px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => onDelete(service.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

ServicesTable.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ServicesTable;
