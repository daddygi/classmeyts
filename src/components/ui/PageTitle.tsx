import React from "react";

interface TitleProps {
  title: string;
}

function PageTitle(props: TitleProps) {
  return <div>{props.title}</div>;
}

export default PageTitle;
