import React from 'react'
import MiniNavbar from '../../components/Others/MiniNavbar'
const MessagePage = () => {
  return (
    <div>
        <div className="min-h-screen bg-black flex flex-col items-center gap-8 p-10">
        <MiniNavbar /> {/* MiniNavbar at the top */} 
        <h1>Conversations</h1>  
        </div>

        
    </div>
  )
}

export default MessagePage