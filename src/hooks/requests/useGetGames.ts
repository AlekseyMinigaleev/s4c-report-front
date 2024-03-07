import { Paginate, Sort } from "models/filter";
import { Game } from "../../models/gameModel";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGamesResponse {
  games: Game[];
  total: Total;
}

export interface GetGamesPayload {
  paginate: Paginate;
  sort: Sort<Game>;
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
