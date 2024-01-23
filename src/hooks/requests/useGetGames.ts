import { Paginate } from "../../models/Paginate";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGamesResponse {
  games: Game[];
  totalGamesCount: number;
}

export interface Game {
  name: string;
  playersCount: number;
  evaluation: number;
  publicationDate: Date;
  totalCashIncome: number;
  dailyCashIncome: number;
}

export default function useGetGames() {
  const api = useAuthorizedApi();

  async function getGames(queryParams: Paginate) {
    const params = `?Paginate.ItemsPerPage=${queryParams.itemsPerPage}&Paginate.Page=${queryParams.page}`;
    const response = await api.get<GetGamesResponse>("Game/GetGames" + params);
    return response.data;
  }

  return getGames;
}
