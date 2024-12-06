import PropTypes from 'prop-types';

const CustomerSelection = ({ customers, selectedCustomer, setSelectedCustomer }) => (
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
  );
  CustomerSelection.propTypes = {
    customers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    selectedCustomer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setSelectedCustomer: PropTypes.func.isRequired,
  };
  export default CustomerSelection;
  