import { initializeSPA, setupNavigation } from './spa.js';

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation('#btn-profile');
    initializeSPA();
});

// // multiplayer game or tournament being hosted?
// let hostgame_m = true;
// let hostgame_t = true;
// // host player for multiplayer and tournament games
// let hostplayer_m = null;
// let hostplayer_t = null;
// // info for mutiplayer and tournament games
// const gameinfo_m = document.getElementById("multiplayer-info");
// const gameinfo_t = document.getElementById("tournament-info");
// // temporary storage for game info
// let tmp_gameinfo_m = null;
// let tmp_gameinfo_t = null;

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("game-multiplayer").addEventListener("click", async function (event) {
//       event.preventDefault();

//       const moduser = document.getElementById("modusername").innerHTML;
//       console.log("moduser: ", moduser);

//       if (!hostgame_m) {
//         hostgame_m = true;
//         // call API to remove user from the queue who hosted the game
//         (async function () {
//           await rmPlayerName(moduser);

//           hostplayer_m = await rmPlayer();
//           if (hostplayer_m != undefined) {
//             setTimeout(function () {
//               alert(
//                 `Go to ${hostplayer_m}'s window on your browser to play a 1 VS 1 game; if you want to host a new game here, go back and select 'Multiplayer' again`
//               );
//             }, 700);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Game started! Go to ${hostplayer_m}'s window to play!`;

//             // QUIII
//             const chatinstance = new Chat(moduser).getChatInstance();
//             chatinstance.sendWeArePlayingTo(hostplayer_m);
//             // connectWebSocket(moduser, hostplayer_m);
//           } else {
//             setTimeout(function () {
//               alert(
//                 "You hosted a new 1 VS 1 game, but you're the only one... waiting for someone to join"
//               );
//             }, 700);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Waiting for players...`;
//             await addPlayer();
//             console.log("getPlayerIncima: ", await getPlayer());
//           }
//           gameinfo_m.innerHTML = tmp_gameinfo_m;
//         })();
//       } else {
//         (async function () {
//           await rmPlayerName(moduser);

//           let numPlayers = await getNumPlayers();
//           console.log("numPlayers: ", numPlayers);
//           if (numPlayers === 0) {
//             // checking if any other player has hosted a game
//             setTimeout(function () {
//               alert(
//                 "You hosted a new 1 VS 1 game, but you're the only one... waiting for someone to join"
//               );
//             }, 700);

//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Waiting for players...`;
//             // call API to add to players queue
//             console.log("getPlayerMe: ", await getPlayer());
//             hostgame_m = true;
//           } else {
//             setTimeout(function () {
//               alert(
//                 "You hosted a new 1 VS 1 game; if you want to partecipate, go back to game-modes and select 'Multiplayer' again... waiting for someone to join"
//               );
//             }, 700);

//             hostplayer_m = await getPlayer();
//             console.log("getPlayer: ", hostplayer_m);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Play VS ${hostplayer_m}<br>Go back OR Stay to host`;
//             tmp_gameinfo_m = gameinfo_m.innerHTML;
//             gameinfo_m.innerHTML =
//               gameinfo_m.innerHTML + "<br><br>You VS " + hostplayer_m;
//             hostgame_m = false;
//           }
//           await addPlayer();
//         })();
//       }

//       // fix-me: what's playpong??? window where user plays?
//       history.pushState({}, "", "/pong/playpong");
//     });

//   document.getElementById("game-tournament").addEventListener("click", async function (event) {
//       event.preventDefault();

//       const moduser = document.getElementById("modusername").innerHTML;
//       console.log("moduser: ", moduser);

//       // await for numPLayers to be resolved
//       hostplayer_t = await getPlayerT();
//       let numPlayers = await getNumPlayersT();
//       console.log("Giocatori dopo il completamento della funzione asincrona: ", numPlayers);

//       if (numPlayers === 1) {
//         // === 3
//         hostgame_t = true;
//         // call API to remove hosting user from players queue
//         (async function () {
//           // await rmPlayerName(moduser);

//           await addPlayerT();
//           // hostplayer = await rmPlayer();
//           if (hostplayer_t != undefined) {
//             setTimeout(function () {
//               alert(
//                 `Go to ${hostplayer_t}'s window on your browser and wait to play the tournament (min. 4 players); To host a tournament, go back and select 'Tournament' again`
//               );
//             }, 700);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Tournament started! Go to ${hostplayer_t}'s window to play!`;
//             const chatinstance = new Chat(moduser).getChatInstance();
//             chatinstance.sendWeArePlayingToT(hostplayer_t, moduser);
//           } else {
//             setTimeout(function () {
//               alert(
//                 "You hosted a new Tournament, but you're the only one... waiting for at least 3 players to join"
//               );
//             }, 700);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Waiting for players to start Tournament..`;
//             await addPlayerT();
//             console.log("getPlayerIncimaT: ", await getPlayerT());
//           }
//           gameinfo_t.innerHTML = tmp_gameinfo_t;
//         })();
//       } else {
//         (async function () {
//           await rmPlayerNameT(moduser);
//           let numPlayers = await getNumPlayersT();
//           console.log("numPlayersT: ", numPlayers);
//           if (numPlayers === 0) {
//             // checking if any other player has hosted a game
//             setTimeout(function () {
//               alert(
//                 "You hosted a new Tournament, but you're the only one... waiting for at least 3 players to join"
//               );
//             }, 700);

//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Waiting for players to start Tournament..`;
//             // call API to remove hosting user from players queue
//             console.log("getPlayerMeT: ", await getPlayerT());
//             hostgame_t = true;
//           } else {
//             setTimeout(function () {
//               alert(
//                 "You hosted a new Tournament, but you need at least 3 players to start<br>To join a tournament, go back and select 'Tournament' again"
//               );
//             }, 700);

//             hostplayer_t = await getPlayerT();
//             console.log("getPlayerT: ", hostplayer_t);
//             waitingforplayers.getElementsByClassName(
//               "text-term"
//             )[0].innerHTML = `Play VS youllfindout<br>Go back OR Stay to host`;
//             tmp_gameinfo_t = gameinfo_t.innerHTML;
//             gameinfo_t.innerHTML =
//               gameinfo_t.innerHTML + "<br><br>You vs. youllfindout";
//             hostgame_t = false;
//           }
//           await addPlayerT();
//         })();
//       }
//       history.pushState({}, "", "/pong/playpong");
//     });
// });

// export function displayGameModes() {
//   setTimeout(function () {
//     appnd.style.display = "block";
//   }, 70);
// }
