import React from "react";

interface TitleProps {
  title: string;
  width?: string;
  height?: string;
}

const Card = (props: TitleProps) => {
  const { title, width = "w-[375px]", height = "h-[400px]" } = props;

  return (
    <div className={`bg-white p-8 rounded-xl shadow-2xl ${width} ${height}`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
