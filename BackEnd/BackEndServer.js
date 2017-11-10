"use strict"; 
// Dependencies: 
const express = require("express"); 
const bodyParser = require ("body-parser"); 
const open = require ("open"); 

//Express 
const app = express(); 
const port = process.env.port || 3000; //This specifies a port to start listening from//What does the || mean in this case? 
const router = express.Router(); 

//Middleware
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

//Routing 
app.use("/", router); 

/* GET REQUESTS */
//Provide all players on base url of https://localhost:3000/api/player
router.get("/api/player", (req, res) => {
    res.json(players);
});

//Get a specific player based on id provided such as /api/player/2
router.get("/api/player/:id", (req, res) =>{
    const playerID = req.params.id; 
    const currentPlayer = players.find((player) => player.id == playerID); 
    if (currentPlayer){
        res.json(currentPlayer); 
    }else {
        res.sendStatus(404); 
    }
}); 


/* POST REQUESTS */
//Base url, takes a player with the four attributes, checks if its valid and 
//unique, then adds it to the array. 
router.post("/api/player", (req, res) => {
    const postPlayer = req.body; 
    const isValid = isValid(postPlayer) && !players.find((a) => a.id == postPlayer.id); 
    if (isValid){
        players.push(postPlayer); 
        res.send(postPlayer);
    }else{
        res.sendStatus(500); 
    }
}); 

/* PUT/UPDATE REQUESTS*/
// Take a player object at a specific ID url e.g. /api/player/1 Replace contents of the
// player with that id, with the player received, not including the ID.
router.put("/api/player/id:", (req, res) => {
    const dogID = req.params.id; 
    const currentPlayer = players.find((player) => player.id == playerID); 
    if (currentPlayer){
        const putPlayer = req.body;
        const isValid = isValidPlayer(putPlayer); 
        if (isValid){
            currentPlayer.name = putPlayer.name; 
            currentPlayer.age = putPlayer.age; 
            currentPlayer.currentTeam = putPlayer.currentTeam;
            currentPlayer.active = putPlayer.active; 
            res.sendStatus(204); 
        } else{
            res.sendStatus(404); 
        }
    }
}); 

/* DELETE REQUESTS*/
// Doesn't take any information, a delete request at a specific ID endpoint will
// delete the object.
router.delete("/api/player/:id", (req, res) => {
    const playerID = req.params.id;
    const currentPlayer = players.findIndex((player) => player.id == playerID);
    if (currentPlayer !== -1) {
        players.splice(currentPlayer, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

//Mock data instead of database
const players = [{
    id:  1, 
    name: "Kevin Garnett", 
    age: 41,  
    currentTeam: "Minessota Timberwolves"
}
]

//Checks if the object has all the required attributes
function isValidPlayer(player){
    return "id" in player && "name" in player && "age" in player && "currentTeam" in player;
}

//Run server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`)
    }
});
