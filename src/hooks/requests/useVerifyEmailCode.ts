import useApiPrivate from "../useAuthorizedApi";

export interface verifyEmailCodePayload {
  VerificationCode: string;
}

export interface verifyEmailCodeResponse {
  IsSuccessCode: boolean;
}

export default function useVerifyEmailCode() {
  const apiPrivate = useApiPrivate();

  async function verifyEmailCode(
    code: string
  ): Promise<boolean> {
    const payload: verifyEmailCodePayload = {
      VerificationCode: code,
    };

    const response = await apiPrivate.post(
      "Email/verify-email-verification-code",
      JSON.stringify(payload),
      {
        withCredentials: true,
      }
    );

    return response.data.isSuccessCode;
  }

  return verifyEmailCode;
}
