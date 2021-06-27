/* eslint-disable */

import './App.scss';
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header'; // eslint-disable-line no-unused-vars
import Welcome from './components/Welcome'; // eslint-disable-line no-unused-vars
import Input from './components/Input'; // eslint-disable-line no-unused-vars
import Todolist from './components/Todolist'; // eslint-disable-line no-unused-vars

const App = () => {
  const [showWelcome, toggleWelcome] = useState(false);
  const [todoDB, updateTodoDB] = useState([]);
  const [input, setInput] = useState('');
  const [showButton, toggleShowButton] = useState(true);
  const [showInput, toggleShowInput] = useState(false);

  const getFromLocalStorage = () => {
    if (localStorage.getItem('todoDB') === null) {
      localStorage.setItem('todoDB', JSON.stringify(todoDB));
    } else {
      updateTodoDB(JSON.parse(localStorage.getItem('todoDB')));
    }
  };

  const saveToLocalstorage = () => {
    localStorage.setItem('todoDB', JSON.stringify(todoDB));
  };

  const showInputContainer = () => {
    toggleShowButton(false);
    toggleShowInput(true);
  }

  const hideInputContainer = () => {
    toggleShowButton(true);
    toggleShowInput(false);
  }

  const handleClick = e => {
    if (!e.target.classList.contains('insideInput')) {
      hideInputContainer();
    }
  }

  useEffect(() => {
    getFromLocalStorage();
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  
  useEffect(() => {
    saveToLocalstorage();
    toggleWelcome(todoDB.length === 0);
  });

  return (
    <main className="App">
      <section className="contentContainer">
        <Header />
        <Welcome showWelcome={showWelcome} />
        <Todolist todoDB={todoDB} updateTodoDB={updateTodoDB} toggleWelcome={toggleWelcome} />
        <Input
          todoDB={todoDB}
          updateTodoDB={updateTodoDB}
          input={input}
          setInput={setInput}
          showInput={showInput}
        />
      </section>
      <button onClick={showInputContainer} className={`showInputButton ${showButton ? '' : 'showInputButton--hide'}`}><span className="showInputButton__span">+</span></button>
    </main>
  );
};

export default App;
