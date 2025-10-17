import { DragDropContext,  type DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atom";
import Board from "./components/Board";


const Wrapper = styled.div``


const Boards = styled.div`
  display:flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
`




function App() {
  const [todo,setTodo] = useRecoilState(todoState);
  const onChange = (info:DropResult)=>{
    const {destination,source,draggableId} = info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      setTodo((allBoards)=>{
        const copyBoard = [...allBoards[source.droppableId]];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination?.index, 0, draggableId);
        return{
          ...allBoards,
          [source.droppableId]:copyBoard
        }
      })
    }
    if(destination?.droppableId !== source.droppableId){
        setTodo((oldTodos)=>{
          const sourceBoard = [...oldTodos[source.droppableId]];
          const destinationBoard = [...oldTodos[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, draggableId);
          return{
            ...oldTodos,
            [source.droppableId]:sourceBoard,
            [destination.droppableId]:destinationBoard
          }
        })
    }
   }
  return (
    <DragDropContext onDragEnd={onChange}>
      <Wrapper>
        <Boards>
          {Object.keys(todo).map((board) => (
            <Board todos={todo[board]} droppableId={board} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App
