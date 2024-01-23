import classes from "./GamesPage.module.css";

interface Game {
  name: string;
  playersCount: number;
  evaluation: number;
  publicationDate: Date;
  CashIncome: number;
}

const data1: Game[] = [
  {
    name: "Game 1",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 2",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 3",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
  {
    name: "Game 4",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 5",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 6",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
  {
    name: "Game 7",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 8",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 9",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
  {
    name: "Game 10",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 11",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 12",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
  {
    name: "Game 13",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 14",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 15",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
  {
    name: "Game 16",
    playersCount: 4,
    evaluation: 8.5,
    publicationDate: new Date("2022-01-23"), // Пример установки даты
    CashIncome: 100000,
  },
  {
    name: "Game 17",
    playersCount: 2,
    evaluation: 9.2,
    publicationDate: new Date("2021-12-15"),
    CashIncome: 75000,
  },
  {
    name: "Game 18",
    playersCount: 6,
    evaluation: 7.8,
    publicationDate: new Date("2022-02-05"),
    CashIncome: 120000,
  },
];

export default function GamesPage() {
  return (
    <>
      <h1 className={classes["h1"]}>Все игры</h1>

      <table className={classes["tabe"]}>
        <thead>
          <tr className={classes["tr"]}>
            <th className={classes["th"]}>Название</th>
            <th className={classes["th"]}>Количество игроков</th>
            <th className={classes["th"]}>Оценка</th>
            <th className={classes["th"]}>Дата публикации</th>
            <th className={classes["th"]}>Брибыль</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((x, index) => (
            <tr className={classes["tr"]}>
              <td className={classes["td"]}>{`${index} ${x.name}`}</td>
              <td className={classes["td"]}>
                {`${x.playersCount} (+${x.playersCount})`}
              </td>
              <td className={classes["td"]}>{x.evaluation}</td>
              <td className={classes["td"]}>
                {x.publicationDate.toLocaleDateString()}
              </td>
              <td className={classes["td"]}>
                {`${x.CashIncome} (+${x.CashIncome})`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
