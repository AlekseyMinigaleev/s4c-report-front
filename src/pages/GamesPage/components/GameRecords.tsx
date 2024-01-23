import { Game } from "../../../hooks/requests/useGetGames";

export default function GameRecords(props: { games: Game[] }) {
  return (
    <>
      {props.games.map((x, index) => (
        <tr key={index}>
          <td>{`${x.name}`}</td>
          <td>{`${x.playersCount} (+${x.playersCount})`}</td>
          <td>{x.evaluation}</td>
          <td>{`${x.publicationDate}`}</td>
          <td>{`${x.totalCashIncome} (+${x.dailyCashIncome})`}</td>
        </tr>
      ))}
    </>
  );
}
