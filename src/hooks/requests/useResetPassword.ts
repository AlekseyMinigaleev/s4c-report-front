import anonymousApi from "../../api/anonymousApi";

export interface resetPasswordPayload {
  password: string;
  resetPasswordToken: string;
}

export default function useResetPassword() {
  async function resetPassword(payload: resetPasswordPayload): Promise<string> {
    const response = await anonymousApi.post(
      "UserAuthentification/reset-password",
      JSON.stringify(payload)
    );

    if (response.data.TokenHasExpired && response.data.TokenHasExpired.length > 0) {
      // Извлекаем первое сообщение об ошибке из массива
      const errorMessage = response.data.TokenHasExpired[0];
      console.log(errorMessage);
      return errorMessage;
    } else {
      // Возвращаем пустую строку, если сообщение об ошибке отсутствует
      return "";
    }
  }

  return resetPassword;
}
