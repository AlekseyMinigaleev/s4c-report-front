import classes from "./gamesPage.module.css";
import GameTable from "./components/gameTable/GameTable";
import { useEffect, useState } from "react";
import useGetGames, {
  GetGamesResponse,
} from "../../hooks/requests/useGetGames";
import TotalTable from "./components/totalTable/TotalTable";

export default function GamesPage() {
  const [response, setResponse] = useState<GetGamesResponse>({
    games: [],
    total: {
      playersCount: 0,
      cashIncome: undefined,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useGetGames();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGames();
      setResponse(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <section className={classes["section"]}>
            <h1 className={classes["h1"]}>Общая статистика</h1>
            <TotalTable total={response.total} classes={classes["table"]} />
          </section>
          <section>
            <h1 className={classes["h1"]}>Все игры</h1>
            <GameTable
              games={response.games}
              total={response.total}
              classes={classes["table"]}
            />
          </section>
        </>
      )}
    </>
  );
}
