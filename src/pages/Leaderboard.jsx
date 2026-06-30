import { useEffect, useMemo, useState } from "react";
import getBadge from "../getBadge";
import { fetchLeaderboard, getPlayerName, loadLocalProgress } from "../services/progressApi";

function Leaderboard({ points }) {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Loading leaderboard...");

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      setStatus("Loading leaderboard...");
      const data = await fetchLeaderboard();

      if (isMounted) {
        setPlayers(data);
        setStatus("Leaderboard ready");
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [points]);

  const sortedPlayers = useMemo(() => {
    const playerName = getPlayerName();
    const localProgress = loadLocalProgress();
    const mergedPlayers = players.filter((player) => player.name !== playerName);

    mergedPlayers.push({
      name: playerName,
      points: Math.max(points, localProgress.points),
      isCurrentPlayer: true,
    });

    return mergedPlayers
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({ ...player, rank: index + 1 }));
  }, [players, points]);

  return (
    <div className="leaderboard-container">
      <section className="leaderboard-hero">
        <p className="eyebrow">ByteKid Rankings</p>
        <h1>Leaderboard</h1>
        <p>{status}. Complete playground challenges to move your score here.</p>
      </section>

      <div className="leaderboard-list">
        {sortedPlayers.map((player) => (
          <article
            key={player.name}
            className={`leaderboard-row ${player.isCurrentPlayer ? "current-player" : ""}`}
          >
            <div className="rank-badge">#{player.rank}</div>
            <div className="player-details">
              <h3>{player.name}</h3>
              <p>{getBadge(player.points)}</p>
            </div>
            <strong>{player.points} pts</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
