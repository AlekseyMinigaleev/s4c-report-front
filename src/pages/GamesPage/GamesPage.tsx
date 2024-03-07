import classes from "./gamesPage.module.css";
import GameTable from "./widgets/gameTable/GameTable";
import { useEffect, useState } from "react";
import useGetGames, {
  GetGamesResponse,
} from "../../hooks/requests/useGetGames";
import TotalTable from "./components/totalTable/TotalTable";
import { SortType } from "models/filter";

export default function GamesPage() {
  const [response, setResponse] = useState<GetGamesResponse>({
    games: [],
    total: {
      cashIncome: undefined,
      count: 0,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useGetGames();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGames({
        paginate: {
          itemsPerPage: 10,
          pageNumber: 1,
        },
        sort: {
          key: "rating",
          sortType: SortType.desc,
        },
        includeTotal: true
      });
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
              count={response.total.count}
              classes={classes["table"]}
            />
          </section>
        </>
      )}
    </>
  );
}
