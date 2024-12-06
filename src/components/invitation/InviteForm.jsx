import PropTypes from "prop-types";

const InviteForm = ({ email, setEmail, onSubmit }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Invite a New User</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Enter the email address of the person you would like to invite.
      </p>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Send Invitation
        </button>
      </form>
    </div>
  );
};

InviteForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InviteForm;
