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
        {props.valueWithProgress.lastProgressValue < 0 ? (
          <span
            className={props.reductionClassName}
          >{` -(${props.valueWithProgress.lastProgressValue.toLocaleString()})`}</span>
        ) : props.valueWithProgress.lastProgressValue > 0 ? (
          <span
            className={props.growthClassName}
          >{` +(${props.valueWithProgress.lastProgressValue.toLocaleString()})`}</span>
        ) : null}
      </p>
    </>
  );
}
