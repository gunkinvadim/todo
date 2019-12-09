import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done, important}) => {
  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <div>
        <h2>{toDo} more to do, {done} done</h2>
        <h2>{important} important</h2>
      </div>
    </div>
  );
};

export default AppHeader;
