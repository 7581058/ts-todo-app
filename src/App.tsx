import { useState, useEffect } from 'react';
import { Todo, getTodoList } from './api/api';
import { TodoHeader } from './components/TodoHeader';
import { InputBar } from './components/InputBar';
import { TodoList } from './components/TodoList';
import { ListItem } from './components/ListItem';
import { EditModal } from './components/EditModal';
import { ToDoSpinner } from './components/ToDoSpinner';
import styled from 'styled-components';

export default function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const [editModal, setEditModal] = useState({
    id: '',
    title: '',
    done: false
  });

  useEffect(() => {
    (async () => {
      try {
        setTodoLoading(true);
        const data = await getTodoList();
        setTodoList(data.filter(todo => !todo.done));
        setDoneList(data.filter(todo => todo.done));
      } catch (error) {
        setTodoLoading(false);
        console.error('Error fetching todos:', error);
      } finally {
        setTodoLoading(false);
      }
    })();
  }, []);

  return (
    <TodoWrap>
      <TodoHeader />
      <InputBar addTodo={setTodoList} />
      <ListWrap>
        <TodoList
          listLabel="할 일"
          todolist
          todoList={todoList}
          setTodoList={setTodoList}>
          {todoList.map(todo => (
            <ListItem
              key={todo.id}
              todo={todo}
              setTodo={setTodoList}
              setDone={setDoneList}
              setEditModal={setEditModal}
            />
          ))}
        </TodoList>
        <TodoList
          listLabel="완료"
          donelist
          removebutton
          todoList={doneList}
          setTodoList={setDoneList}>
          {doneList.map(todo => (
            <ListItem
              key={todo.id}
              todo={todo}
              setTodo={setTodoList}
              setDone={setDoneList}
              setEditModal={setEditModal}
            />
          ))}
        </TodoList>
      </ListWrap>
      {editModal.id && (
        <EditModal
          targeTodo={editModal}
          setEditModal={setEditModal}
          setTodo={setTodoList}
          setDone={setDoneList}
        />
      )}
      {todoLoading && <ToDoSpinner />}
    </TodoWrap>
  );
}

const TodoWrap = styled.div`
  width: 1100px;
  margin: 0 auto;
`;
const ListWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
