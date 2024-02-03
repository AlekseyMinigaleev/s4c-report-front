import {
  Menu,
  MenuButton,
  MenuDivider as MenuDividerInner,
  MenuItem as MenuItemInner,
  MenuItemProps,
} from "@szhsin/react-menu";
import menuBarLogo from "../../../images/menu-bar.png";
import classes from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/requests/useLogout";
import useAuthentification from "../../../hooks/useAuthContext";

const MenuItem = (props: JSX.IntrinsicAttributes & MenuItemProps) => {
  return <MenuItemInner {...props} className={classes["menuitem"]} />;
};

const MenuDivider = (props: JSX.IntrinsicAttributes & MenuItemProps) => {
  return <MenuDividerInner className={classes["menu-divider"]} />;
};

function ProfileSection() {
  return (
    <div onClick={() => {}} className={classes["profile-image-container"]}>
      <img src={menuBarLogo} width={50} />
    </div>
  );
}

export default function UserMenu() {
  const navigate = useNavigate();
  const logout = useLogout();
  const authContext = useAuthentification();

  return (
    <Menu
      menuClassName={classes["menu"]}
      gap={4}
      align={"end"}
      menuButton={
        <MenuButton className={classes["menu-button"]}>
          <ProfileSection />
        </MenuButton>
      }
    >
      <MenuItem
        onClick={() => {
          navigate("/user");
        }}
        children={"Настройки"}
      />

      <MenuDivider />

      <MenuItem
        onClick={async () => {
          await logout();
          authContext.setAuth(undefined);
          navigate("/auth");
        }}
        children={"Выход"}
      />
    </Menu>
  );
}
