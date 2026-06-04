type TodoCardProps = {
  id: number;
  time: string;
  task: string;
  category: string;
  checked: boolean;
  onCheck: (id: number) => void;
};
const TodoCard = ({
  id,
  time,
  task,
  category,
  checked,
  onCheck,
}: TodoCardProps) => {
  return (
    <>
      <div className="todo-card">
        <h3>{time}</h3>
        <p>{task}</p>
        <span>{category}</span>
        <input type="checkbox" checked={checked} onChange={() => onCheck(id)} />
      </div>
    </>
  );
};

export default TodoCard;
