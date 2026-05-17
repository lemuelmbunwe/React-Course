import { useState} from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import ChatMessages from './components/ChatMessages.jsx'

import './App.css'

      

      


        

 function App(){
        const [chatMessages, setChatMessages] = useState([{ 
          message: 'hello chatbot',
          sender: 'user',
          id:'id1'
        }, {
          message: 'Hello! How can I help you',
          sender: 'robot',
          id:'id2'
        }, {
          message: 'Spin a coin',
          sender: 'user',
          id:'id3'
        }, {
          message: 'You got heads',
          sender: 'robot',
          id:'id4'
        }]);

        // const [chatMessages, setChatMessages] = array; 
        // const chatMessages = array[0];  //the line above demonstrates array destructing in javascript used a shortcut for this line and the line below this one. here the order in which it is destructured actually matters.
        // const setChatMessages = array[1];

        return(
          <div className="app-component">
            
            <ChatMessages 
            chatMessages = {chatMessages}
            />
            <ChatInput 
            chatMessages = {chatMessages}
            setChatMessages = {setChatMessages}
            />
          </div>
        );
      }

export default App
