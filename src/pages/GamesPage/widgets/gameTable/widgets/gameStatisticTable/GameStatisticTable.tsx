import { useEffect, useState } from "react";
import classes from "./gameStatisticTable.module.css";
import gamePageclasses from "../../../../GamesPage.module.css";
import gameTableClasses from "../../gameTable.module.css";
import LoadingButton from "../../../../../../components/loadingButton/LoadingButton";
import useGetGameStatisticById, {
  GetGameStatisticByGamePayload,
} from "../../../../../../hooks/requests/useGetGameStatisticById";
import { sort, sortType } from "../../../../../../models/filter";
import SortedTableHeader from "../../../../../../widgets/SortedTableHeader";
import { TableHeaderModel } from "../../GameTable";
import { getNewSort } from "../../../../../../utils/FilterUtils";
import { gameStatisticModel } from "../../../../../../models/gameStatisticModel";
import ValueWithProgress from "pages/gamesPage/components/ValueWithProgress";
import BlureContainer from "widgets/blureContainer/BlureContainer";

interface GameStatisticTableProps {
  gameId: string;
  classes: string;
}

const GAMES_PER_PAGE = 10;

export default function GameStatisticTable(props: GameStatisticTableProps) {
  const tableHeaders: TableHeaderModel<gameStatisticModel>[] = [
    {
      key: "lastSynchroDate",
      label: "Дата синхронизации",
    },
    {
      key: "evaluation",
      label: "Оценка",
    },
    {
      key: "rating",
      label: "рейтинг",
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
      sortType: sortType.desc,
    },
  });
  const [gameStatistics, setGameStatistics] = useState<gameStatisticModel[]>(
    []
  );
  const [remainingCount, setRemainingCount] = useState<number>();

  const getGameStatisticByGame = useGetGameStatisticById();

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
      setIsLoading(true);
      setGameStatisticsHandler(response.gameStatistics);
      setRemainingCount(response.remainingCount);
      setIsLoading(false);
    });
  }, [payload]);

  function setGameStatisticsHandler(gameStatistics: gameStatisticModel[]) {
    if (payload.paginate.pageNumber > 1) {
      setGameStatistics((prev) => [...prev, ...gameStatistics]);
    } else {
      setGameStatistics(gameStatistics);
    }
  }

  function changeSort(sort: sort<gameStatisticModel>) {
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
    tableHeader: TableHeaderModel<gameStatisticModel>
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
        <BlureContainer isLoading={isLoading} blurValue={"4px"}>
          <table className={`${props.classes} ${classes["table"]}`}>
            <SortedTableHeader<gameStatisticModel>
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
                  <td>
                    {gameStatistic.rating != null ? (
                      <ValueWithProgress
                        valueWithProgress={gameStatistic.rating}
                        progressClassName={gameTableClasses["progress"]}
                        regressClassName={gameTableClasses["regress"]}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {gameStatistic.cashIncome != null ? (
                      <ValueWithProgress
                        valueWithProgress={gameStatistic.cashIncome}
                        progressClassName={gameTableClasses["progress"]}
                        regressClassName={gameTableClasses["regress"]}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </BlureContainer>
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
