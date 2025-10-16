import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  padding:10px 10px;
  box-sizing: border-box;
  background-color: ${(props)=>props.theme.cardColor};
  border-radius:10px;
  margin-bottom:20px;
`

type Props={
    idx:number;
    todo:string;
}

const DragableCard = ({todo,idx}:Props) => {
    console.log('todos',todo)
  return (
    <Draggable draggableId={todo} index={idx} key={todo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);

