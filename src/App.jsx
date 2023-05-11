import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Aprender React" },
  { id: 2, text: "Aprender JSX" },
  { id: 3, text: "Aprender JavaScript" },
];

function App() {

  const [todos, setTodos] = useState(initialTodos);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index
    const endIndex = result.destination.index

    const copyArray = [...todos]
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderedItem);

    setTodos(copyArray)
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container">
      <h1>Drag And Drop</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(droppableProvider) => (
            <ul
              className="todo-list"
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {
                todos.map((todo, index) => (
                  <Draggable
                    index={index}
                    key={todo.id}
                    draggableId={`${todo.id}`}
                  >
                    {(draggableProvider) => (
                      <li
                        className="todo-item"
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.dragHandleProps}
                        {...draggableProvider.draggableProps}
                      >
                        {todo.text}
                      </li>
                    )}
                  </Draggable>
                ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
