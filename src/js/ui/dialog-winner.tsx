import React from 'react';

export function WinnerDialog(props: any){
    return(
        <div className="winnerDialogWrapper">
            <div className="winnerDialog">
                <span>Wygrał {props.winnerName}!</span>
                <a href="http://localhost:3000"><button>Strona główna</button></a>
            </div>
        </div>
    );
}
