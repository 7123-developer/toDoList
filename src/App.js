import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import FontAwesome from "react-fontawesome";

function App() {
  const [toDoData, setToDoData] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
  const [update, setUpdate] = useState(false);
  const onchangeInput = (e) => {
    const { value } = e.target;
    const data = {
      name: value,
      id: Math.random(),
      done: 0,
    };
    setUserInput(data);
  };
  const onSaveData = () => {
    setToDoData([...toDoData, userInput]);
    setUserInput(null);
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
      setUpdateInput("");
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };
  const onDelete = (data) => {
    const updatetodo = toDoData.filter((item) => item.id !== data.id);
    setToDoData(updatetodo);
  };
  const onUpdateInput = (e) => {
    const { value } = e.target;
    setUpdateInput(value);
  };
  const onDoneTask = (e,data) => {
    const {value} = e.target
    const updatetodo = toDoData.map((item) => {
      if (item.id === data.id) {
        item.done = !data.done;
        return item;
      }
      return item;
    });
    setToDoData(updatetodo);
  }
  return (
    <div className="App">
      <div className="main-heading">
        <h1>ToDo List</h1>
      </div>
      <div className="main-input-container">
        <input
          name="data"
          placeholder="To Do Item"
          onChange={(e) => onchangeInput(e)}
        />
        <Button color="primary" onClick={() => onSaveData()}>
          save{" "}
        </Button>
      </div>
      {toDoData.length
        ? toDoData.map((item) => (
            <div className="todo-data-container">
        <div className="todo-data-wraper">
              <div >
                {update ? (
                  <div className="main-input-container">
                    <input
                      defaultValue={item.name}
                      onChange={(e) => onUpdateInput(e)}
                    />
                    <Button color="primary" onClick={() => onUpdateData(item)}>
                      Update{" "}
                    </Button>
                  </div>
                ) : (
                  <div className="checkbox-text">
                    <input type="checkbox" onClick={(e)=>onDoneTask(e,item)} />
                    <div className={item.done ? "compleat-task" : null}>
                      {item.name}
                    </div>
                  </div>
                )}
              </div>

              {update ? null : (
                <div className="button-container">
                  <FontAwesome name="edit" onClick={() => onUpdateData(item)} />
                  <FontAwesome name="trash" onClick={() => onDelete(item)} />
                </div>
              )}
            </div>
            </div>
          ))
        : <div className="no-task">No task ToDo!</div>}
    </div>
  );
}

export default App;
