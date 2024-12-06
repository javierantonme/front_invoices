import PropTypes from "prop-types";

const PersonalInformation = ({ profile, onChange }) => {
    return (
      <div className="p-4 border border-gray-300 rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            {
              label: "Email (cannot be changed)",
              name: "email",
              type: "email",
              readOnly: true,
              className: "bg-gray-200 cursor-not-allowed",
            },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
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
                className={`border rounded px-4 py-2 w-full ${rest.className || ""}`}
                {...rest}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  PersonalInformation.propTypes = {
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
      address: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  export default PersonalInformation;
  