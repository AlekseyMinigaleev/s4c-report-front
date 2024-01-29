import { ValueWithProgressModel } from "../../../../models/ValueWithProgress";

interface ValueWithGrowthProps {
  valueWithProgress: ValueWithProgressModel<number>;
  growthClassName?: string;
  reductionClassName?: string;
}

export default function ValueWithProgress(props: ValueWithGrowthProps) {
  return (
    <>
      <p>
        {`${props.valueWithProgress.actualValue}`}
        {props.valueWithProgress.lastProgressValue < 0 ? (
          <span
            className={props.reductionClassName}
          >{` -(${props.valueWithProgress.lastProgressValue})`}</span>
        ) : props.valueWithProgress.lastProgressValue > 0 ? (
          <span
            className={props.growthClassName}
          >{` +(${props.valueWithProgress.lastProgressValue})`}</span>
        ) : null}
      </p>
    </>
  );
}
