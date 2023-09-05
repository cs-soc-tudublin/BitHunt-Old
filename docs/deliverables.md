# Deliverables

This is the list of all features that are required for the project to be considered complete.

## Broad Features
- [ ] Players
- [ ] Admins
- [ ] Dynamic Stages
- [ ] Scan QR-Codes in-app
- [ ] Puzzle solving
- [ ] Leaderboards
- [ ] Multiple Events support
- [ ] GDPR Compliance



## Database Tables

Players:
- [X] Name
- [X] StudentID
- [X] Privacy
- [X] Event
- [X] Score

Stages:
- [X] ID
- [X] Clue (To get to this stage)
- [X] Name
- [X] Event
- [X] PuzzleType

Puzzles:
- [X] ID
- [X] Event
- [X] Type
- [X] Puzzle

Leaderboards:
- [X] StudentID
- [X] [ Array of Stage IDs ]

Overall:
- [X] Amount of Students
- [X] Amount of Stages
- [X] Total Prizes
- [X] Amount of Remaining Prizes
- [X] Total Amount of Completed Stages

Events List:
- [X] EventID
- [X] Event Name
- [X] Event Date
- [X] Active



## UI Features

### Player UI
- [ ] QR Code Parsing
- [ ] Account Creation
- [ ] Cookie Storing
- [ ] Access to Privacy Policy
- [ ] Logout

### Admin UI
- [ ] Create, Edit & Set Active events
- [X] Cookie Storing
- [ ] Create & Edit Stages
- [ ] Create & Edit Puzzles
- [ ] See Leaderboard