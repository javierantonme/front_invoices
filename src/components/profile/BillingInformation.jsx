import PropTypes from "prop-types";

const BillingInformation = ({ profile, onChange }) => {
    return (
      <div className="mt-6 p-4 border border-gray-300 rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Billing Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Invoice Consecutive Start",
              name: "consecInit",
              type: "number",
              required: true,
            },
            {
              label: "Initial Value",
              name: "initialValue",
              type: "number",
              step: "0.01",
            },
          ].map(({ label, name, ...rest }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                value={profile[name]}
                onChange={onChange}
                className="border rounded px-4 py-2 w-full"
                {...rest}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  BillingInformation.propTypes = {
    profile: PropTypes.shape({
      consecInit: PropTypes.number.isRequired,
      initialValue: PropTypes.number.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  
  export default BillingInformation;
  