import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, bgColor, link }) => {
  const content = (
    <div className="text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div
      className={`${bgColor} text-white rounded-lg shadow-md flex items-center justify-center h-40`}
    >
      {link ? <Link to={link}>{content}</Link> : content}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default StatCard;
