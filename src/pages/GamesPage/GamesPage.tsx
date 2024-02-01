import classes from "./GamesPage.module.css";
import GameTable from "./components/GameTable/GameTable";
import { useEffect, useState } from "react";
import { Game } from "../../models/GameModel";
import useGetGames, { Total } from "../../hooks/requests/useGetGames";

export default function GamesPage() {
  
  const [total, setTotal] = useState<Total>({
    cashIncome: undefined,
    playersCount:0,
  })

  const [games, setGames] = useState<Game[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useGetGames();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGames();
      setGames(response.games);
      setTotal(response.total);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <h1 className={classes["h1"]}>Общая статистика</h1>
        <table className={classes["table"]}>
          <thead>
            <tr>
              <th>Количество игроков:</th>
              <td>{total.playersCount.toLocaleString()}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Прибыль (RUB):</th>
              <td>{total.cashIncome ? total.cashIncome.toLocaleString() : "-"}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h1 className={classes["h1"]}>Все игры</h1>
        {isLoading ? <p>Загрузка...</p> : <GameTable games={games} />}
      </section>
    </>
  );
}
