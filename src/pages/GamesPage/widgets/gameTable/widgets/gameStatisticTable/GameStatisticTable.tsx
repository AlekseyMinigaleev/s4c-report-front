import { useEffect, useState } from "react";
import classes from "./gameStatisticTable.module.css";
import gamePageclasses from "../../../../gamesPage.module.css";
import LoadingButton from "../../../../../../components/loadingButton/LoadingButton";
import useGetGameStatisticByGame, {
  GetGameStatisticByGamePayload,
} from "../../../../../../hooks/requests/useGetGameStatisticByGame";
import { Sort, SortType } from "../../../../../../models/filter";
import TableHeader from "../../../../../../widgets/TableHeader";
import { TableHeaderModel } from "../../GameTable";
import { getNewSort } from "../../../../../../utils/FilterUtils";
import { GameStatisticModel } from "../../../../../../models/gameStatisticModel";

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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [payload, setPayload] = useState<GetGameStatisticByGamePayload>({
    GameId: props.gameId,
    paginate: {
      itemsPerPage: GAMES_PER_PAGE,
      pageNumber: 1,
    },
    sort: {
      key: "lastSynchroDate",
      sortType: SortType.desc,
    },
  });
  const [gameStatistics, setGameStatistics] = useState<GameStatisticModel[]>(
    []
  );
  const [remainingCount, setRemainingCount] = useState<number>();

  const getGameStatisticByGame = useGetGameStatisticByGame();

  useEffect(() => {
    //используется просто как флаг, чтобы не выполнялся запрос 2 раза. Можно спокойно заменить на любой другой флаг
    if (!isLoading) {
      setPayload((prev) => ({
        ...prev,
        GameId: props.gameId,
        paginate: {
          ...prev.paginate,
          pageNumber: 1,
        },
      }));
    }
  }, [props.gameId]);

  useEffect(() => {
    getGameStatisticByGame(payload).then((response) => {
      setGameStatisticsHandler(response.gameStatistics);
      setRemainingCount(response.remainingCount);
      setIsLoading(false);
    });
  }, [payload]);

  function setGameStatisticsHandler(gameStatistics: GameStatisticModel[]) {
    if (payload.paginate.pageNumber > 1) {
      setGameStatistics((prev) => [...prev, ...gameStatistics]);
    } else {
      setGameStatistics(gameStatistics);
    }
  }

  function changeSort(sort: Sort<GameStatisticModel>) {
    setIsLoading(true);

    setPayload((prev) => ({
      ...prev,
      GameId: props.gameId,
      paginate: {
        ...prev.paginate,
        pageNumber: 1,
      },
      sort: sort,
    }));
  }

  function changePageNumber(pageNumber: number) {
    setIsLoading(true);

    setPayload((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        pageNumber: pageNumber,
      },
    }));
  }

  async function handleHeaderClick(
    tableHeader: TableHeaderModel<GameStatisticModel>
  ) {
    const newSort = getNewSort(tableHeader, payload.sort);
    changeSort(newSort);
  }

  async function downloadMoreHandler() {
    changePageNumber(payload.paginate.pageNumber + 1);
  }

  return (
    <>
      <div className={classes["container"]}>
        <table className={`${props.classes} ${classes["table"]}`}>
          <TableHeader<GameStatisticModel>
            sort={payload.sort}
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
        {remainingCount != 0 || isLoading ? (
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
