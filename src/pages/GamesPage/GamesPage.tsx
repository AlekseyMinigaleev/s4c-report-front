import ReactPaginate from "react-paginate";
import classes from "./GamesPage.module.css";
import paginationClasses from "./Pagination.module.css";
import GameRecords from "./components/GameRecords";
import { useEffect, useState } from "react";
import useGetGames, { Game } from "../../hooks/requests/useGetGames";
import { Paginate } from "../../models/Paginate";

interface paginationProps {
  selected: number;
}

export default function GamesPage() {
  const [pageCount, setPageCount] = useState<number>(1);
  const [games, setGames] = useState<Game[]>([]);

  const getGames = useGetGames();

  async function getDataWithPagination(page: number) {
    const paginate: Paginate = {
      itemsPerPage: 15,
      page: page,
    };

    const response = await getGames(paginate);
    setGames(response.games);
    setPageCount(Math.ceil(response.totalGamesCount / paginate.itemsPerPage));
  }

  async function handlePageClick(props: paginationProps) {
    await getDataWithPagination(props.selected + 1);
  }

  useEffect(() => {
    getDataWithPagination(1);
  }, []);

  return (
    <>
      <h1 className={classes["h1"]}>Все игры</h1>

      <table className={classes["games-tabel"]}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество игроков</th>
            <th>Оценка</th>
            <th>Дата публикации</th>
            <th>Брибыль</th>
          </tr>
        </thead>
        <tbody>
          <GameRecords games={games} />
        </tbody>
      </table>

      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        breakLabel="..."
        onPageChange={handlePageClick}
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
