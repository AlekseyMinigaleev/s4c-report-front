import useApiPrivate from "../useAuthorizedApi";

export default function useSendVerificationEmail() {
  const apiPrivate = useApiPrivate();

  async function sendVerificationEmail() {
    const response = await apiPrivate.post("Email/SendEmailVerificationCode");

    return response.data;
  }

  return sendVerificationEmail;
}
