import logo from './logo.svg';
import './App.css';
import { TodoList } from './TodoList';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <TodoList/>
    </ChakraProvider>
  )
}

export default App;
