import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/RankingBoard/RankingBoard.css';
import { useEffect, useState } from 'react';
import { CircleInfo } from '../components/common/circleInfo';

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
    <div className="ranking-container">
      <table id="table-header">
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Equipe</th>
            <th scope="col">Mj</th>
            <th scope="col">V</th>
            <th scope="col">N</th>
            <th scope="col">D</th>
            <th scope="col">B</th>
            <th scope="col">Diff</th>
            <th scope="col">Pts</th>
          </tr>
        </thead>
      </table>
      <div
        id="scrollableTableContainer"
        className="table-container"
        style={{
          height: 'auto',
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={displayedRank.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollableTableContainer"
        >
          <table>
            <colgroup>
              <col style={{ width: '8%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>

            <tbody>
              {sortedTeamsData.map((team, index) => (
                <tr key={team.id}>
                  <th scope="row">{index + 1 + '.'}</th>
                  <td>{team.name}</td>
                  <td>{team.totalMatchPlayed}</td>
                  <td>{team.totalVictories}</td>
                  <td>{team.totalDraws}</td>
                  <td>{team.totalDefeats}</td>
                  <td>
                    {team.totalGoalsScored}:{team.totalGoalsConceded}
                  </td>
                  <td>{team.totalGoalsScored - team.totalGoalsConceded}</td>
                  <td>{team.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
      <caption>
        <CircleInfo
          message={
            <>
              <div>
                <span>Mj</span> = Matches joués / <span>V</span> = victoire /{' '}
                <span>D</span> = Défaite / <span>N</span> = Nul <br />
              </div>
              <div>
                <span>Bm</span> : Buts marqués / <span>Be</span> : Buts
                encaissés / <span>Diff</span> : Différence de buts <br />
              </div>
              <div>
                <span>Pts</span> : Points
              </div>
            </>
          }
        />
      </caption>
    </div>
  );
}
