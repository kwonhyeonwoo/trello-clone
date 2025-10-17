import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragableCard from './DragableCard';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../atom';
const Container = styled.div`
  width: 100%;
  max-width: 480px;
`;
const Wrapper = styled.div`
  
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
  box-sizing: border-box;
  padding: 20px 10px;
`;

interface IBoardProps {
  todos: string[];
  droppableId:string;
}

const Board = ({todos,droppableId}:IBoardProps) => {
    const [value, setValue] = useState("")
    const [text,setText] = useRecoilState(todoState);
    // const [text, setText] = useState("");
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setText((oldTodo) => {
          const newTodos = [...oldTodo[droppableId], value];
          return {
            ...oldTodo,
            [droppableId]: newTodos,
          };
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
    }
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          name="text"
          placeholder={`Write ${droppableId}`}
        />
      </form>
      <Droppable droppableId={droppableId}>
        {(magic) => (
          <Wrapper {...magic.droppableProps} ref={magic.innerRef}>
            {todos.map((item, idx) => (
              <DragableCard todo={item} idx={idx} />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </Container>
  );
}

export default Board