import { MdClear, MdDragIndicator } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Todo, deleteTodo, editTodo } from '../api/api';
import styled, { css } from 'styled-components';

export const ListItem: React.FC<IProps> = ({
  todo: { id, title, done, createdAt, updatedAt },
  setTodo,
  setDone,
  setEditModal
}) => {
  const handleClickEditTodo = () => {
    setEditModal({
      id,
      title,
      done
    });
  };

  const handleClickDeleteTodo = async () => {
    const result = await deleteTodo(id);
    if (!result) return;
    if (done) {
      setDone(beforeDoneList => beforeDoneList.filter(todo => todo.id !== id));
    } else {
      setTodo(beforeTodoList => beforeTodoList.filter(todo => todo.id !== id));
    }
  };

  const handleClickDoneChange = async () => {
    const editedTodo = await editTodo(id, { title, done: !done });
    if (!editedTodo || typeof editedTodo !== 'object') return;
    if (done) {
      setDone(beforeDoneList => beforeDoneList.filter(todo => todo.id !== id));
      setTodo(beforeTodoList => [...beforeTodoList, editedTodo]);
    } else {
      setTodo(beforeTodoList => beforeTodoList.filter(todo => todo.id !== id));
      setDone(beforeDoneList => [...beforeDoneList, editedTodo]);
    }
  };

  return (
    <TodoListItem
      className="TodoListItem"
      check={done}>
      <ReorderButton className="handle">
        <MdDragIndicator />
      </ReorderButton>
      <div
        className="text"
        onClick={handleClickDoneChange}>
        {title}
      </div>
      <EditButton onClick={handleClickEditTodo}>
        <FiEdit />
      </EditButton>
      <RemoveButton onClick={handleClickDeleteTodo}>
        <MdClear />
      </RemoveButton>
      <ItemInfo>
        <div>생성 : {formatDate(createdAt)}</div>
        <div>수정 : {formatDate(updatedAt)}</div>
      </ItemInfo>
    </TodoListItem>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('ko', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

interface IProps {
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDone: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditModal: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      done: boolean;
    }>
  >;
}

const ReorderButton = styled.div`
  margin-left: -15px;
  color: #37352f;
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  color: #dedede;
  display: none;
  &:hover {
    color: #37352f;
  }
`;

const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #dedede;
  cursor: pointer;
  display: none;
  &:hover {
    color: #37352f;
  }
`;

const TodoListItem = styled.li<{ check: boolean }>`
  position: relative;
  height: 50px;
  padding: 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  .text {
    width: 100%;
    margin-bottom: 10px;
  }
  &:hover {
    ${RemoveButton} {
      display: initial;
    }
    ${EditButton} {
      display: initial;
    }
  }
  .handle {
    ${props =>
      props.check &&
      css`
        color: #dedede;
      `}
  }
  ${props =>
    props.check &&
    css`
      color: #dedede;
      text-decoration: line-through;
    `}
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  color: #dedede;
  gap: 10px;
`;
