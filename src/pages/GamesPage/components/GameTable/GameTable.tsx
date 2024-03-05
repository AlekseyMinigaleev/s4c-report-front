import { useEffect, useState } from "react";
import { Sort, SortType } from "../../../../models/filter";
import classes from "./gameTable.module.css";
import paginationClasses from "../../pagination.module.css";
import gamePageClasses from "../../gamesPage.module.css";
import ValueWithProgress from "../valueWithProgress/ValueWithProgress";
import { Game, sortGames } from "../../../../models/gameModel";
import { getNewSort, paginate } from "../../../../utils/FilterUtils";
import ReactPaginate from "react-paginate";
import { Total } from "../../../../hooks/requests/useGetGames";
import Modal from "../../../../components/modal/Modal";
import GameStatisticTable from "../gameStatisticTable/GameStatisticTable";
import TableHeader from "../../../../widgets/TableHeader";

const GAMES_PER_PAGE = 10;

interface paginationProps {
  selected: number;
}

export interface TableHeaderModel<T> {
  key: keyof T;
  label: string;
  colSpan?: number;
}

interface GameTableProps {
  games: Game[];
  total: Total;
  classes: string;
}

interface ClickedGame {
  gameName: string;
  id: string;
}

export default function GameTable(props: GameTableProps) {
  const tableHeaders: TableHeaderModel<Game>[] = [
    {
      key: "name",
      label: "Название",
      colSpan: 2,
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
      key: "playersCount",
      label: "Количество игроков",
      colSpan: 2,
    },
    {
      key: "cashIncome",
      label: "Прибыль (RUB)",
      colSpan: 2,
    },
  ];
  const pageCount = Math.ceil(props.games.length / GAMES_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<Sort<Game>>({
    key: "playersCount",
    sortType: SortType.desc,
  });
  const [games, setGames] = useState<Game[]>(sortGames(props.games, sort));
  const [paginatedGames, setPaginatedGames] = useState<Game[]>(
    paginate(games, currentPage, GAMES_PER_PAGE)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedGame, setClickedGame] = useState<ClickedGame>({
    gameName: "",
    id: "",
  });

  useEffect(() => {
    const paginatedGames = paginate(games, currentPage, GAMES_PER_PAGE);
    setPaginatedGames(paginatedGames);
  }, [games]);

  function onPageCkick(props: paginationProps) {
    const pageNumber = props.selected;
    setCurrentPage(pageNumber);

    const paginatedGames = paginate(games, pageNumber, GAMES_PER_PAGE);
    setPaginatedGames(paginatedGames);
  }

  function handleHeaderClick(tableHeader: TableHeaderModel<Game>) {
    const newSort = getNewSort(tableHeader, sort);
    setSort(newSort);

    const sortedGames = sortGames(games, newSort);
    setGames(sortedGames);
  }

  function gameClickHandler(game: Game) {
    setClickedGame({
      gameName: game.name,
      id: game.id,
    });
    setIsModalOpen(true);
  }

  return (
    <>
      {clickedGame.id === "" ? null : (
        <Modal
          isOpen={isModalOpen}
          title={clickedGame.gameName}
          onClose={() => setIsModalOpen(false)}
        >
          <GameStatisticTable gameId={clickedGame.id} classes={props.classes} />
        </Modal>
      )}
      
      <table className={`${classes["table"]} ${props.classes}`}>
        <TableHeader
          sort={sort}
          tableHeaders={tableHeaders}
          containerClass={gamePageClasses["header-container"]}
          textClass={gamePageClasses["th-label"]}
          onClick={handleHeaderClick}
        />
        <tbody>
          {paginatedGames.map((game, index) => (
            <tr
              key={index}
              onClick={() => {
                gameClickHandler(game);
              }}
            >
              <td>{index + 1 + currentPage * 10}</td>
              <td>{`${game.name}`}</td>
              <td>
                {game.publicationDate &&
                  new Date(game.publicationDate).toLocaleDateString()}
              </td>
              <td>{game.evaluation}</td>
              <td>
                <ValueWithProgress
                  valueWithProgress={game.playersCount.valueWithProgress}
                  growthClassName={classes["growth"]}
                />
              </td>
              <td>{game.playersCount.percentage}%</td>
              <td>
                {game.cashIncome?.valueWithProgress ? (
                  <ValueWithProgress
                    valueWithProgress={game.cashIncome.valueWithProgress}
                    growthClassName={classes["growth"]}
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
