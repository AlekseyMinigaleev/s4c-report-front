import Button from "../Button/Button";
import "../../index.css";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import logo from "../../images/forHeader.png";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <header className={classes["header"]}>
      <div className={classes["header-container"]}>
        <div
          className={classes["logo-section"]}
          onClick={() => {
            navigate("/welcome");
          }}
        >
          <img height={50} src={logo} alt="" />
        </div>

        <div className={classes["navigation-container"]}>
          {/* <div className={classes["navigation-section"]}>
            <Button
              onClick={() => {
                navigate("/welcome");
              }}
              isActive={false}
              className={classes["padding-right"]}
            >
              Главная
            </Button>

            <Button
              onClick={() => {
                navigate("/welcome");
              }}
              isActive={false}
              className={classes["padding-right"]}
            >
              Главная
            </Button>

            <Button
              onClick={() => {
                navigate("/welcome");
              }}
              isActive={false}
            >
              Главная
            </Button>
          </div> */}
        </div>
        <div className={classes["profile-section"]}>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
