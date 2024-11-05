import React from "react";

const CardSekeleton = () => {
  return (
    <div className="card-wrapper background-light800_dark300 flex w-full animate-fade flex-col overflow-hidden rounded-xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] transition-all duration-500 animate-duration-[2000ms] animate-infinite animate-ease-linear hover:shadow-lg">
      <div className="h-[250px] w-[400px] bg-gray-300"></div>
      <div className="p-10 pt-3">
        <div className="mb-5 h-6 w-full rounded-lg bg-gray-200"></div>
        <div className="mb-5 h-6 w-full rounded-lg bg-gray-200"></div>
        <div className="mb-5 h-12 w-full rounded-lg bg-gray-200"></div>

        <div className="mt-2 flex flex-row gap-2">
          {[1, 2, 3].map((component) => (
            <div key={component}>
              <div className="h-4 w-[60px] rounded-md bg-slate-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSekeleton;
