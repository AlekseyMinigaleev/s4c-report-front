import ReactPaginate from "react-paginate";
import classes from "./GamesPage.module.css";
import paginationClasses from "./Pagination.module.css";
import { useEffect, useState } from "react";
import useGetGames, { Game } from "../../hooks/requests/useGetGames";
import { Sort, SortType } from "../../models/Filter";
import { paginate } from "../../Utils/FilterUtils";
import SortIcon from "../../components/SortIcon/SortIcon";
import ValueWithProgress from "./components/ValueWithGrowth/ValueWithProgress";
import lodash from "lodash";

const GAMES_PER_PAGE = 11;

interface paginationProps {
  selected: number;
}

interface tableHeader {
  key: keyof Game;
  label: string;
}

export default function GamesPage() {
  const tableHeaders: tableHeader[] = [
    {
      key: "name",
      label: "Название",
    },
    {
      key: "playersCountWithProgress",
      label: "Количество игроков",
    },
    {
      key: "evaluation",
      label: "Оценка",
    },
    {
      key: "publicationDate",
      label: "Дата публикации",
    },
    {
      key: "cashIncomeWithProgress",
      label: "Прибыль (RUB)",
    },
  ];

  const [pageCount, setPageCount] = useState<number>(1);
  const [games, setGames] = useState<Game[]>([]);
  const [paginatedGames, setPaginatedGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<Sort>({
    fieldName: "playersCountWithProgress",
    sortType: SortType.descending,
  });

  useEffect(() => {
    getGames().then((response) => {
      setGames(response);
      setPageCount(Math.ceil(response.length / GAMES_PER_PAGE));
    });
  }, []);

  useEffect(() => {
    paginateAndSetPaginatedGems(currentPage);
  }, [games]);

  const getGames = useGetGames();

  function paginateAndSetPaginatedGems(pageNumber: number) {
    const paginatedGames = paginate(games, pageNumber, GAMES_PER_PAGE);
    setPaginatedGames(paginatedGames);
  }

  function onPageCkick(props: paginationProps) {
    const pageNumber = props.selected;
    setCurrentPage(pageNumber);
    paginateAndSetPaginatedGems(pageNumber);
  }

  function handleHeaderClick(key: keyof Game) {
    let sortedGames: Game[] = [];
    const sortType =
      key == sort.fieldName
        ? sort.sortType === SortType.ascending
          ? SortType.descending
          : SortType.ascending
        : SortType.descending;
    const sortTypeString = sortType == SortType.ascending ? "asc" : "desc";
    
    if (key == "cashIncomeWithProgress" || key == "playersCountWithProgress") {
      sortedGames = lodash.orderBy(games, (x) => x[key]?.actualValue, [
        sortTypeString,
      ]);
    } else {
      sortedGames = lodash.orderBy(games, [key], [sortTypeString]);
    }

    setGames(sortedGames);
    setSort({
      fieldName: key,
      sortType: sortType,
    });
  }

  return (
    <>
      <h1 className={classes["h1"]}>Все игры</h1>

      <table className={classes["table"]}>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, index) => (
              <th
                className=""
                key={index}
                onClick={() => {
                  handleHeaderClick(tableHeader.key);
                }}
              >
                <div className={classes["header-container"]}>
                  <span>{tableHeader.label}</span>

                  {tableHeader.key == sort.fieldName && (
                    <SortIcon sortType={sort.sortType} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedGames.map((game, index) => (
            <tr key={index}>
              <td>{`${game.name}`}</td>
              <td>
                {game.playersCountWithProgress ? (
                  <ValueWithProgress
                    valueWithProgress={game.playersCountWithProgress}
                    growthClassName={classes["growth"]}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td>{game.evaluation}</td>
              <td>{new Date(game.publicationDate).toLocaleDateString()}</td>
              <td>
                {game.cashIncomeWithProgress ? (
                  <ValueWithProgress
                    valueWithProgress={game.cashIncomeWithProgress}
                    growthClassName={classes["growth"]}
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        breakLabel=""
        onPageChange={onPageCkick}
        pageCount={pageCount}
        forcePage={currentPage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        containerClassName={paginationClasses["pagination"]}
        pageLinkClassName={paginationClasses["page-num"]}
        previousLinkClassName={paginationClasses["page-num"]}
        nextLinkClassName={paginationClasses["page-num"]}
        activeLinkClassName={paginationClasses["active"]}
      />
    </>
  );
}
