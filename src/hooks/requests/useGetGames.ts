import { Sort } from "../../models/Filter";
import { ValueWithProgressModel } from "../../models/ValueWithProgress";
import useAuthorizedApi from "../useAuthorizedApi";

export interface Game {
  name: string;
  evaluation: number;
  publicationDate: Date;
  playersCountWithProgress?: ValueWithProgressModel<number>;
  cashIncomeWithProgress?: ValueWithProgressModel<number>;
}

export default function useGetGames() {
  const api = useAuthorizedApi();

  async function getGames(sort: Sort) {
    const params = {
      "Sort.FieldName": sort.fieldName,
      "Sort.SortType": sort.sortType,
    };
    const response = await api.get<Game[]>("game/get-games", {
      params,
    });
    return response.data;
  }

  return getGames;
}
