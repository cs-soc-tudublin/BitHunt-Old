# Routing

This document serves to explain the routing system used in BitHunt.

## Overview

The routing is split into two parts: the Player routes and the Admin routes. The Player routes are used by the players to interact with the game, and the Admin routes are used by the admins to manage the game.

Once complete, each route will be marked with a checkbox.

## Player Routes

- [x] `/` - The main page of the game. This is where the player will be redirected to if they are not logged in.
  - [x] `/login` - The login page. This is where the player will be redirected to if they are not logged in.
  - [x] `/logout` - The logout page. This is where the player will be redirected to if choose to log out.
  - [x] `/register` - The register page. This is where the player will be redirected to if they do not have an account.
  - [x] `/privacy` - The privacy policy page. This is where the player will be redirected to if they want to view the privacy policy.
  - [X] `/stage` - The stage main page, here they will see their current clue.
    - [X] `/stage/:id` - This is where players are sent when they scan a QR Code, here they solve a puzzle and are given a clue to the next stage.
  - [ ] `/leaderboard` - The leaderboard page. This is where the player will be redirected to if they want to view the leaderboard. Users not willing to share their Names will be given 'Anonymous [Duck Species]' as a placeholder.

## Admin Routes

- [x] `/admin` - The main admin page, this is where admins log in to the Admin portal.
  - [x] `/admin/events` - The events page, this is where admins can view, create, edit and delete events.
    - [x] `/admin/events/create` - The create event page, this is where admins can create a new event.
    - [x] `/admin/events/remove/:id` - The remove event page, this is where admins can remove an existing event.
    - [x] `/admin/events/view/:id` - The edit event page, this is where admins can edit an existing event.
  - [x] `/admin/stages` - The stages page, this is where admins can view, create, edit and delete stages.
    - [x] `/admin/stages/create` - The create stage page, this is where admins can create a new stage.
    - [x] `/admin/stages/remove/:id` - The remove stage page, this is where admins can remove an existing stage.
    - [x] `/admin/stages/view/:id` - The edit stage page, this is where admins can edit an existing stage.
    - [x] `/admin/stages/qr/:id` - This is where admins can generate a QR Code for a stage.
  - [ ] `/admin/puzzles` - The puzzles page, this is where admins can view, create, edit and delete puzzles.
    - [ ] `/admin/puzzles/create` - The create puzzle page, this is where admins can create a new puzzle.
    - [ ] `/admin/puzzles/remove/:id` - The remove puzzle page, this is where admins can remove an existing puzzle.
    - [ ] `/admin/puzzles/view/:id` - The edit puzzle page, this is where admins can edit an existing puzzle.
  - [ ] `/admin/leaderboard` - The leaderboard page, this is where admins can view and edit the leaderboard.
  - [ ] `/admin/overall` - The overall page, this is where admins can view and edit the overall game stats.
