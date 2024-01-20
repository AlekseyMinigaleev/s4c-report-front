import React from "react";
import classes from "./Header.module.css";
import Button from "../Button/Button";
import profileIcon from "../../images/profile-icon.png";

export default function Footer() {
  return (
    <>
      <header>
        <table>
          <tr>
            <td>
              <Button onClick={() => {}} isActive={false}>
                Главная
              </Button>
            </td>
            <td>
              <div className={classes["profile-image-container"]}>
                <img
                  onClick={() => console.log("jopa")}
                  src={profileIcon}
                  width={50}
                />
              </div>
            </td>
          </tr>
        </table>
      </header>
    </>
  );
}
