import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) {
        const [inputText, setInputText] = useState('');

        function saveInputText(event){
          setInputText(event.target.value); 
        }

        async function sendMessage() {
          const newChatMessages = [
              ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            }
          ]

          setChatMessages(newChatMessages);

          const response = await Chatbot.getResponseAsync(inputText);
          
          //display response for chatbot
          setChatMessages([
              ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);


          setInputText('');
        }

        function enter(event) {
          if(event.key === 'Enter'){
            sendMessage();
          }
          if(event.key === 'Escape'){
            setInputText('');
          } 
        }
        return(
          <div className="chat-input-container">

          <input 
            placeholder="Send a message to Chatbot" 
            size="30" 
            onChange={saveInputText}
            value={inputText}
            onKeyDown={enter}
            className="chat-input"
          />

          <button
          onClick={sendMessage}
          className="send-button"
          >Send</button>
          
          </div>
        );
      }