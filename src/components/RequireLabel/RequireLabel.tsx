
export interface RequireLabelProps{
  text: string;
}

export default function RequireLabel(props:RequireLabelProps) {
  return (
    <p>
       {props.text} <span style={{ color: 'red' }}>*</span>
    </p>
  );
}
