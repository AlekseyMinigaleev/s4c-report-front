import Button from "../../components/button/Button";
import "../../index.css";
import UserMenu from "./components/UserMenu/UserMenu";
import logo from "../../resources/images/logo.png";
import { useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { useEffect, useState } from "react";
import { developerInfo } from "../../models/developerInfo";

export default function Header() {
  const navigate = useNavigate();
  const [developerInfo, setDeveloperInfo] = useState<developerInfo>({
    developerName: "",
    developerPageUrl: "",
  });

  useEffect(() => {
    const developerInfoString = localStorage.getItem("developerInfo");
    const developerInfo: developerInfo = JSON.parse(developerInfoString!);
    setDeveloperInfo(developerInfo);
  }, []);

  return (
    <header className={classes["header"]}>
      <div className={classes["header-container"]}>
        <div
          className={classes["logo-section"]}
          onClick={() => {
            navigate("/welcome");
          }}
        >
          <img height={75} src={logo} alt="" />
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
        <div className={classes["user-settings-section"]}>
          <a
            className={classes["developer-name"]}
            href={developerInfo.developerPageUrl}
          >
            {developerInfo.developerName}
          </a>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
