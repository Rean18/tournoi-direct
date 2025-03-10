import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/RankingBoard/RankingBoard.css';
import { useEffect, useState } from 'react';
export function RankingBoard() {
  // eslint-disable-next-line no-unused-vars
  const [parsedTeamsData, setParsedTeamsData] = useState(() => {
    const teamsData = localStorage.getItem('teamsData');
    return teamsData ? JSON.parse(teamsData) : [];
  });
  console.log('Data pour classement', parsedTeamsData);

  const [displayedRank, setDisplayedRank] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const sortedTeamsData = useMemo(() => {
    return [...parsedTeamsData].sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) {
        return b.totalPoints - a.totalPoints;
      } else {
        return (
          b.totalGoalsScored -
          b.totalGoalsConceded -
          (a.totalGoalsScored - a.totalGoalsConceded)
        );
      }
    });
  }, [parsedTeamsData]);

  // Scroll du classement
  useEffect(() => {
    setDisplayedRank(sortedTeamsData.slice(0, 6));
  }, [sortedTeamsData]);
  const fetchMoreData = () => {
    if (displayedRank.length >= sortedTeamsData.length) {
      setHasMore(false);
      return;
    }
    const nextRanks = sortedTeamsData.slice(
      displayedRank.length,
      displayedRank.length + 6
    );
    setDisplayedRank((prevRanks) => [...prevRanks, ...nextRanks]);
  };

  return (
    <div>
      <div
        id="scrollableTableContainer"
        className="table-container"
        style={{ height: 'auto', overflow: 'auto' }}
      >
        <InfiniteScroll
          dataLength={displayedRank.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollableTableContainer"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Equipe</th>
                <th scope="col">Mj</th>
                <th scope="col">V</th>
                <th scope="col">N</th>
                <th scope="col">D</th>
                <th scope="col">Bm</th>
                <th scope="col">Be</th>
                <th scope="col">Diff</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>

            <tbody>
              {sortedTeamsData.map((team, index) => (
                <tr key={team.id}>
                  <th scope="row">{index + 1 + '.'}</th>
                  <td>{team.name}</td>
                  <td>{team.totalMatchPlayed}</td>
                  <td>{team.totalVictories}</td>
                  <td>{team.totalDraws}</td>
                  <td>{team.totalDefeats}</td>
                  <td>{team.totalGoalsScored}</td>
                  <td>{team.totalGoalsConceded}</td>
                  <td>{team.totalGoalsScored - team.totalGoalsConceded}</td>
                  <td>{team.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
      <caption>
        Mj : Matches joués / V : victoire / D : Défaite / N : Nul <br />
        Bm : Buts marqués / Be : Buts encaissés / Diff : Différence de buts /
        Pts : Points
      </caption>
    </div>
  );
}
