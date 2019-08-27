import React from 'react';
import './../../css/app.css';
import './../../css/dialog.css'

export default class Dialog extends React.Component {

  constructor(props){
    super(props);

  }

  render(){
      return (
      <div className="dialogWrapper">
          <div className="dialog">
             {this.props.message}
          </div>
      </div>
      );
  }
}
  
