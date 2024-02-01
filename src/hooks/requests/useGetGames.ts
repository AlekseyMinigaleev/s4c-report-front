import { Game } from "../../models/GameModel";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGamesResponse {
  games: Game[];
  total: Total;
}

export interface Total {
  playersCount: number;
  cashIncome?: number;
}

export default function useGetGames() {
  const api = useAuthorizedApi();

  async function getGames() {
    const response = await api.get<GetGamesResponse>("game/get-games");
    return response.data;
  }

  return getGames;
}
