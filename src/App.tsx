import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "./store";
import { TodoItem } from "./components/TodoItem";
import { NewTodo } from "./components/NewTodo";
import { Box } from "@chakra-ui/core/dist";
import { ITodo, selectTodosAsArray } from "./modules/todos.module";

const App: React.FC = () => {
  // Selectors
  const items = useSelector<IRootState, ITodo[]>(selectTodosAsArray);

  /**
   * Show items
   */
  return (
    <Box bg="lightblue" mx="auto" maxWidth="md" my={[0, 4]}>
      <div className="App">
        <ul>
          {items.map(todo => (
            <TodoItem item={todo} key={todo.id} />
          ))}
        </ul>
        <NewTodo />
      </div>
    </Box>
  );
};

export default App;
