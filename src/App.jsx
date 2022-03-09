import React, {useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import './App.css';
import 'react-simple-keyboard/build/css/index.css';

function App() {
    const keyboard = useRef();
    const onKeyPress = (button) => {
        console.log(button);
    }
  return (
      <div>
            <Keyboard
                keyboardRef = 
                {r => (keyboard.current = r)}
                onKeyPress = {onKeyPress}
            />
      </div>
  );
}

export default App;