import React, { Component } from 'react';
import logo from './balllogo.svg';
import './App.css';
import Player from './Player/Player'; 
import ReactTable from 'react-table'

class App extends Component {
  
state = {
    players: [
    {
      id:  "someuniquevalue1", 
      name: "Kevin Garnett", 
      age: 41,
      currentTeam: "Minessota Timberwolves"
    }, {
      id:  "someuniquevalue2", 
      name: "Skylar Diggins", 
      age: 27,
      currentTeam: "Dallas Wings"
   }, {
      id:  "someuniquevalue3", 
      name: "Kyrie Irving", 
      age: 25,  
      currentTeam: "Boston Celtics"
   }       
    ],
  showPlayers: false
  }
  
nameChangedHandler = (event, id) => { 
  //find the player object index via ID
    const playerIndex = this
      .state
      .players
      .findIndex(p => {
        return p.id === id;
      });

    //using spread operator to copy the object, dont want by reference!!
    const player = {
      ...this.state.players[playerIndex]
    };
    //updating name with new value from textbox
    player.name = event.target.value;
    //copying players array, dont want reference!!
    const players = [...this.state.players];
    //Updating old object with new object
    players[playerIndex] = player;
    //updating state with copied array
    this.setState({players: players});
  }

  deletePlayerHandler = (playerIndex) => {
    //copy old array with spread operator
    const players = [...this.state.players];
    //remove player
    players.splice(playerIndex, 1);
    //update state with copied array, with player removed.
    this.setState({players: players});
  }

  togglePlayersHandler = () => {
    //booleans will copy by value
    const doesShow = this.state.showPlayers;

    //update state with opposite of what it was.
    this.setState({
      showPlayers: !doesShow
    });
  }
  

  render(){
//functional component for table.
      const columns = [{
        Header: "Name",
        accessor: "name" //string based value accessor!
      }, {
        Header: "Age",
        accessor:"age", 
      }, {
        Header: "Current Team",
        accessor: "current Team"
      }]; 
  
    let players = null; 
    //show we show the player lists? dependant on state then we will either render the persons or not. 
    if (this.state.showPlayers){
      //map function to turn an array into html
      players =(
        <div>
          {this
          .state
          .players
          .map((player, index) =>{   //.map for each element it executes the same function. 
            return <Player
            click={() => this.deletePlayerHandler(index)}
            name = {player.name}
            age =  {player.age}
            currentTeam = {player.currentTeam}
            key =   {player.id}
            changes={(event) => this.nameChangedHandler(event, player.id)}/>
          })}
        </div>
      ); 
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to your Player Roster</h1>
        </header>
        <ReactTable
        data = {this.state.players}
        columns ={columns} />  
         <Player data ={this.state.data } updateData = {this.updateState} />
         <button  onClick={this.togglePlayersHandler}>Toggle Players</button>
        {players}
      </div>
    );
  
  }}
  
export default App;
