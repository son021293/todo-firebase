import { Input, Text, Container, Button, Flex } from '@chakra-ui/react'
import React, { useState, useEffect, useCallback } from 'react'
import {db} from './firebase'
import {collection, query, onSnapshot, addDoc, orderBy, Timestamp} from 'firebase/firestore'
import { TodoItem } from './TodoItem'


const AddNewTodo = () => {
  const [value, setValue] = useState('')
  const handleChange = (event) => setValue(event.target.value)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'list'), {
        text: value,
        completed: false,
        created: Timestamp.now()
      })
      setValue('')
    } catch (err) {
      alert(err)
    }
  }, [value])

  return <Flex mb='10px'>
    <Input
      value={value}
      onChange={handleChange}
      placeholder='New task'
    />

    <Button colorScheme='teal' disabled={!value} onClick={handleSubmit}>
      Add todo
    </Button>
  </Flex>
}

export const TodoList = () => {

  const [list, setList ] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)
  
  useEffect(() => {
    const q = query(collection(db, 'list'), orderBy('created', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      setList(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  },[])

  return <div>
    <Container>
      <Text fontSize='6xl'>Todo List</Text>
      <AddNewTodo/>
      {list.filter(l => showCompleted ? l.completed : !l.completed).map((item, index) => <TodoItem key={item.id} {...item}/>)}

      <Button size='sm' mt='16px' onClick={() => setShowCompleted(prev => !prev)}>{showCompleted ? `Hide` : `Show`} Completed Item</Button>
    </Container>
  </div>
}