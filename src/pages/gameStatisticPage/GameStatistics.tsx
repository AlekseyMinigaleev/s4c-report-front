import Modal from "components/Modal/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameStatisticTable from "./widgets/gameStatisticTable/GameStatisticTable";
import GameStatisticHeader from "./widgets/gameStatiscHeader/GameStatisticHeader";
import tableClasses from "../gamesPage/GamesPage.module.css";
import useGetGameById, {
  getGameByIdResponse,
} from "hooks/requests/useGetGameById";

export default function GameStatistics() {
  const { gameId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [game, setGame] = useState<getGameByIdResponse>();
  const getGameById = useGetGameById();

  useEffect(() => {
    getGameById(gameId!).then((response) => {
      setGame(response);
    });
  }, [gameId]);

  return (
    <>
      {game === undefined ? null : (
        <Modal
          isOpen={isModalOpen}
          title={game.name}
          onClose={() => {
            setIsModalOpen(false);
          }}
          header={<GameStatisticHeader game={game} gameId={gameId!} />}
          content={
            <GameStatisticTable
              gameId={gameId!}
              classes={tableClasses["table"]}
            />
          }
        />
      )}
    </>
  );
}
