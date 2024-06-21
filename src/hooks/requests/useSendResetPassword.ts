import anonymousApi from "api/anonymousApi";

export default function useSendResetPassword() {
  async function sendResetPassword(email: string): Promise<boolean> {
    const payload = {
      Email: email,
    };

    const response = await anonymousApi.post(
      "Email/send-reset-password-link",
      JSON.stringify(payload)
    );

    return response.status == 200;
  }

  return sendResetPassword;
}
