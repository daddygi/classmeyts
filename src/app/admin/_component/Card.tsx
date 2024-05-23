import React from "react";

interface TitleProps {
  title: string;
  width?: string;
  height?: string;
  data: Record<string, any>
}

const Card: React.FC<TitleProps> = ({ title, width = "w-[405px]", height = "h-[420px]", data }) => {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-2xl ${width} ${height}`}>
      <div className="flex flex-col justify-between items-center h-full">
        <div className="flex gap-1 items-center mb-4">
          <p>{title}</p>
        </div>
        <div className="grid grid-flow-row auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full h-full">
          {Object.entries(data).map(([key, value]) => (
            <p className="text-xm" key={key}>{`${value}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
