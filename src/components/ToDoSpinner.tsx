import styled from 'styled-components';

export const ToDoSpinner: React.FC = () => {
  return (
    <SpinnerWrap>
      <div className="spinner"></div>
    </SpinnerWrap>
  );
};

export default ToDoSpinner;

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 200px;
    height: 100px;
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      margin-top: -32px;
      margin-left: -32px;
      border-radius: 50%;
      border: 4px solid #dedede;
      border-top-color: #37352f;
      animation: spinner 0.3s linear infinite;
    }
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
