import PropTypes from "prop-types";

const BankingInformation = ({ profile, onChange }) => {
    return (
      <div className="p-4 border border-gray-300 rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Banking Information
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "ABN", name: "abn", type: "text" },
            { label: "BSB", name: "bsb", type: "text" },
            { label: "Account Number", name: "accountNumber", type: "number" },
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
  
  BankingInformation.propTypes = {
    profile: PropTypes.shape({
      abn: PropTypes.string,
      bsb: PropTypes.string,
      accountNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  export default BankingInformation;
  