import { paginate, sort } from "models/filter";
import { game } from "../../models/gameModel";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGamesResponse {
  games: game[];
  total: Total;
}

export interface GetGamesPayload {
  paginate: paginate;
  sort: sort<game>;
  includeTotal: boolean,
}

export interface Total {
  cashIncome?: number;
  count: number;
}

export default function useGetGames() {
  const api = useAuthorizedApi();

  async function getGames(payload: GetGamesPayload): Promise<GetGamesResponse> {
    const response = await api.get<GetGamesResponse>("game/get-games", {
      params: {
        "Paginate.ItemsPerPage": payload.paginate.itemsPerPage,
        "Paginate.PageNumber": payload.paginate.pageNumber,
        "Sort.FieldName": payload.sort.key,
        "Sort.SortType": payload.sort.sortType,
        "IncludeTotal": payload.includeTotal
      },
    });
    return response.data;
  }

  return getGames;
}
