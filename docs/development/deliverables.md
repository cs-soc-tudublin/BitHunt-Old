# Deliverables

This is the list of all features that are required for the project to be considered complete.

## Broad Features

- [x] Players
- [x] Admins
- [X] Dynamic Stages
- [X] Scan QR-Codes to link to site.
- [ ] Puzzle solving
- [ ] Leaderboards
- [x] Multiple Events support
- [X] GDPR Compliance

## Database Tables

Players:

- [x] Name
- [x] StudentID
- [x] Privacy
- [x] Event
- [x] Score

Stages:

- [x] ID
- [x] Clue (To get to this stage)
- [x] Name
- [x] Event
- [x] PuzzleType

Puzzles:

- [x] ID
- [x] Event
- [x] Type
- [x] Puzzle

Leaderboards:

- [x] StudentID
- [x] [ Array of Stage IDs ]

Overall:

- [x] Amount of Students
- [x] Amount of Stages
- [x] Total Prizes
- [x] Amount of Remaining Prizes
- [x] Total Amount of Completed Stages

Events List:

- [x] EventID
- [x] Event Name
- [x] Event Date
- [x] Active

## UI Features

### Player UI

- [x] Account Creation
- [x] Cookie Storing
- [x] Access to Privacy Policy
- [x] Logout

### Admin UI

- [x] Create, Edit & Set Active events
- [x] Cookie Storing
- [x] Create & Edit Stages
- [X] Create & Edit Puzzles
- [ ] See Leaderboard
