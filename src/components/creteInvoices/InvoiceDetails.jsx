import PropTypes from 'prop-types';

const InvoiceDetails = ({ 
    services, 
    invoiceDetails, 
    handleServiceChange, 
    handleAddService, 
    handleRemoveService 
  }) => (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Step 2: Add Services</h2>
      {invoiceDetails.map((detail, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4 border-b pb-2">
          <div className="flex-1">
            <label htmlFor={`serviceId-${index}`} className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              id={`serviceId-${index}`}
              value={detail.serviceId}
              onChange={(e) => handleServiceChange(index, "serviceId", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              id={`quantity-${index}`}
              type="number"
              value={detail.quantity}
              onChange={(e) => handleServiceChange(index, "quantity", e.target.value)}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor={`unitPrice-${index}`} className="block text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <input
              id={`unitPrice-${index}`}
              type="number"
              value={detail.unitPrice}
              onChange={(e) => handleServiceChange(index, "unitPrice", e.target.value)}
              className="w-28 p-2 border border-gray-300 rounded"
            />
          </div>
          <button onClick={() => handleRemoveService(index)} className="text-red-500 hover:text-red-700">
            🗑
          </button>
        </div>
      ))}
      <button onClick={handleAddService} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Service
      </button>
    </div>
  );
  InvoiceDetails.propTypes = {
    services: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    invoiceDetails: PropTypes.arrayOf(
      PropTypes.shape({
        serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        quantity: PropTypes.number,
        unitPrice: PropTypes.number,
      })
    ).isRequired,
    handleServiceChange: PropTypes.func.isRequired,
    handleAddService: PropTypes.func.isRequired,
    handleRemoveService: PropTypes.func.isRequired,
  };
  export default InvoiceDetails;
  