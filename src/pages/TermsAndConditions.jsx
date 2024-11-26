import TermsEnglish from "./TermsEnglish";
import TermsSpanish from "./TermsSpanish";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 md:flex-row md:items-center md:justify-center gap-6">
      {/* English Section */}
      <TermsEnglish />

      {/* Spanish Section */}
      <TermsSpanish />
    </div>
  );
};

export default TermsAndConditions;
