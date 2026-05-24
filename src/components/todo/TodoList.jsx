// src/components/TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, deleteTask, editTask, toggleComplete }) {
  return (
    <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          index={index}
          deleteTask={deleteTask}
          editTask={editTask} // FIXED: Routed functional reference down to items
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}