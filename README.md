# Football Widgets

## Features

- **League Selection**: Choose from a list of available football leagues.
- **Score Updates**: Automatic refreshing to display the most recent scores.
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

## Contact

For any questions or feedback, please contact [adeineko10@gmail.com](mailto:your-email@example.com).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
