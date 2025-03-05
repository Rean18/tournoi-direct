export function RankingBoard() {
  const teamsData = localStorage.getItem('teamsData');
  const parsedTeamsData = JSON.parse(teamsData);
  console.log('Data pour classement', parsedTeamsData);

  return (
    <div>
      <table>
        <thead>
          <tr>
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
          {parsedTeamsData.map((team) => (
            <tr key={team.id}>
              <th scope="row">{team.name}</th>
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

        <caption align="bottom">
          Mj : Matches joués / V : victoire / D : Défaite / N : Nul <br />
          Bm : Buts marqués / Be : Buts encaissés / Diff : Différence de buts /
          Pts : Points
        </caption>
      </table>
    </div>
  );
}
