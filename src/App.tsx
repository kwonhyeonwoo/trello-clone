import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Wrapper = styled.div``


const Boards = styled.div`
  display:flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
`

const Board = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: ${(props) => props.theme.boardColor};
  min-height:200px;
  box-sizing: border-box;
  padding: 20px 10px;
`;

const Card = styled.div`
  padding:10px 10px;
  box-sizing: border-box;
  background-color: ${(props)=>props.theme.cardColor};
  border-radius:10px;
  margin-bottom:20px;
`

const contents = ["a","b","c","d"]

function App() {
  const onChange = ()=>{}
  return (
    <DragDropContext onDragEnd={onChange}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board {...magic.droppableProps} ref={magic.innerRef}>
                {contents.map((item, idx) => (
                  <Draggable draggableId={item} index={idx}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {item}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App
