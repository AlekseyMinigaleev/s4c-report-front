import { ReactNode } from "react";
import BlureContainer from "widgets/blureContainer/BlureContainer";

export interface ConfidentioalContainerProps {
  children: ReactNode;
}

export default function ConfidentioalContainer(
  props: ConfidentioalContainerProps
) {
  const isConfidentioalModeOn =
    localStorage.getItem("isConfidentialModeOn") === "true";
  return (
    <div style={{ userSelect: isConfidentioalModeOn ? "none" : "auto" }}>
      <BlureContainer isLoading={isConfidentioalModeOn} blurValue={"4px"}>
        {props.children}
      </BlureContainer>
    </div>
  );
}
