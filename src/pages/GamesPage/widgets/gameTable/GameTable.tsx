import { useEffect, useState } from "react";
import { sort, sortType } from "../../../../models/filter";
import ValueWithProgress from "../../components/ValueWithProgress";
import { game } from "../../../../models/gameModel";
import { getNewSort } from "../../../../utils/FilterUtils";
import ReactPaginate from "react-paginate";
import useGetGames from "../../../../hooks/requests/useGetGames";
import SortedTableHeader from "../../../../widgets/SortedTableHeader";
import { GAMES_PER_PAGE } from "pages/gamesPage/constants";
import classes from "./gameTable.module.css";
import gamePageClasses from "../../GamesPage.module.css";
import BlureContainer from "widgets/blureContainer/BlureContainer";
import { useNavigate } from "react-router";
import { routeType } from "models/routeType";

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

  const pageCount = Math.ceil(props.count / GAMES_PER_PAGE);
  const getGames = useGetGames();

  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<sort<game>>({
    key: "rating",
    sortType: sortType.desc,
  });
  const [games, setGames] = useState<game[]>(props.games);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newGames = await getGames({
        paginate: {
          pageNumber: currentPage + 1,
          itemsPerPage: GAMES_PER_PAGE,
        },
        sort: sort,
        includeTotal: false,
      });
      setGames(newGames.games);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, sort]);

  function onPageChange(props: paginationProps) {
    const pageNumber = props.selected;
    setCurrentPage(pageNumber);
  }

  function handleHeaderClick(tableHeader: TableHeaderModel<game>) {
    const newSort = getNewSort(tableHeader, sort);
    setSort(newSort);
  }

  function gameClickHandler(game: game) {
    navigate(`/${routeType[routeType.games]}/${game.id}`);
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
                  {game.cashIncome != null ? (
                    <ValueWithProgress
                      valueWithProgress={game.cashIncome.valueWithProgress}
                      progressClassName={classes["progress"]}
                      regressClassName={classes["regress"]}
                    />
                  ) : (
                    "-"
                  )}
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
      </BlureContainer>
    </>
  );
}
