import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage.jsx'
import './ChatMessages.css'

export function ChatMessages({chatMessages}) { //this is the part of the project responsible to handling the states of the site.
        const chatMessageRef = useRef(null);

        useEffect(()=>{
          const containerElem = chatMessageRef.current;
          if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        },[chatMessages])
        return (
          <div className="chat-section" ref={chatMessageRef}>
            {chatMessages.map((chatMessage) => { //remember to check the use of the .map function
                  return(
                    <ChatMessage 
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                        
                      />
                        )
              })
            }
          </div>
        )
      }

      export default ChatMessages;