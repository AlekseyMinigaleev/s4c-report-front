import { useEffect, useState } from "react";
import { Sort } from "../../../../models/Filter";
import classes from "./GameTable.module.css";
import paginationClasses from "../../Pagination.module.css";
import SortIcon from "../../../../components/SortIcon/SortIcon";
import ValueWithProgress from "../ValueWithGrowth/ValueWithProgress";
import { Game, sortGames } from "../../../../models/GameModel";
import { paginate } from "../../../../Utils/FilterUtils";
import ReactPaginate from "react-paginate";
import { Total } from "../../../../hooks/requests/useGetGames";
import Modal from "../../../../components/Modal/Modal";

const GAMES_PER_PAGE = 10;

interface paginationProps {
  selected: number;
}

interface tableHeader {
  key: keyof Game;
  label: string;
}

interface GameTableProps {
  games: Game[];
  total: Total;
  classes: string;
}

export default function GameTable(props: GameTableProps) {
  const tableHeaders: tableHeader[] = [
    {
      key: "name",
      label: "Название",
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
    },
    {
      key: "cashIncome",
      label: "Прибыль (RUB)",
    },
  ];
  const pageCount = Math.ceil(props.games.length / GAMES_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<Sort<keyof Game>>({
    key: "playersCount",
    sortType: "desc",
  });
  const [games, setGames] = useState<Game[]>(sortGames(props.games, sort));
  const [paginatedGames, setPaginatedGames] = useState<Game[]>(
    paginate(games, currentPage, GAMES_PER_PAGE)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  function handleHeaderClick(key: keyof Game) {
    const newSort: Sort<keyof Game> = {
      key: key,
      sortType:
        key == sort.key ? (sort.sortType === "asc" ? "desc" : "asc") : "desc",
    };
    setSort(newSort);

    const sortedGames = sortGames(games, newSort);
    setGames(sortedGames);
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={"jopa"}
        onClose={() => setIsModalOpen(false)}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          debitis itaque obcaecati distinctio, quis officia quaerat
          necessitatibus veritatis dolorem aperiam earum. Recusandae, vel et
          perspiciatis dolor voluptas possimus temporibus quo.
        </p>
      </Modal>

      <table className={`${classes["table"]} ${props.classes}`}>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, index) => (
              <th
                colSpan={index === 0 || index === 3 || index === 4 ? 2 : 1}
                key={index}
                onClick={() => {
                  handleHeaderClick(tableHeader.key);
                }}
              >
                <div className={classes["header-container"]}>
                  <span className={classes["span"]}>{tableHeader.label}</span>

                  {tableHeader.key == sort.key && (
                    <SortIcon sortType={sort.sortType} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedGames.map((game, index) => (
            <tr
              key={index}
              onClick={() => {
                setIsModalOpen(true);
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
