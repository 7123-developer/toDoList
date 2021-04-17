import "./App.css";
import { useState } from "react";

function App() {
  const [toDoData, setToDoData] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [updateInput, setUpdateInput] = useState("")
  const [update, setUpdate] = useState(false)
  const onchangeInput = (e) => {
    const { value } = e.target;
    const data = {
      name: value,
      id: Math.random(),
    };
    setUserInput(data);
  };
  const onSaveData = () => {
    setToDoData([...toDoData, userInput]);
    setUserInput({})
  };
  const onUpdateData = (data) => {
    if (updateInput) {
      const updatetodo = toDoData.map((item) => {
        if (item.id === data.id) {
          item.name = updateInput;
          return item;
        }
        return item;
      });
    setToDoData(updatetodo);
    setUpdateInput("")
    setUpdate(false)
    } else {
      setUpdate(true)
    } 
  };
  const onDelete = (data) => {
    const updatetodo = toDoData.filter((item) => item.id !== data.id);
    setToDoData(updatetodo);
  };
  const onUpdateInput = (e) => {
    const {value} = e.target
    setUpdateInput(value)
  }
  return (
    <div className="App">
      <input
        name="data"
        placeholder="To Do Item"
        onChange={(e) => onchangeInput(e)}
      />
      <button onClick={() => onSaveData()}>save </button>
      {toDoData.length
        ? toDoData.map((item) => (
            <div className="todo-data-container">
              {update ?<input defaultValue={item.name} onChange={(e)=> onUpdateInput(e)} /> :<div onClick={() => onUpdateData(item)}>{item.name}</div>}
              <div className="button-container">
              <button onClick={() => onUpdateData(item)}>update</button>
              <button onClick={() => onDelete(item)}>Delete</button>
              </div>
            </div>
          ))
        : null}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
