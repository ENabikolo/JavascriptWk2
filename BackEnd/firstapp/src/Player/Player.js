import React, {Component} from 'react';

import './Player.css';


class Player extends Component{
  constructor(props){
    super(props);
    this.state ={
      data:"Initial data..."
    }
    this.updateState = (e) =>{
      e.preventDefault();
      this.setState({
        data: "players"
      });
    }
  }
  render(){
    return (
      
        <div className="Player">
            <div id ="grid"></div>
            <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
    )
};
}
  
export default Player;


      