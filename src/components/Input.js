/* eslint-disable */

const Input = ({todoDB, updateTodoDB, input, setInput}) => {

  
  const emojiParser = (text) => {
    const emojiRegex = /\p{Extended_Pictographic}/u;
    
    if (emojiRegex.test(text)) {
      return text.match(emojiRegex)[0];
    }
    
    return '📝';
  }
  
  const inputHandler = (e) => {
    setInput(e.target.value);
  }

  const flashRed = () => {
    document.querySelector('.inputContainer').classList.add('inputContainer--flashRed');
    document.querySelector('.inputContainer__input').classList.add('inputContainer__input--flashRed');
    document.querySelector('.inputContainer__button').classList.add('inputContainer__button--flashRed');
    setTimeout(() => {
      document.querySelector('.inputContainer').style.transition = "all 3.5s";
      document.querySelector('.inputContainer__input').style.transition = "all 3.5s";
      document.querySelector('.inputContainer__button').style.transition = "all 3.5s";
      document.querySelector('.inputContainer').classList.remove('inputContainer--flashRed');
      document.querySelector('.inputContainer__input').classList.remove('inputContainer__input--flashRed');
      document.querySelector('.inputContainer__button').classList.remove('inputContainer__button--flashRed');


    }, 200);
    document.querySelector('.inputContainer').style.transition = "all 0s";
    document.querySelector('.inputContainer__input').style.transition = "all 0s";
    document.querySelector('.inputContainer__button').style.transition = "all 0s";
  }
  

  const submitHandler = (e) => {
    e.preventDefault();
    let description = input;
    const emoji = emojiParser(description);
    description = description.replace(/\p{Extended_Pictographic}/u, '');
    setInput('');
    flashRed();

    updateTodoDB([
      ...todoDB, {emoji: emoji, description: description, completed: false, id: Date.now()}
    ]);
  }

  return (
    <aside className="inputContainer">
      <form className="inputContainer__form">
        <input onChange={inputHandler} value={input} type="text" className="inputContainer__input"></input>
        <button onClick={submitHandler} type="submit" className="inputContainer__button">+</button>
      </form>
    </aside>
  );
};

export default Input;
