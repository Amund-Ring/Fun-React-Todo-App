/* eslint-disable */
import { useSpring, animated } from 'react-spring';

const Input = ({
  todoDB, updateTodoDB, input, setInput, showInput,
}) => {
  const emojiParser = text => {
    const emojiRegex = /\p{Extended_Pictographic}/u;

    if (emojiRegex.test(text)) {
      return text.match(emojiRegex)[0];
    }

    return '📝';
  };

  const inputHandler = e => {
    setInput(e.target.value);
  };

  const flashRed = () => {
    document.querySelector('.inputContainer').classList.add('inputContainer--flashRed');
    document.querySelector('.inputContainer__input').classList.add('inputContainer__input--flashRed');
    document.querySelector('.inputContainer__button').classList.add('inputContainer__button--flashRed');
    setTimeout(() => {
      document.querySelector('.inputContainer').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer__input').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer__button').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer').classList.remove('inputContainer--flashRed');
      document.querySelector('.inputContainer__input').classList.remove('inputContainer__input--flashRed');
      document.querySelector('.inputContainer__button').classList.remove('inputContainer__button--flashRed');
    }, 200);
    document.querySelector('.inputContainer').style.transition = 'all 0s';
    document.querySelector('.inputContainer__input').style.transition = 'all 0s';
    document.querySelector('.inputContainer__button').style.transition = 'all 0s';
  };

  const flashGreen = () => {
    document.querySelector('.inputContainer').classList.add('inputContainer--flashGreen');
    document.querySelector('.inputContainer__input').classList.add('inputContainer__input--flashGreen');
    document.querySelector('.inputContainer__button').classList.add('inputContainer__button--flashGreen');
    setTimeout(() => {
      document.querySelector('.inputContainer').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer__input').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer__button').style.transition = 'all 3.5s';
      document.querySelector('.inputContainer').classList.remove('inputContainer--flashGreen');
      document.querySelector('.inputContainer__input').classList.remove('inputContainer__input--flashGreen');
      document.querySelector('.inputContainer__button').classList.remove('inputContainer__button--flashGreen');
    }, 200);
    document.querySelector('.inputContainer').style.transition = 'all 0s';
    document.querySelector('.inputContainer__input').style.transition = 'all 0s';
    document.querySelector('.inputContainer__button').style.transition = 'all 0s';
  };

  const submitHandler = e => {
    e.preventDefault();
    let description = input;

    if (description.length === 0) {
      flashRed();
      return;
    }

    const emoji = emojiParser(description);
    description = description.replace(/\p{Extended_Pictographic}/u, '');
    flashGreen();
    setInput('');

    updateTodoDB([
      ...todoDB, {
        emoji, description, completed: false, id: Date.now(),
      },
    ]);
  };

  const animation = useSpring({
    config: {
      duration: 160,
    },
    opacity: showInput ? 1 : 0,
    transform: showInput ? `translateY(0%)` : `translateY(100%)`,
  });

  return (
    <animated.div style={animation} className="inputContainer__animation">
      <aside className="inputContainer insideInput">
        <form className="inputContainer__form">
          <input onChange={inputHandler} value={input} type="search" className="inputContainer__input insideInput"></input>
          <button onClick={submitHandler} type="submit" className="inputContainer__button insideInput"><span className="inputButton__span insideInput">+</span></button>
        </form>
      </aside>
      <span className={`paddingBlock ${showInput ? '' : 'paddingBlock--hide'}`}></span>
    </animated.div>
  );
};

export default Input;
