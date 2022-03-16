import React, {useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import './App.css';
import 'react-simple-keyboard/build/css/index.css';

function App() {
    const [cells, setCells] = useState(Array(30).fill(null));
    const keyboard = useRef();
    const chance = useRef(0);
    const alphabet = useRef(0);
    const onKeyPress = (button) => {
        console.log(button);
        if(button !== '{bksp}' && button !== '{enter}'){
            if(alphabet.current > 4)
                return;
            switch (chance.current) {
                case 0:
                    setCells(prevCells => {
                        prevCells[alphabet.current] = button;
                        return prevCells;
                    });
                    alphabet.current+=1;
            }
        }
    }
  return (
      <div className = "root">
            <div className = "grid">
                {cells.map(cell => 
                    <div className = "grid-cell">
                        <div className = "grid-text">{cell}</div>
                    </div>
                  )}
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
            />
      </div>
  );
}

export default App;