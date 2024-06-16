import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import classes from "./EmailVerificationForm.module.css";
import Button from "components/Button/Button";
import useSendVerificationEmail from "hooks/requests/useSendVerificationEmail";
import useVerifyEmailCode from "hooks/requests/useVerifyEmailCode";
import { useNavigate, useParams } from "react-router-dom";
import { routeType } from "models/routeType";
import AuthPageContainer from "pages/authPages/components/AuthPageContainer/AuthPageContainer";
import ErrorMessage from "components/errorMessaage/ErrorMessage";
import { convertCompilerOptionsFromJson } from "typescript";

const EmailVerificationForm: React.FC = () => {
  const { email } = useParams();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeLoading, setIsVerificationCodeLoading] =
    useState(false);
  const [
    isSendVerificationEmailCodeLoading,
    setIsSendVerificationEmailCodeLoading,
  ] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const sendVerificationEmail = useSendVerificationEmail();
  const verifyCode = useVerifyEmailCode();

  const navigate = useNavigate();

  const handleSendVerificationEmail = async () => {
    setIsSendVerificationEmailCodeLoading(true);
    await sendVerificationEmail();
    setIsSendVerificationEmailCodeLoading(false);
  };

  function validateVerificationCode(code: string) {
    return /^\d{6}$/.test(code);
  }

  const handleVerifyCode = async () => {
    setIsVerificationCodeLoading(true);

    const isValid = await verifyCode(verificationCode);
    console.log(isValid);

    if (isValid) {
      navigate(`/${routeType[routeType.games]}`);
      alert("Аккаунт успешно создан");
    } else {
      setIsValidInput(false);
      setErrorMessage(
        "Код подтверждения недействителен. Пожалуйста, введите корректный 6-значный код, либо запросите новый код для подтверждения."
      );
    }
    setIsVerificationCodeLoading(false);
  };

  const inputClasses = `${classes["input-field"]} ${
    !isValidInput ? `${classes["invalid"]}` : ""
  }`;

  return (
    <>
      <AuthPageContainer>
        <div className={classes["width"]}>
          <h1>Подтверждение адреса электронной почты</h1>
          <p className={classes["description"]}>
            На адрес электронной почты <b>{email}</b>, был выслан 6-ти значный
            код. Скопируйте его в поле ниже
          </p>
          <div>
            <div className={classes["input-sent-container"]}>
              <input
                className={inputClasses}
                type="text"
                placeholder="Код подтверждения"
                value={verificationCode}
                onChange={(e) => {
                  const input = e.target.value;
                  // Оставляем только цифры от 0 до 9
                  const formattedInput = input.replace(/\D/g, "");
                  // Обрезаем до 6 символов
                  const truncatedInput = formattedInput.slice(0, 6);
                  setVerificationCode(truncatedInput);
                  if (validateVerificationCode(truncatedInput)) {
                    setIsValidInput(true);
                  } else {
                    setIsValidInput(false);
                  }
                }}
                maxLength={6}
              />
              <Button
                onClick={handleSendVerificationEmail}
                disabled={isSendVerificationEmailCodeLoading}
                className={classes.section}
                isActive={true}
              >
                {isSendVerificationEmailCodeLoading ? (
                  <BarLoader color="white" />
                ) : (
                  "Отправить код повторно"
                )}
              </Button>
            </div>

            {errorMessage && (
              <div className={classes["error-message"]}>{errorMessage}</div>
            )}

            <div className={classes["center"]}>
              <Button
                onClick={handleVerifyCode}
                disabled={!validateVerificationCode(verificationCode)}
                className={classes.section}
                isActive={validateVerificationCode(verificationCode)}
              >
                {isVerificationCodeLoading ? (
                  <BarLoader color="white" />
                ) : (
                  "Готово"
                )}
              </Button>
            </div>
          </div>
        </div>
      </AuthPageContainer>
    </>
  );
};

export default EmailVerificationForm;
