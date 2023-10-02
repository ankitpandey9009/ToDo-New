import React from 'react'

function ToDoList({data,onRemove,onToggle}) {
  return (
    <div className='list-container'>
    <h1>Here's Your List:</h1>
    <ul>
    {
        data.map((item)=>(
        <li key={item.id}>
        <button onClick={()=>onRemove(item.id)}>Remove Activity</button>
        <input type='checkbox' onChange={()=>onToggle(item.id)} checked={item.completed}/>
        {item.completed ? <s>{item.name}</s> : item.name}
        
        </li>
        ))}
        
    </ul>
      
    </div>
  )
}

export default ToDoList
