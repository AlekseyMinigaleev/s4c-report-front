import { useEffect, useState } from "react";
import classes from "./GameStatisticTable.module.css";
import gamePageclasses from "../../GamesPage.module.css";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton";
import useGetGameStatisticByGame, {
  GetGameStatisticByGamePayload,
} from "../../../../hooks/requests/useGetGameStatisticByGame";
import { Sort, SortType } from "../../../../models/Filter";
import TableHeader from "../../../../components/TableHeader";
import { TableHeaderModel } from "../GameTable/GameTable";
import { getNewSort } from "../../../../Utils/FilterUtils";
import { GameStatisticModel } from "../../../../models/GameStatisticModel";

interface GameStatisticTableProps {
  gameId: string;
  classes: string;
}

const GAMES_PER_PAGE = 1;

export default function GameStatisticTable(props: GameStatisticTableProps) {
  const tableHeaders: TableHeaderModel<GameStatisticModel>[] = [
    {
      key: "lastSynchroDate",
      label: "Дата синхронизации",
    },
    {
      key: "evaluation",
      label: "Оценка",
    },
    {
      key: "playersCount",
      label: "Количество игроков",
    },
    {
      key: "cashIncome",
      label: "Прибыль (RUB)",
    },
  ];

  const [sort, setSort] = useState<Sort<GameStatisticModel>>({
    key: "lastSynchroDate",
    sortType: SortType.desc,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gameStatistics, setGameStatistics] = useState<GameStatisticModel[]>(
    []
  );
  const [remainingCount, setRemainingCount] = useState<number>();
  const [payload, setPayload] = useState<GetGameStatisticByGamePayload>({
    GameId: props.gameId,
    paginate: {
      itemsPerPage: GAMES_PER_PAGE,
      pageNumber: currentPage,
    },
    sort: sort,
  });

  const getGameStatisticByGame = useGetGameStatisticByGame();

  useEffect(() => {
    getGameStatisticByGame(payload).then((response) => {
      setGameStatistics(response.gameStatistics);
      setRemainingCount(response.remainingCount);
    });
  }, [props.gameId]);

  async function handleHeaderClick(
    tableHeader: TableHeaderModel<GameStatisticModel>
  ) {
    setIsLoading(true);

    const newSort = getNewSort(tableHeader, sort);
    setSort(newSort);

    setCurrentPage(1);

    const newPayload: GetGameStatisticByGamePayload = {
      paginate: {
        pageNumber: 1,
        itemsPerPage: GAMES_PER_PAGE,
      },
      sort: newSort,
      GameId: props.gameId,
    };

    const response = await getGameStatisticByGame(newPayload);
    setGameStatistics(response.gameStatistics);
    setRemainingCount(response.remainingCount);

    setIsLoading(false);
  }

  async function downloadMoreHandler() {
    setIsLoading(true);

    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);

    const newPayload: GetGameStatisticByGamePayload = {
      paginate: {
        pageNumber: newCurrentPage,
        itemsPerPage: GAMES_PER_PAGE,
      },
      sort: sort,
      GameId: props.gameId,
    };
    const response = await getGameStatisticByGame(newPayload);

    const newGameStatistics: GameStatisticModel[] = [
      ...gameStatistics,
      ...response.gameStatistics,
    ];
    setGameStatistics(newGameStatistics);

    setRemainingCount(response.remainingCount);

    setIsLoading(false);
  }

  return (
    <>
      <div className={classes["container"]}>
        <table className={`${props.classes} ${classes["table"]}`}>
          <TableHeader<GameStatisticModel>
            sort={sort}
            tableHeaders={tableHeaders}
            containerClass={gamePageclasses["header-container"]}
            textClass={gamePageclasses["th-label"]}
            onClick={handleHeaderClick}
          />
          <tbody>
            {gameStatistics.map((gameStatistic, index) => (
              <tr key={index}>
                <td>
                  {gameStatistic.lastSynchroDate &&
                    new Date(
                      gameStatistic.lastSynchroDate
                    ).toLocaleDateString()}
                </td>
                <td>{gameStatistic.evaluation.toLocaleString()}</td>
                <td>{gameStatistic.playersCount.toLocaleString()}</td>
                <td>{gameStatistic.cashIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {remainingCount != 0 ? (
          <div className={classes["download-more"]}>
            <LoadingButton
              classes={classes["download-more-button"]}
              text={"Загрузить еще"}
              onClick={downloadMoreHandler}
              isLoading={isLoading}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
