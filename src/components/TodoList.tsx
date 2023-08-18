import { ReactSortable, Sortable, Store } from 'react-sortablejs';
import { Todo, deleteTodo, reorderTodoList } from '../api/api';
import styled from 'styled-components';
import {
  MdOutlineFilterTiltShift,
  MdOutlineExpandCircleDown
} from 'react-icons/md';

export const TodoList: React.FC<Iprops> = ({
  listLabel,
  removebutton = false,
  todolist = false,
  donelist = false,
  todoList,
  children,
  setTodoList
}) => {
  const handleSetTodoList = async (
    newState: Todo[],
    _sortable: Sortable | null,
    store: Store
  ) => {
    if (!store.dragging) return;

    const isSame = todoList.every(
      (todo, index) => todo.id === newState[index].id
    );
    setTodoList(newState);
    if (isSame) return;
    const result = await reorderTodoList({
      todoIds: newState.map(item => item.id)
    });
    if (!result) {
      setTodoList(todoList);
    }
  };

  const handleRemoveAll = async () => {
    const idList = todoList.map(todo => todo.id);
    const results = await Promise.all(idList.map(id => deleteTodo(id)));
    if (results.every(result => result)) {
      setTodoList([]);
    }
  };

  return (
    <div>
      <ListContainer>
        <ListTitle>
          <div className="title-icon">
            {todolist && <MdOutlineFilterTiltShift />}
            {donelist && <MdOutlineExpandCircleDown />}
          </div>
          {listLabel && <div>{listLabel}</div>}
          <div className="todo-left">({todoList.length})</div>
          {removebutton && (
            <RemoveButton onClick={handleRemoveAll}>
              완료 전체 삭제
            </RemoveButton>
          )}
        </ListTitle>
        <ReactSortable
          list={todoList}
          setList={handleSetTodoList}
          animation={200}
          group={listLabel}
          easing="ease-out"
          handle=".handle">
          {children}
        </ReactSortable>
      </ListContainer>
    </div>
  );
};

interface Iprops {
  listLabel?: string;
  removebutton?: boolean;
  todolist?: boolean;
  donelist?: boolean;
  children: React.ReactElement[];
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ListContainer = styled.div`
  padding: 0;
  list-style: none;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 30px;
  width: 400px;
`;

const ListTitle = styled.div`
  color: #787774;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  position: relative;
  .title-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .todo-left {
    margin-left: 10px;
  }
`;
const RemoveButton = styled.button`
  width: 120px;
  height: 24px;
  outline: none;
  background-color: #37352f;
  color: #fff;
  border-radius: 8px;
  position: absolute;
  right: 0;
`;
