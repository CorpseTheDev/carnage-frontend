import { useState } from 'react';

export default function ChatBox({ messages = [], onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{flex:1, overflowY:'auto', border:'1px solid #ccc', padding:'10px'}}>
        {messages.map((msg, i) => (
          <div key={i} style={{marginBottom:'5px'}}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{display:'flex', marginTop:'10px'}}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{flex:1, padding:'5px'}}
          placeholder="Type a message..."
        />
        <button type="submit" style={{padding:'5px 10px'}}>Send</button>
      </form>
    </div>
  );
}