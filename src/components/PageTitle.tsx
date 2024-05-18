import React from "react";

interface TitleProps {
  title: string;
}

function PageTitle(props: TitleProps) {
  return <h1 className="font-bold text-3xl">{props.title}</h1>;
}

export default PageTitle;
