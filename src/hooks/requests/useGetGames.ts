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

  async function getGames() {
    const response = await api.get<Game[]>("game/get-games");
    return response.data;
  }

  return getGames;
}
