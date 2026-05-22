import React from "react";
type QuotesCardProps = {
  icon: React.ReactNode;
  quote: string;
};
const QuotesCard = ({ icon, quote }: QuotesCardProps) => {
  return (
    <>
      <div className="quotes-card">
        <div className="quotes-card-icon">{icon}</div>
        <p className="quotes-card-text">{quote}</p>
      </div>
    </>
  );
};

export default QuotesCard;
