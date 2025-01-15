import React, { useState, useEffect } from "react";
import "./App.css";

// Define types
interface Player {
  rank: number;
  name: string;
  score: number;
}

interface LeaderboardProps {
  game: string;
  fetchData: () => Promise<Player[]>;
}

// Leaderboard Component
const Leaderboard: React.FC<LeaderboardProps> = ({ game, fetchData }) => {
  const [data, setData] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((result) => setData(result))
      .catch((err) => setError(err.message));
  }, [fetchData]);

  if (error) return <div>Error loading {game} leaderboard: {error}</div>;

  return (
    <div className="leaderboard">
      <h2 className="game-title">{game}</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <tr key={player.rank}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// App Component
const App: React.FC = () => {
  // Replace these with real API calls
  const fetchMarvelRivals = async (): Promise<Player[]> => {
    return [
      { rank: 1, name: "Player1", score: 2500 },
      { rank: 2, name: "Player2", score: 2400 },
      { rank: 3, name: "Player3", score: 2300 },
    ];
  };

  const fetchFaceit = async (): Promise<Player[]> => {
    return [
      { rank: 1, name: "Sharpshooter", score: 3000 },
      { rank: 2, name: "SniperElite", score: 2900 },
      { rank: 3, name: "AcePlayer", score: 2800 },
    ];
  };

  const fetchLoL = async (): Promise<Player[]> => {
    return [
      { rank: 1, name: "DragonSlayer", score: 2700 },
      { rank: 2, name: "MinionDestroyer", score: 2600 },
      { rank: 3, name: "TowerCrusher", score: 2500 },
    ];
  };

  return (
    <div className="app">
      <h1 className="app-header">Game Leaderboards</h1>
      <div className="leaderboard-container">
        <Leaderboard game="Marvel Rivals" fetchData={fetchMarvelRivals} />
        <Leaderboard game="Counter Strike (Faceit)" fetchData={fetchFaceit} />
        <Leaderboard game="League of Legends" fetchData={fetchLoL} />
      </div>
    </div>
  );
};

export default App;
