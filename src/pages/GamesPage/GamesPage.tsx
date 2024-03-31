import classes from "./GamesPage.module.css";
import GameTable from "./widgets/gameTable/GameTable";
import { useEffect, useState } from "react";
import useGetGames, {
  GetGamesResponse,
} from "../../hooks/requests/useGetGames";
import TotalTable from "./widgets/totalTable/TotalTable";
import { sortType } from "models/filter";
import { GAMES_PER_PAGE } from "./constants";
import { MoonLoader } from "react-spinners";
import { useParams } from "react-router-dom";

export default function GamesPage() {
  const [getGamesRepsponse, setGetGamesResponse] = useState<GetGamesResponse>({
    games: [],
    total: {
      cashIncome: undefined,
      count: 0,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getGames = useGetGames();
  const { pageNumber } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGames({
        paginate: {
          itemsPerPage: GAMES_PER_PAGE,
          pageNumber: parseInt(pageNumber || "1", 10),
        },
        sort: {
          key: "rating",
          sortType: sortType.desc,
        },
        includeTotal: true,
      });
      setGetGamesResponse(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes["loader-container"]}>
          <MoonLoader />
        </div>
      ) : (
        <>
          <section>
            <h1 className={classes["h1"]}>Общая статистика</h1>
            <TotalTable
              total={getGamesRepsponse.total}
              classes={classes["table"]}
              borderClasses={classes["border"]}
            />
          </section>
          <section>
            <h1 className={classes["h1"]}>Все игры</h1>
            <GameTable
              games={getGamesRepsponse.games}
              count={getGamesRepsponse.total.count}
              classes={classes["table"]}
              borderClasses={classes["border"]}
            />
          </section>
        </>
      )}
    </>
  );
}
