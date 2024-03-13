import useAuthorizedApi from "../useAuthorizedApi";

export interface getGameByIdResponse {
  name: string;
  url: string;
  previewURL: string;
  categories: string[];
}

export default function useGetGames() {
  const api = useAuthorizedApi();

  async function getGameById(id: string): Promise<getGameByIdResponse> {
    const response = await api.get<getGameByIdResponse>(`game/get-game/${id}`);
    return response.data;
  }

  return getGameById;
}
