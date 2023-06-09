import { useState } from 'react';
import { Todo, editTodo } from '../api/api';
import styled from 'styled-components';

export const EditModal: React.FC<Iprops> = ({
  targeTodo: { id, done, title },
  setEditModal,
  setTodo,
  setDone
}) => {
  const [editText, setEditText] = useState(title);

  const handleChangeInputEditText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setEditText(inputValue);
  };

  const handleClickCancelButton = () => {
    setEditModal({ id: '', done: false, title: '' });
  };

  const handleClickEditSaveButton = async () => {
    const editedTodo = await editTodo(id, {
      title: editText,
      done
    });
    if (!editedTodo || typeof editedTodo !== 'object') return;
    if (done) {
      setDone(beforeDoneList => {
        const editedList = [...beforeDoneList];
        const targetIndex = beforeDoneList.findIndex(
          todo => todo.id === editedTodo.id
        );
        editedList[targetIndex] = editedTodo;
        return editedList;
      });
    } else {
      setTodo(beforeTodoList => {
        const editedList = [...beforeTodoList];
        const targetIndex = beforeTodoList.findIndex(
          todo => todo.id === editedTodo.id
        );
        editedList[targetIndex] = editedTodo;
        return editedList;
      });
    }
    setEditModal({ id: '', done: false, title: '' });
  };

  return (
    <EditBackground className="background">
      <EditForm>
        <h2>수정하기</h2>
        <input
          type="text"
          value={editText}
          onChange={handleChangeInputEditText}
        />
        <div className="btn-wrap">
          <button onClick={handleClickCancelButton}>취소</button>
          <button
            className="btn-edit"
            onClick={handleClickEditSaveButton}>
            수정
          </button>
        </div>
      </EditForm>
    </EditBackground>
  );
};

interface Iprops {
  targeTodo: {
    id: string;
    title: string;
    done: boolean;
  };
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

const EditBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.3);
`;

const EditForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    gap: 40px;
    .btn-edit {
      background-color: #37352f;
      color: #fff;
    }
  }
  h2 {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    text-align: left;
    padding: 0.5rem;
    color: #37352f;
    font-size: 16px;
    margin-bottom: 20px;
  }
  input {
    width: 100%;
    font-size: 1rem;
    color: #37352f;
    height: 45px;
    padding: 0.5rem;
    outline: none;
    border: 2px solid #dedede;
    border-radius: 8px;
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #37352f;
    width: 100px;
    height: 40px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;
