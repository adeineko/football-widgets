export default async function LeaguesPage() {
  const data = await fetch('https://sportify.mediahuisgroup.com/api/v1/sports/1/leagues?lang=nl')
  const response = await data.json()

  const leagues = response.leagues
  
    return (
        <div>
      <h1>Leagues</h1>
      <ul>
      {leagues.map((post) => (
        <li key={post.id}>{post.name}</li>
      ))}
      </ul>
    </div>
    );
}
