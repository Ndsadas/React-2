import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [messageList, setMessageList] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    const author = target.author.value;
    const text = target.text.value;

    setMessageList(state => [
      ...state, {
        id: giveId(state),
        author: author,
        text: text
      }
    ])
  }

  function giveId(add) {
    return add.length ? add[add.length - 1].id + 1 : 0
  }

  function answer() {
    const lastAuthor = messageList[messageList.length - 1];
    if (lastAuthor && lastAuthor.author) {
      setMessageList(state => [
        ...state, {
          id: giveId(state),
          text: `${lastAuthor.author} отправил вам сообщение`
        }
      ])
    }
  }

  useEffect(() => {
    setTimeout(() => {
      answer()
    }, 3000)
  }, [messageList])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="author" placeholder="Name" />
        <input type="text" name="text" placeholder="Text" />
        <input type="submit" value="Отправить" />
      </form>
      {messageList.map((message) => {
        return (
          <div>
            {message.author && <p><span>Автор: </span>{message.author}</p>}
            <p>{message.author && <span>Текс: </span>}{message.text}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
