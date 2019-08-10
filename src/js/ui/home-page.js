import React from 'react';
import './../../css/app.css';
import Rooms from './rooms';
import PlayerRoom from './player-room';
import { socketClient, socket as io} from './../socket-client';
import fetcher from './../fetcher';

//https://colorhunt.co/palette/152950
class HomePage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      playerName: '',
      currentRoom: {players: []},
      isRoomPropertyOfPlayer: false,
      roomsOfUser: []
    }

    this.onCurrentRoomChanged = this.onCurrentRoomChanged.bind(this);
    this.onPlayerNameChange = this.onPlayerNameChange.bind(this);
    this.PlayerNameInput = this.PlayerNameInput.bind(this);
    this.onRoomCreated = this.onRoomCreated.bind(this);
    this.onGameShouldStart = this.onGameShouldStart.bind(this);
  }

  onRoomCreated(roomName){
    console.log(`${roomName} is added to rooms of user !`);
    this.setState((state, props) => ({roomsOfUser: state.roomsOfUser.concat(roomName)}));
  }
  
  onCurrentRoomChanged(newRoom){   
    this.setState({
      currentRoom: newRoom,
      isRoomPropertyOfPlayer: false
    });
    console.log(`rooms of user: ${this.state.roomsOfUser}`);
    for(let roomName of this.state.roomsOfUser){
      if(roomName === newRoom.roomName){
        this.setState({isRoomPropertyOfPlayer: true})
      }
    }
  }

  onGameShouldStart(){
    this.props.onGameShouldStart();
  }

  onPlayerNameChange(event){
    const playerName = event.target.value;
    this.setState({playerName: playerName});
  }

  PlayerNameInput(props){
    return(
      <div className="playerNameContainer">
        <span>
          Twój nick: 
        </span>
        <input type="text" value={this.state.playerName} onChange={this.onPlayerNameChange}/>
      </div>
    );
  }

  render(){
    return (
      <div className="homePageContainer">
        <header>
          <span>( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)</span>
          &nbsp;Strzelanka&nbsp;
          <span> ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)</span>
        </header>
        <section className="mainPartContainer">
          <Rooms 
          onChangedRoom={this.onCurrentRoomChanged} 
          roomName={this.state.currentRoom.roomName}
          onRoomCreated={this.onRoomCreated}/>
          <this.PlayerNameInput/>
          <PlayerRoom 
          roomId={this.state.currentRoom._id} 
          roomName={this.state.currentRoom.roomName}
          playerName={this.state.playerName}
          isRoomPropertyOfPlayer={this.state.isRoomPropertyOfPlayer}
          onGameShouldStart={this.onGameShouldStart}/>
        </section>    
      </div>
    );
  }
}

export default HomePage;
