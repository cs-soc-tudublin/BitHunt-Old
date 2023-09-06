# Routing

This document serves to explain the routing system used in BitHunt.

## Overview

The routing is split into two parts: the Player routes and the Admin routes. The Player routes are used by the players to interact with the game, and the Admin routes are used by the admins to manage the game.

Once complete, each route will be marked with a checkbox.

## Player Routes

- [X] `/` - The main page of the game. This is where the player will be redirected to if they are not logged in.
    - [ ] `/login` - The login page. This is where the player will be redirected to if they are not logged in.
    - [ ] `/logout` - The logout page. This is where the player will be redirected to if choose to log out.
    - [X] `/register` - The register page. This is where the player will be redirected to if they do not have an account.
    - [ ] `/privacy` - The privacy policy page. This is where the player will be redirected to if they want to view the privacy policy.
    - [ ] `/stage` - The stage main page, here they will scan the QR Codes to be redirected to a specific stage.
        - [ ] `/stage/:id` - This is where players are sent when they scan a QR Code, here they solve a puzzle and are given a clue to the next stage.
    - [ ] `/leaderboard` - The leaderboard page. This is where the player will be redirected to if they want to view the leaderboard.

## Admin Routes

- [X] `/admin` - The main admin page, this is where admins log in to the Admin portal.
    - [X] `/admin/events` - The events page, this is where admins can view, create, edit and delete events.
        - [X] `/admin/events/create` - The create event page, this is where admins can create a new event.
        - [X] `/admin/events/remove/:id` - The remove event page, this is where admins can remove an existing event.
        - [X] `/admin/events/view/:id` - The edit event page, this is where admins can edit an existing event.
    - [ ] `/admin/stages` - The stages page, this is where admins can view, create, edit and delete stages.
        - [ ] `/admin/stages/create` - The create stage page, this is where admins can create a new stage.
        - [ ] `/admin/stages/remove/:id` - The remove stage page, this is where admins can remove an existing stage.
        - [ ] `/admin/stages/:id` - The edit stage page, this is where admins can edit an existing stage.
    - [ ] `/admin/puzzles` - The puzzles page, this is where admins can view, create, edit and delete puzzles.
        - [ ] `/admin/puzzles/create` - The create puzzle page, this is where admins can create a new puzzle.
        - [ ] `/admin/puzzles/remove/:id` - The remove puzzle page, this is where admins can remove an existing puzzle.
        - [ ] `/admin/puzzles/:id` - The edit puzzle page, this is where admins can edit an existing puzzle.
    - [ ] `/admin/leaderboard` - The leaderboard page, this is where admins can view and edit the leaderboard.
    - [ ] `/admin/overall` - The overall page, this is where admins can view and edit the overall game stats.