import "./App.css";
import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { button } from "reactstrap";
import FontAwesome from "react-fontawesome";

function App() {
  const [toDoData, setToDoData] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
  const [update, setUpdate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const localStorageData = localStorage.getItem("todoData");
  console.log(localStorageData,"localStorageData")
  useEffect(()=> {
    if(localStorageData){
      let data = JSON.parse(localStorageData)
      setToDoData(data)
    }
  },[localStorageData])
  const onchangeInput = (e) => {
    const { value } = e.target;
    const data = {
      name: value,
      id: Math.random(),
      done: 0,
    };
    setInputValue(value)
    setUserInput(data);
  };
  const onSaveData = (e) => {
    e.preventDefault()
    setUserInput(null);
    setInputValue('');
    let data = [...toDoData, userInput]
    localStorage.setItem("todoData",JSON.stringify(data))
    setToDoData(data);
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
      localStorage.setItem("todoData",JSON.stringify(updatetodo));
      setToDoData(updatetodo);
      setUpdateInput("");
      setUpdate(null);
    } else {
      setUpdate(data.id);
    }
  };
  const onDelete = (data) => {
    const updatetodo = toDoData.filter((item) => item.id !== data.id);
    localStorage.setItem("todoData",JSON.stringify(updatetodo));
    setToDoData(updatetodo);
  };
  const onUpdateInput = (e) => {
    const { value } = e.target;
    setUpdateInput(value);
  };
  const onDoneTask = (e,data) => {
    const updatetodo = toDoData.map((item) => {
      if (item.id === data.id) {
        item.done = !data.done;
        return item;
      }
      return item;
    });
    localStorage.setItem("todoData",JSON.stringify(updatetodo));
    setToDoData(updatetodo);
  }
  console.log(userInput,"userInput");
  return (
    <div className="App">
      <div className="main-heading">
        <h1>ToDo List</h1>
      </div>
      <div className="main-input-container">
        <form onSubmit={(e) => onSaveData(e)}>
        <input
          name="data"
          placeholder="To Do Item"
          value={inputValue}
          onChange={(e) => onchangeInput(e)}
        />
        <input type="submit" value={"Save"} />
        {/* <button color="primary" onClick={() => onSaveData()}>
          save{" "}
        </button> */}
        </form>
      </div>
      {toDoData.length
        ? toDoData?.map((item, index) => (
            <div key={index} draggable={true} onDragStart={(e)=>console.log(e,"onDragStart",index)} onDragEnd={(e)=>console.log(e,"drag end",index)} className="todo-data-container">
            <div className="todo-data-wraper">
              < >
                {update === item?.id ? (
                  <div className="main-input-container">
                    <input
                      defaultValue={item.name}
                      onChange={(e) => onUpdateInput(e)}
                    />
                    <button color="primary" onClick={() => onUpdateData(item)}>
                      Update{" "}
                    </button>
                  </div>
                ) : (
                  <div className="checkbox-text">
                    <input type="checkbox" checked={item?.done} onClick={(e)=>onDoneTask(e,item)} />
                    <div className={item.done ? "compleat-task" : null}>
                      {item.name}
                    </div>
                  </div>
                )}
              </>

              {update !== item.id && !item?.done? (
                <div className="button-container">
                  <FontAwesome name="edit" onClick={() => onUpdateData(item)} />
                  <FontAwesome name="trash" onClick={() => onDelete(item)} />
                </div>
              ) : null}
            </div>
            </div>
          ))
        : <div className="no-task">No task ToDo!</div>}
    </div>
  );
}

export default App;
