import Modal from "components/modal/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameStatisticTable from "./widgets/gameStatisticTable/GameStatisticTable";
import GameStatisticHeader from "./widgets/gameStatiscHeader/GameStatisticHeader";
import tableClasses from "../gamesPage/GamesPage.module.css";
import useGetGameById, {
  getGameByIdResponse,
} from "hooks/requests/useGetGameById";
import { useNavigate } from "react-router-dom";

export default function GameStatistics() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [game, setGame] = useState<getGameByIdResponse>({
    name: "",
    url: "",
    previewURL: "",
    categories: [],
  });
  const getGameById = useGetGameById();

  useEffect(() => {
    getGameById(gameId!).then((response) => {
      setGame(response);
    });
  }, [gameId]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={game.name}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/games")
        }}
        content={
          <GameStatisticTable
            gameId={gameId!}
            classes={tableClasses["table"]}
          />
        }
        header={<GameStatisticHeader game={game} />}
      />
    </>
  );
}
