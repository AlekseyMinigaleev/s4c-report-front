import { valueWithProgressModel } from "../../../models/ValueWithProgress";

interface ValueWithGrowthProps {
  valueWithProgress: valueWithProgressModel;
  progressClassName?: string;
  regressClassName?: string;
}

export default function ValueWithProgress(props: ValueWithGrowthProps) {
  return (
    <>
      <p>
        {`${props.valueWithProgress.actualValue.toLocaleString()}`}
        {props.valueWithProgress.progressValue < 0 ? (
          <span
            className={props.regressClassName}
          >{` (${props.valueWithProgress.progressValue.toLocaleString()})`}</span>
        ) : props.valueWithProgress.progressValue > 0 ? (
          <span
            className={props.progressClassName}
          >{` (+${props.valueWithProgress.progressValue.toLocaleString()})`}</span>
        ) : null}
      </p>
    </>
  );
}
