import showIcon from "../../../resources/images/show.png";
import hideIcon from "../../../resources/images/hide.png";
import editIcon from "../../../resources/images/edit.png";

export interface showHideEditButtonsProps {
  isShow: boolean;
  buttonsContainerClass?: string;
  editButtonOnClick: () => void;
  showHideButtonOnClick: () => void;
}

export default function ShowHideEditButtons(props: showHideEditButtonsProps) {
  return (
    <>
      <div className={props.buttonsContainerClass}>
        {props.isShow ? (
          <div>
            <button onClick={props.showHideButtonOnClick}>
              <img src={hideIcon} />
            </button>
          </div>
        ) : (
          <div>
            <button onClick={props.showHideButtonOnClick}>
              <img src={showIcon} />
            </button>
          </div>
        )}
        <div>
          <button onClick={props.editButtonOnClick}>
            <img src={editIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
