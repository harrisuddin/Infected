# Infected

Infected is a simple MMOG where the infected have to chase the humans and turn them into infected.

# How to run locally

* Step 1: Download the repo
* Step 2: Create a file called .env
* Step 3: Add the following lines to the .env file
<br>DB_HOST="Your DB Host"
<br>DB_USER="Your DB User"
<br>DB_PASSWORD="Your DB Password"
<br>DB_DATABASE="Your DB Database"
* Step 4: Run the command `npm install` in the directory of the repo
* Step 5: Run `npm start` to play

# Game Plan

The game is going to be similar to a tag game where there will be one player that is infected that will go around chasing the other players, if the infected player touches another player then that player will become infected, Once a player gets infected they join the infected side and try to get the other non infected players. 

There will be a lobby of players and one player will be randomly chosen to be the be the infected player, all the player will spawn in the same map.

Each round will last two minutes, and there will be one player that is infected and the rest will be non infected.
There will be a point system, every second that you survive as a non infected they will get a point, the infected player will gain 5 points per each person they get infected.

The map will be free roam map, where the players will be able to run around. the player wont be able to see the full map, they will only be able to see 1/4 of the map as the map is bigger than the screen the camera will be locked on the play, once the player reaches a edge of the screen the camera will move with the player and they will be able to see the other part of the map.

