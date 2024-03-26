import useAuthorizedApi from "../useAuthorizedApi";

export interface setPageIdResponse {
  gameId: string;
  pageId: number;
  isSuccessfullySet: boolean;
}

export interface setPageIdBody {
  gameId: string;
  pageId?: number;
}

export interface setPageIdPayload {
  body: setPageIdBody[];
}

export default function useSetPageId() {
  const api = useAuthorizedApi();

  async function setPageId(body: setPageIdBody): Promise<setPageIdResponse[]> {
    const payload: setPageIdPayload = {
      body: [body],
    };

    const response = await api.put<setPageIdResponse[]>(
      `game/set-pageId`,
      payload
    );
    return response.data;
  }

  return setPageId;
}
