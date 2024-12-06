import PropTypes from "prop-types";

const UsersTableContent = ({ users, onUserClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Email
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Phone
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Address
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Status
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Role
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Invoices
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Licence
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td
              className="px-4 py-3 border-b text-blue-600 cursor-pointer hover:underline"
              onClick={() => onUserClick(user.id)}
            >
              {`${user.firstName} ${user.lastName}`}
            </td>
            <td className="px-4 py-3 border-b">{user.email}</td>
            <td className="px-4 py-3 border-b">{user.phone || "N/A"}</td>
            <td className="px-4 py-3 border-b">{user.address || "N/A"}</td>
            <td className="px-4 py-3 border-b">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  user.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.active ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="px-4 py-3 border-b">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-700"
                    : user.role === "special"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </td>
            <td className="px-4 py-3 border-b">
              {user.invoiceCount || "N/A"}
            </td>
            <td className="px-4 py-3 border-b">{user.numberInvoices || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

UsersTableContent.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
      address: PropTypes.string,
      active: PropTypes.bool.isRequired,
      role: PropTypes.string.isRequired,
      invoiceCount: PropTypes.number,
      numberInvoices: PropTypes.number,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
};

export default UsersTableContent;
