# Football Widgets

A Next.js web application that displays football widgets with automatic score updates. Users can select a league to view its calendar and ranking, with real-time updates to get the latest scores.

## Features

- **League Selection**: Choose from a list of available football leagues.
- **Live Score Updates**: Automatic refreshing to display the most recent scores.
- **Match Calendar**: View matches for each matchday, including teams, scores, dates, and times.
- **League Rankings**: See team positions, total points, wins, losses, draws, and games played.
- **Robust States Handling**: User-friendly messages during loading, errors, or when data is unavailable.

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm**, **yarn**, or **pnpm** package manager

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:adeineko/football-widgets.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Usage

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Access the Application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Interact with the App**

   - **Select a League**: Choose a league from the home page.
   - **View Calendar**: Navigate through matchdays to see scheduled matches and scores.
   - **Check Rankings**: View the league standings and team statistics.

## Project Structure

- **pages/**: Next.js page components.
  - **index.js**: Home page with league selection.
  - **league/[leagueId].js**: Dynamic league details page.
- **components/**: Reusable React components.
  - **Calendar.js**: Displays the match calendar.
  - **Ranking.js**: Shows league rankings.
- **styles/**: CSS files for styling.
- **public/**: Static assets.

## API Reference

This application utilizes the Sportify API provided by Mediahuis Group.

- **Get All Leagues**

  ```
  GET /api/v1/sports/1/leagues?lang=nl
  ```

- **Get Phases for a League**

  ```
  GET /api/v1/leagues/{leagueId}/phases?lang=nl
  ```

- **Get Matches for a Phase**

  ```
  GET /api/v1/phases/{phaseId}/matches?lang=nl
  ```

- **Get Ranking for a Phase**

  ```
  GET /api/v1/phases/{phaseId}/ranking?lang=nl
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to discuss improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Sportify API by Mediahuis Group](https://sportify.mediahuisgroup.com/)

