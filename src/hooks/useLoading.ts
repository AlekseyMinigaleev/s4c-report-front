import { useState } from "react";

//TODO: я не понмиа как сделать перегрузку для случая когда нет payload у request
interface LoadingHook<TPayload, TResponse> {
  isLoading: boolean;
  executeRequest: (payload: TPayload) => Promise<TResponse>;
}

export default function useLoading<TPayload, TResponse>(
  useRequest: () => (payload: TPayload) => Promise<TResponse>
): LoadingHook<TPayload, TResponse> {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = useRequest();

  const executeRequest = async (payload: TPayload): Promise<TResponse> => {
    setIsLoading(true);
    const response = await request(payload as TPayload);
    setIsLoading(false);
    return response;
  };

  return { isLoading, executeRequest };
}
