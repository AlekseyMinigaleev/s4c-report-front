import { paginate, sort } from "../../models/Filter";
import { gameStatisticModel } from "../../models/GameStatisticModel";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGameStatisticByGamePayload {
  GameId: string;
  paginate: paginate;
  sort: sort<gameStatisticModel>;
}

export interface GetGameStatisticByGameResponse {
  gameStatistics: gameStatisticModel[];
  remainingCount: number;
}

export default function useGetGameStatisticById() {
  const api = useAuthorizedApi();
  async function getGameStatisticByGame(
    payload: GetGameStatisticByGamePayload
  ): Promise<GetGameStatisticByGameResponse> {

    let sort = payload.sort.key as string; 
    if(payload.sort.key == "rating" || payload.sort.key =="cashIncome"){
      sort = payload.sort.key +".actualValue";
    }

    const response = await api.get<GetGameStatisticByGameResponse>(
      "GameStatistic/get-statistic-by-game",
      {
        params: {
          gameId: payload.GameId,
          "Paginate.ItemsPerPage": payload.paginate.itemsPerPage,
          "Paginate.PageNumber": payload.paginate.pageNumber,
          "Sort.FieldName": sort, 
          "Sort.SortType": payload.sort.sortType,
        },
      }
    );
    return response.data;
  }

  return getGameStatisticByGame;
}
