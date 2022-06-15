import { Flex, Checkbox, Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

export const TodoItem = ({ completed, text, id }) => {
  

  const handleUpdate = async ({_completed, _text}) => {
    const docRef = doc(db, 'list', id)
    try{
      await updateDoc(docRef, {
        completed: _completed !== undefined ? _completed : completed,
        text: _text ?? text
      })
    } catch (err) {
      alert(err)
    }    
  }

  return <Flex>
    <Checkbox isChecked={completed} onChange={() => handleUpdate({ _completed: !completed})}/>
    <Editable ml='6px' defaultValue={text} onSubmit={(newValue) => {
      console.log(newValue)
      return newValue !== text && handleUpdate({ _text: newValue });
    }}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </Flex> 
}