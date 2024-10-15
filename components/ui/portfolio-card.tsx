import React from "react";

interface Props {
  href: string;
  src: string;
  title: string;
  subtitle: string;
}

const PortfolioCard = ({ href, src, title, subtitle }: Props) => {
  return (
    <div
      className="group relative  h-[350px] w-full cursor-pointer rounded-xl bg-cover bg-center shadow-2xl transition-transform duration-500"
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/0 transition-opacity duration-300 group-hover:bg-black/50"></div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <h2 className="text-2xl font-bold">Card Title</h2>
          <p className="mt-2">
            This is a description of the card. It provides additional details
            about the content inside the card.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
