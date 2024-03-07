import { ValueWithProgressModel } from "../../../../models/valueWithProgress";

interface ValueWithGrowthProps {
  valueWithProgress: ValueWithProgressModel;
  growthClassName?: string;
  reductionClassName?: string;
}

export default function ValueWithProgress(props: ValueWithGrowthProps) {
  return (
    <>
      <p>
        {`${props.valueWithProgress.actualValue.toLocaleString()}`}
        {props.valueWithProgress.progressValue < 0 ? (
          <span
            className={props.reductionClassName}
          >{` -(${props.valueWithProgress.progressValue.toLocaleString()})`}</span>
        ) : props.valueWithProgress.progressValue > 0 ? (
          <span
            className={props.growthClassName}
          >{` +(${props.valueWithProgress.progressValue.toLocaleString()})`}</span>
        ) : null}
      </p>
    </>
  );
}
