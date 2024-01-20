import {
  Menu,
  MenuButton,
  MenuDivider as MenuDividerInner,
  MenuItem as MenuItemInner,
  MenuItemProps,
} from "@szhsin/react-menu";
import profileIcon from "../../../images/profile-icon.png";
import classes from "./ProfileMenu.module.css";
import { useNavigate } from "react-router-dom";

const MenuItem = (props: JSX.IntrinsicAttributes & MenuItemProps) => {
  return <MenuItemInner {...props} className={classes["menuitem"]} />;
};

const MenuDivider = (props: JSX.IntrinsicAttributes & MenuItemProps) => {
  return <MenuDividerInner className={classes["menu-divider"]} />;
};

function ProfileSection() {
  return (
    <div onClick={() => {}} className={classes["profile-image-container"]}>
      <img src={profileIcon} width={50} />
    </div>
  );
}

export default function ProfileMenu() {
  const navigate = useNavigate();

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

      <MenuItem children={"Выход"} />
    </Menu>
  );
}
