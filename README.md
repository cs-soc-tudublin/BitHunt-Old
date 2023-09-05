# BitHunt

BitHunt is a SvelteKit and PostgreSQL based web app that allows Societies to create treasure hunts for their members to complete.
Each treasure hunt consists of multiple stages, each stage has a puzzle that the players must solve to get the clue to the next stage.
Stages are found by scanning QR Codes, which are generated for each stage.

It was originally developed for CS++'s Freshers Treasure Hunt 2023.

## Features
- Players can register and log in to the game.
- Leaderboard
- Modular Stages
- Modular Puzzles
- Full Admin Suite
- QR Code Generation
- Overall Game Stats

## Installation
### Prerequisites
- Node.js
- NPM
- PostgreSQL

### Steps
1. Create a new PostgreSQL database.

```sql
CREATE DATABASE [name];
```

2. Clone the repository.

```bash
git clone https://github.com/cs-soc-tudublin/BitHunt.git
```

3. Install the dependencies.

```bash
npm install
```

4. Create a `.env` file in the root directory of the project and add the following environment variables.

```env
DATABASE_URL=postgres://[username]:[password]@[database URL]:[port]/[name]
ADMIN_PASSWORD=[password]
```

