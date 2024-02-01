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
      <table>
        <tbody>
          <tr>
            <td className={classes["logo-section"]}>
              <img height={50} src={logo} alt="" />
            </td>
            <td className={classes["navigation-section"]}>
              <Button
                onClick={() => {
                  navigate("/welcome");
                }}
                isActive={false}
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
              <Button
                onClick={() => {
                  navigate("/welcome");
                }}
                isActive={false}
              >
                Главная
              </Button>
            </td>
            <td className={classes["profile-section"]}>
              <ProfileMenu />
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}
