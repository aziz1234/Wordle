import React, {useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import './App.css';
import 'react-simple-keyboard/build/css/index.css';

function App() {
    
    const [cells, setCells] = useState(new Array(6).fill("").map(e => Array(5).fill("")));
    const [cellStatus, setCellStatus] = useState(new Array(6).fill("").map(e => Array(5).fill("")));
    const wordle = useRef("hello");
    const keyboard = useRef();
    const chance = useRef(0);
    const alphabet = useRef(0);
    
    const onKeyPress = (button) => {
        console.log();
        if(button !== '{bksp}' && button !== '{enter}'){
            if(alphabet.current > 4)
                return;
            setCells(prevCells => {
                prevCells[chance.current][alphabet.current] = button;
                return [...prevCells];
            });
            alphabet.current+=1;
        }
        else if(button === '{enter}') {
            if(alphabet.current > 4)
                checkForMatch();
            else
                window.alert('Not enough Alphabets');
        }
        else if(button === '{bksp}') {
            if(alphabet.current < 1)
                return;
                    setCells(prevCells => {
                        prevCells[chance.current][alphabet.current-1] = '';
                        return [...prevCells];
                    });
                    alphabet.current-=1;
        }
    }

    const checkForMatch = () => {
        let answer = wordle.current;
        let input = [...cells[chance.current]];
        let newTiles = new Array(6).fill("");

        for(let i=0; i<5; i++) {
            if(input[i].toLowerCase() === wordle.current[i]) {
                newTiles[i] = "perfect-match";
                answer.replace(input[i].toLowerCase(),'');
            }
        }

        if(!answer.length) {
            setCellStatus(prevCells => {
                prevCells[chance.current] = newTiles;
                return [...prevCells];
            });
            window.alert('Magnificent !!');
            return;
        }
        
         for(let i=0; i<5; i++) {
             if(input[i].toLowerCase() !== wordle.current[i] && answer.includes(input[i].toLowerCase())) {
                 newTiles[i]= "almost-match";
                 answer.replace(input[i].toLowerCase(),'');
             }
         }

        setCellStatus(prevCells => {
            prevCells[chance.current] = newTiles;
            return [...prevCells];
        })

        if(chance.current < 6) {
            chance.current+=1;
            alphabet.current = 0;
        }
    }
  return (
      <>
      <div className = "heading">
        <span className = "heading-text">Wordle</span>
    </div>
      <div className = "root">
            <div className = "grid">
                {
                    cells.map((row, rIndex) => row.map((cell, cIndex) =>{
                            return (
                            <div key ={`${rIndex}-${cIndex}`} className ="grid-cell" id = {cellStatus[rIndex][cIndex]}>
                                <div className ="grid-text">{cell}</div>
                            </div>)
                        }
                    ))
                }
            </div>
            <Keyboard
                keyboardRef = 
                {r => (keyboard.current = r)}
                onKeyPress = {onKeyPress}
                layout = {{
                    default:[
                'Q W E R T Y U I O P',
                'A S D F G H J K L',
                '{enter} Z X C V B N M {bksp}',
                    ]
                }}
                theme={"hg-theme-default hg-layout-default myTheme"}
                buttonTheme= {[
                  {
                    class: "keyboard-buttons",
                    buttons: "Q W E R T Y U I O P A S D F G H J K L {enter} Z X C V B N M {bksp}"
                  }
                ]}
            />
      </div>
    </>
  );
}

export default App;