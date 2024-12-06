import PropTypes from "prop-types";
import StatCard from "./StatCard";

const DashboardStats = ({ data, user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Invoices */}
      <StatCard
        title="Number of Invoices"
        value={data.quantity}
        bgColor="bg-blue-500"
      />

      {/* Fiscal Period Invoices */}
      <StatCard
        title="Total Amount"
        value={`$${data.fiscalPeriodInvoices}`}
        bgColor="bg-green-500"
      />

      {/* Tax Provision */}
      <StatCard
        title="Tax Provision"
        value={`$${data.taxProvision}`}
        bgColor="bg-red-500"
      />

      {/* Count of Users */}
      {user.userLoged.role === "admin" && (
        <StatCard
          title="Users"
          value={data.users}
          bgColor="bg-yellow-500"
          link="/users"
        />
      )}
    </div>
  );
};

DashboardStats.propTypes = {
  data: PropTypes.shape({
    totalInvoices: PropTypes.number.isRequired,
    fiscalPeriodInvoices: PropTypes.number.isRequired,
    taxProvision: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    users: PropTypes.number,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

export default DashboardStats;
