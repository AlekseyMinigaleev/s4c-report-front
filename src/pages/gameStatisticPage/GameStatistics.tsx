import Modal from "components/modal/Modal";
import { useState } from "react";
import { useParams } from "react-router";
import GameStatisticTable from "./widgets/gameStatisticTable/GameStatisticTable";
import GameStatisticHeader from "./widgets/gameStatiscHeader/GameStatisticHeader";

export default function GameStatistics() {
  const { gameId } = useParams();
  const [isModalOpen,setIsModalOpen] = useState(true);

 
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={clickedGame.gameName}
        onClose={() => setIsModalOpen(false)}
        content={
          <GameStatisticTable gameId={gameId!} classes={props.classes} />
        }
        header={<GameStatisticHeader clickedGame={clickedGame} />}
      />
    </>
  );
}
