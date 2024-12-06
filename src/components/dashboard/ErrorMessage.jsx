import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-center">{message}</p>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
