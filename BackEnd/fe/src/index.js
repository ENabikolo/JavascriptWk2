//Imports
import { getPlayers, deletePlayer, createPlayer } from "./api/playerApi.js"

//Ran when they select an X on a table element, will submit a DELETE request and remove them from the table.
function deletePlayerFromTableAndDB(event) {
    const element = event.target;
    event.preventDefault();
    deletePlayer(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

//Given an array of players, output them all to the table and apply delete events.
function loadPlayersToScreen(playerList) {
    //output players to table
    let playersBody = "";
    playerList.forEach((player) => {
        playersBody += createTableDataFromPlayer(player);
    });
    document.getElementById("playerDetails").innerHTML = playersBody;
    applyDeleteEvents();
}

//Go through all the elements in the table that have the deleteplayer tag, give them the event to delete themselves.
function applyDeleteEvents() {
    //find all elements that have the classname "deleteplayer" and give them onclick events to delete them.
    const deleteLinks = document.getElementsByClassName("deletePlayer");
    Array.from(deleteLinks, (link) => {
        link.onclick = deletePlayerFromTableAndDB;
    });
}

//Given a player object, create HTML for it in the table.
function createTableDataFromPlayer({ _id, name, age, team }) {
    return `
    <tr>
        <td> <a href = "#" data-id="${_id}" class="deleteplayer"> X </a> </td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${team}</td>
    </tr>`
}

//Get player inputs from text boxes, then clear the text boxes, check if the inputs were all filled, submit a post request, get the result, append result to page.
function createAndAppendplayer() {
    const playerInput = getplayerFromInputs();
    clearInputs();
    if (isValidplayer(playerInput)) {
        Promise.resolve(createplayer(playerInput)).then((newplayer) => {
            document.getElementById("playerDetails").innerHTML += createTableDataFromPlayer(newplayer);
            applyDeleteEvents();
        });
    }
}

//Checks if a player has all the valid fields
function isValidplayer(player) {
    return player.name && player.age && player.team;
}

//Clears the textboxes
function clearInputs() {
    document.getElementById("inputplayerName").value = "";
    document.getElementById("inputplayerAge").value = "";
    document.getElementById("inputplayerteam").value = "";
}

//Returns an object comprised of the data from the textboxes
function getplayerFromInputs() {
    return {
        name: document.getElementById("inputplayerName").value,
        age: document.getElementById("inputplayerAge").value,
        team: document.getElementById("inputplayerteam").value
    }
}

//Expose the createAndAppendplayer function for the button, otherwise it's stuck in here because of modules.
window.createAndAppendplayer = createAndAppendplayer;

//On page load, load all players.
window.onload = function () {
    //load players into table, including delete events set to each element.
    const playerList = getPlayers().then(loadPlayersToScreen);
}



