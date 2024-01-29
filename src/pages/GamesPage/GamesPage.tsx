import ReactPaginate from "react-paginate";
import classes from "./GamesPage.module.css";
import paginationClasses from "./Pagination.module.css";
import { useEffect, useState } from "react";
import useGetGames, { Game } from "../../hooks/requests/useGetGames";
import { Sort, SortType } from "../../models/Filter";
import { paginate } from "../../Utils/FilterUtils";
import SortIcon from "../../components/SortIcon/SortIcon";
import ValueWithProgress from "./components/ValueWithGrowth/ValueWithProgress";
import lodash, { words } from "lodash";
import { locale } from "yargs";

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

  const [sort, setSort] = useState<Sort>(
    localStorage.getItem("sort")
      ? JSON.parse(localStorage.getItem("sort")!)
      : {
          fieldName: "playersCountWithProgress",
          sortType: SortType.descending,
        }
  );

  useEffect(() => {
    getGames(sort).then((response) => {
      setGames(response);
      setPageCount(Math.ceil(response.length / GAMES_PER_PAGE));
    });
  }, []);

  useEffect(() => {
    paginateAndSetPaginatedGems(1);
  }, [games]);

  const getGames = useGetGames();

  function paginateAndSetPaginatedGems(pageNumber: number) {
    const paginatedGames = paginate(games, pageNumber, GAMES_PER_PAGE);
    setPaginatedGames(paginatedGames);
  }

  function handleHeaderClick(tableHeader: tableHeader) {
    let a =
      sort.sortType === SortType.ascending
        ? SortType.descending
        : SortType.ascending;

    const sort1: Sort = {
      fieldName: tableHeader.key,
      sortType: a,
    };

    localStorage.setItem("sort", JSON.stringify(sort1));

    window.location.reload();
  }

  return (
    <>
      <h1 className={classes["h1"]}>Все игры</h1>
      <table className={classes["games-tabel"]}>
        <thead>
          <tr>
            {tableHeaders.map((x, index) => (
              <th
                key={index}
                onClick={() => {
                  handleHeaderClick(x);
                }}
              >
                <span>{x.label}</span>
                <SortIcon sortType={sort.sortType} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedGames.map((x, index) => (
            <tr key={index}>
              <td>{`${x.name}`}</td>
              <td>
                <ValueWithProgress
                  valueWithProgress={x.playersCountWithProgress}
                  growthClassName={classes["growth"]}
                />
              </td>
              <td>{x.evaluation}</td>
              <td>{new Date(x.publicationDate).toLocaleDateString()}</td>
              <td>
                {x.cashIncomeWithProgress ? (
                  <ValueWithProgress
                    valueWithProgress={x.cashIncomeWithProgress}
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
        onPageChange={(props: paginationProps) => {
          paginateAndSetPaginatedGems(props.selected + 1);
        }}
        pageCount={pageCount}
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
