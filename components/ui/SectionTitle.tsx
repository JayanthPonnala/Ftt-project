import React from "react";

interface SectionTitleProps {
  id?: string;
  whiteText: string;
  goldText: string;
  whiteTextPost?: string;
  className?: string;
  as?: "h2" | "h3";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  id,
  whiteText,
  goldText,
  whiteTextPost,
  className = "",
  as: Component = "h2",
}) => {
  return (
    <Component
      id={id}
      className={`font-heading uppercase tracking-[0.5px] text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-[0.98] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <span className="block text-white">{whiteText}</span>
      <span className="block text-gold-gradient">
        {goldText}
        {whiteTextPost && <span className="text-white ml-2">{whiteTextPost}</span>}
      </span>
    </Component>
  );
};

export default SectionTitle;
