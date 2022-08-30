import React, { FC } from "react";

interface Props {
  width: number;
  children: any;
}

const Container: FC<Props> = ({ width, children }) => {
  return <div style={{ width: `${width}px`, margin: "0 auto" }}>{children}</div>;
};

export default Container;
