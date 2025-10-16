import { DragDropContext, Droppable,  type DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atom";
import DragableCard from "./components/DragableCard";


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



function App() {
  const [todo,setTodo] = useRecoilState(todoState);
  const onChange = ({destination,source, draggableId}:DropResult)=>{
    if(!destination) return ;
    // console.log("sprice",source,"des",destination)
  
    setTodo((todos)=>{
      const copyTodos = [...todos];
      copyTodos.splice(source.index,1);
      copyTodos.splice(destination?.index,0,draggableId)
      return copyTodos
    })
  }
  return (
    <DragDropContext onDragEnd={onChange}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board {...magic.droppableProps} ref={magic.innerRef}>
                {todo.map((item, idx) => (
                    <DragableCard todo={item} idx={idx}/>
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
