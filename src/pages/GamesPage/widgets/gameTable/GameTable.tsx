import { ChangeEvent, useEffect, useState } from "react";
import { sort, sortType } from "../../../../models/Filter";
import ValueWithProgress from "../../components/ValueWithProgress";
import { game } from "../../../../models/GameModel";
import { getNewSort } from "../../../../Utils/FilterUtils";
import ReactPaginate from "react-paginate";
import useGetGames from "../../../../hooks/requests/useGetGames";
import SortedTableHeader from "../../../../widgets/SortedTableHeader";
import classes from "./gameTable.module.css";
import gamePageClasses from "../../GamesPage.module.css";
import BlureContainer from "widgets/blureContainer/BlureContainer";
import { useNavigate } from "react-router";
import { routeType } from "models/routeType";
import ConfidentioalContainer from "widgets/confidentialContainer/confidentialContainer";

export interface TableHeaderModel<T> {
  key: keyof T;
  label: string;
  colSpan?: number;
}

interface paginationProps {
  selected: number;
}

interface GameTableProps {
  games: game[];
  page: number;
  count: number;
  classes: string;
  borderClasses: string;
}
export default function GameTable(props: GameTableProps) {
  const tableHeaders: TableHeaderModel<game>[] = [
    {
      key: "name",
      label: "Название",
      colSpan: 3,
    },
    {
      key: "publicationDate",
      label: "Дата публикации",
    },
    {
      key: "evaluation",
      label: "Оценка",
    },
    {
      key: "rating",
      label: "Рейтинг",
    },
    {
      key: "cashIncome",
      label: "Прибыль (RUB)",
      colSpan: 2,
    },
  ];

  const getGames = useGetGames();

  const currentPage = props.page - 1;
  const [gamesPerPage, setGamesPerPage] = useState<number>(() => {
    const savedValue = localStorage.getItem("gamesPerPage");
    return savedValue ? parseInt(savedValue) : 10;
  });
  const [sort, setSort] = useState<sort<game>>({
    key: "rating",
    sortType: sortType.desc,
  });
  const [games, setGames] = useState<game[]>(props.games);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const pageCount = Math.ceil(props.count / gamesPerPage);

  useEffect(() => {
    localStorage.setItem("gamesPerPage", gamesPerPage.toString());
  }, [gamesPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newGames = await getGames({
        paginate: {
          pageNumber: currentPage + 1,
          itemsPerPage: gamesPerPage,
        },
        sort: sort,
        includeTotal: false,
      });
      setGames(newGames.games);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, sort, gamesPerPage]);

  function onPageChange(props: paginationProps) {
    const pageNumber = props.selected;
    navigate(`/games/${pageNumber + 1}`);
  }

  function handleHeaderClick(tableHeader: TableHeaderModel<game>) {
    const newSort = getNewSort(tableHeader, sort);
    setSort(newSort);
  }

  function gameClickHandler(game: game) {
    navigate(`/${routeType[routeType.game]}/${game.id}`);
  }

  function selectGamesPerPageHandler(event: ChangeEvent<HTMLSelectElement>) {
    setGamesPerPage(parseInt(event.target.value));
  }

  return (
    <>
      <BlureContainer isLoading={isLoading} blurValue={"4px"}>
        <table
          className={`${classes["table"]} ${props.classes} ${props.borderClasses}`}
        >
          <SortedTableHeader
            sort={sort}
            tableHeaders={tableHeaders}
            containerClass={gamePageClasses["header-container"]}
            textClass={gamePageClasses["th-label"]}
            onClick={handleHeaderClick}
          />
          <tbody>
            {games.map((game, index) => (
              <tr
                key={index}
                onClick={() => {
                  gameClickHandler(game);
                }}
              >
                <td>{index + 1 + currentPage * 10}</td>
                <td>
                  <img
                    src={game.previewURL}
                    width={100}
                    height={"auto"}
                    className={classes["rounded"]}
                  />
                </td>
                <td>{`${game.name}`}</td>
                <td>
                  {game.publicationDate &&
                    new Date(game.publicationDate).toLocaleDateString()}
                </td>
                <td>{game.evaluation}</td>
                <td>
                  {game.rating != null ? (
                    <ValueWithProgress
                      valueWithProgress={game.rating}
                      progressClassName={classes["progress"]}
                      regressClassName={classes["regress"]}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <ConfidentioalContainer>
                    {game.cashIncome != null ? (
                      <ValueWithProgress
                        valueWithProgress={game.cashIncome.valueWithProgress}
                        progressClassName={classes["progress"]}
                        regressClassName={classes["regress"]}
                      />
                    ) : (
                      "-"
                    )}
                  </ConfidentioalContainer>
                </td>
                <td>
                  {game.cashIncome?.valueWithProgress?.actualValue == 0 ? (
                    <>{game.cashIncome.percentage}%</>
                  ) : game.cashIncome?.percentage ? (
                    <>{game.cashIncome.percentage}%</>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={classes["paginate-container"]}>
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            breakLabel=""
            onPageChange={onPageChange}
            pageCount={pageCount}
            forcePage={currentPage}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            containerClassName={classes["pagination"]}
            pageLinkClassName={classes["page-num"]}
            previousLinkClassName={classes["page-num"]}
            nextLinkClassName={classes["page-num"]}
            activeLinkClassName={classes["active"]}
          />

          <div className={classes["rows-per-page-container"]}>
            <label htmlFor="rows per page">Записей на странице</label>
            <select
              value={gamesPerPage}
              id="rows per page"
              onChange={selectGamesPerPageHandler}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </BlureContainer>
    </>
  );
}
