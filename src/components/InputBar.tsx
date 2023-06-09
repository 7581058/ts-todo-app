import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { Todo, createTodo } from '../api/api';
import styled from 'styled-components';

export const InputBar: React.FC<Iprops> = ({ addTodo }) => {
  const [text, setText] = useState<string>('');

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setText(inputValue);
  };

  const requestCreateTodo = async () => {
    if (!text) return;
    const createdTodo = await createTodo({ title: text });
    if (createdTodo && typeof createdTodo === 'object') {
      addTodo(beforeTodoList => [createdTodo, ...beforeTodoList]);
      setText('');
    }
  };

  const handleKeyDownInput = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== 'Enter') return;
    requestCreateTodo();
  };

  const handleClickCreateTodoButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    requestCreateTodo();
  };

  return (
    <div>
      <TodoFrom>
        <input
          placeholder="할 일을 입력하세요 :D"
          maxLength={24}
          onChange={handleChangeInputValue}
          onKeyDown={handleKeyDownInput}
          value={text}
          type="text"
        />
        <SubmitButton onClick={handleClickCreateTodoButton}>
          <MdAdd />
        </SubmitButton>
      </TodoFrom>
    </div>
  );
};

interface Iprops {
  searchLabel?: string;
  addTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoFrom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 512px;
    height: 40px;
    background: none;
    outline: none;
    border: 1px solid #dedede;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 16px;
    &::placeholder {
      color: #dedede;
    }
  }
`;

const SubmitButton = styled.button`
  background: none;
  outline: none;
  border: none;
  background-color: #37352f;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 20px;
`;
