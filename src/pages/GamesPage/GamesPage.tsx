import classes from "./GamesPage.module.css";
import GameTable from "./components/GameTable/GameTable";
import { useEffect, useState } from "react";
import useGetGames, {
  GetGamesResponse,
} from "../../hooks/requests/useGetGames";
import TotalTable from "./components/TotalTable/TotalTable";

export default function GamesPage() {
  const [response, setResponse] = useState<GetGamesResponse>({
    games: [],
    total:{
      playersCount: 0,
      cashIncome: undefined
    }
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
        <div style={{width:"100%", height:"100%"}}>
          <section>
            <h1 className={classes["h1"]}>Все игры</h1>
            <GameTable games={response.games} total={response.total} classes={classes["table"]} />
          </section>

          <section>
            <TotalTable total={response.total} classes={classes["table"]} />
          </section>
        </div>

      )}
    </>
  );
}
