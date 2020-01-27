import React, {useEffect} from "react";
import {fetchTodos, ITodo} from "./modules/todos.module";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "./store";
import {TodoItem} from "./components/TodoItem";
import {NewTodo} from "./components/NewTodo";
import {Box} from "@chakra-ui/core/dist";

const App: React.FC = () => {
  // Util
  const dispatch = useDispatch();
  // Selectors
  const isLoadingItems = useSelector<IRootState, boolean>(state => state.todos.isLoadingItems);
  const items = useSelector<IRootState, ITodo[]>(state => state.todos.items);

  /**
   * On mount, fetch some todos
   */
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  /**
   * Loading
   */
  if (isLoadingItems) {
    return <div>LOADING!</div>;
  }

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
