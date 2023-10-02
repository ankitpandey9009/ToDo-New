import React, { useState, useEffect } from 'react';
import ToDoList from './ToDoList';

const getLocalItems = () =>{
  let listData = localStorage.getItem('listData');
  console.log(listData);

  if(listData){
    return JSON.parse(localStorage.getItem('listData'));
    }
    else {
      return [];
    }}

  function ToDoForm() {
  const [activity, setActivity] = useState('');
  const [listData, setListData] = useState(getLocalItems());
  const [error, setError] = useState('');

  // Save data to local storage whenever listData changes
  useEffect(() => {
    localStorage.setItem('listData', JSON.stringify(listData));
  }, [listData]);

  function addActivity() {
    if (activity.trim() === '') {
      setError('Field cannot be blank');
      return;
    }

    const newActivity = {
      id: Date.now(),
      name: activity,
      completed: false,
    };

    setListData((prevListData) => [...prevListData, newActivity]);
    setActivity('');
    setError('');
  }

  const handleChange = (e) => {
    setActivity(e.target.value);
    setError('');
  }

  const removeActivity = (id) => {
    setListData((prevListData) => prevListData.filter((item) => item.id !== id));
  }

  const removeAllActivity = () => {
    setListData([]);
  }

  const toggleCompletion = (id) => {
    setListData((prevListData) =>
      prevListData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <div className="form-container">
      <input
        value={activity}
        type="text"
        className="form-input"
        placeholder="Add todo"
        onChange={handleChange}
      />
      <button onClick={addActivity}>Add</button>
      {error && <p className="error-message">{error}</p>}
      {listData.length > 0 && (
        <button onClick={removeAllActivity}>Remove All</button>
      )}
      <ToDoList data={listData} onRemove={removeActivity} onToggle={toggleCompletion} />
    </div>
  );
}

export default ToDoForm;
