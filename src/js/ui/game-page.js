import React from 'react';
import './../../css/game.css';
import { socketClient, socket as io} from './../socket-client';
import fetcher from './../fetcher';

class GamePage extends React.Component {

  constructor(props){
    super(props);

  }


  render(){
      return (
          <div className="gamePageContainer">
            Gierka strzelanka huehuehue
          </div>
      );
  }
}

export default GamePage;
