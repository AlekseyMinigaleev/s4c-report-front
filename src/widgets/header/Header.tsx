import "../../index.css";
import UserMenu from "./components/UserMenu/UserMenu";
import logo from "../../resources/images/logo.png";
import { useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { useEffect, useState } from "react";
import { developerInfo } from "../../models/developerInfo";
import { routeType } from "models/routeType";

export default function Header() {
  const navigate = useNavigate();
  const [developerInfo, setDeveloperInfo] = useState<developerInfo>({
    developerName: "",
    developerPageUrl: "",
    isAuthorizationTokenSet: false,
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
            navigate(`/${routeType[routeType.games]}`);
          }}
        >
          <img height={75} src={logo} alt="" />
        </div>

        <div className={classes["navigation-container"]}></div>
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
