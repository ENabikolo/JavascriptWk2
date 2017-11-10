"use strict"; 
const url = "https://any-api.com/nba_com/nba_com/docs/API_Description"; 

//incase of an area. what should be displayed. 
function ifError(er){
    document.getElementById("LeagueIDInput").placeholder ="Enter a valid ID";
    document.getElementById("LeagueIDInput").value = ""; 
}

async function getLeagueDetails(id){
    const response = await fetch(`${url}/${id}`);
    const data = await response.json(); 
    return data;
}

function findLeagueInfo(jsonLeagueObj){
    const leagueObject = {}; 
    leagueObject.teamName = jsonLeagueObj.teamName; 
    leagueObject.id = jsonLeagueObj.id; 
    leagueObject.player= jsonLeagueObj.player; 
    jsonLeagueObj.players.forEach((player) => {
        leagueObject.player += player.player.teamName + " "; 
    }); 
    return leagueObject; 
    
}
function clearData(){
    document.getElementById("leagueDetails").innerHTML = ""; 
}

//export what you want to be displayed. 
function getLeagueAndOutput(id){
    clearData(); 
    const leagueObject =findLeagueInfo(jsonObj); 
    document.getElementById("leagueDetails").innerHTML =` 
    <tr>
        <td>${leagueObject.id}</td>
        <td>${leagueObject.player}</td>
        <td>${leagueObject.teamName}</td>
    </tr>
    `; 

    document.getElementById("leagueIDInput").placeholder = "Enter the League Id";
}; 

