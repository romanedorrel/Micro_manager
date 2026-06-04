import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { Plus } from "lucide-react";

type TodosType = {
  todo: string;
  completed: boolean;
};
const Today = () => {
  const [todos, setTodos] = useState<TodosType[]>(
    JSON.parse(localStorage.getItem("todos") || "[]"),
  );
  const [value, setValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = () => {
    if (value.trim() === "") return;
    setTodos([...todos, { todo: value, completed: false }]);
    setInputVisible(false);
    setValue("");
  };

  // const handleDelete = (target: number) => {
  //   const updatedList = todos.filter((_, index) => index !== target);
  //   setTodos(updatedList);
  // };

  const handleCheck = (target: number) => {
    const updated = todos.map((todo, index) =>
      index == target ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updated);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div>
        {" "}
        <h2>Today</h2>
        <p>{today}</p>
        <div className="outer-container">
          {todos.map((todo, index) => {
            return (
              <TodoCard
                id={index}
                time={new Date().toLocaleTimeString()}
                task={todo.todo}
                category="General"
                checked={todo.completed}
                onCheck={() => handleCheck(index)}
              />
            );
          })}
          <div>
            <button
              onClick={() => setInputVisible(true)}
              className="add-task-btn"
            >
              <Plus size={14} /> Add Task
            </button>{" "}
            <br />
            {inputVisible && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "12px",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter a task"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="add-task-input"
                />
                <button onClick={handleSubmit} className="add-task-btn">
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Today;
