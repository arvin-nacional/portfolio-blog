import React from "react";

const CardSekeleton = () => {
  return (
    <div className="card-wrapper background-light800_dark300 flex w-full flex-col overflow-hidden rounded-xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] transition-all duration-500 hover:shadow-lg bacground-white animate-fade animate-infinite animate-duration-[2000ms] animate-ease-linear">
      <div className="h-[250px] w-[400px] bg-gray-300"></div>
      <div className="p-10 pt-3">
        <div className="h-6 w-full bg-gray-200 mb-5 rounded-lg"></div>
        <div className="h-6 w-full bg-gray-200 mb-5 rounded-lg"></div>
        <div className="h-12 w-full bg-gray-200 mb-5 rounded-lg"></div>

        <div className="mt-2 flex flex-row gap-2">
          {[1, 2, 3].map((component) => (
            <div key={component}>
              <div className="w-[60px] h-4 bg-slate-400 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSekeleton;
