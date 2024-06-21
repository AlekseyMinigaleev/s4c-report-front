import { ReactNode } from "react";
import classes from "./blureContainer.module.css";

interface blureContainerProps {
  isLoading: boolean;
  blurValue: string;
  children: ReactNode;
}

export default function BlureContainer({
  children,
  isLoading,
  blurValue,
}: blureContainerProps) {
  const containerStyle = { filter: `blur(${blurValue})` };

  return (
    <>
      <div
        className={isLoading ? classes["container"] : ""}
        style={isLoading ? containerStyle : {}}
      >
        {children}
      </div>
    </>
  );
}
