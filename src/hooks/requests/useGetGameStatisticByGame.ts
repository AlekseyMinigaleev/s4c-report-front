import { Paginate, Sort } from "../../models/Filter";
import { GameStatisticModel } from "../../models/GameStatisticModel";
import useAuthorizedApi from "../useAuthorizedApi";

export interface GetGameStatisticByGamePayload {
  GameId: string;
  paginate: Paginate;
  sort: Sort<GameStatisticModel>;
}

export interface GetGameStatisticByGameResponse {
  gameStatistics: GameStatisticModel[];
  remainingCount: number;
}

export default function useGetGameStatisticByGame() {
  const api = useAuthorizedApi();
  async function getGameStatisticByGame(
    payload: GetGameStatisticByGamePayload
  ): Promise<GetGameStatisticByGameResponse> {
    const response = await api.get<GetGameStatisticByGameResponse>(
      "game/get-statistic-by-game",
      {
        params: {
          gameId: payload.GameId,
          "Paginate.ItemsPerPage": payload.paginate.itemsPerPage,
          "Paginate.PageNumber": payload.paginate.pageNumber,
          "Sort.FieldName": payload.sort.key,
          "Sort.SortType": payload.sort.sortType,
        },
      }
    );
    return response.data;
  }

  return getGameStatisticByGame;
}
