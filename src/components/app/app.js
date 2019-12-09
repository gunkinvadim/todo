import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {

  constructor() {
    super()

    this.maxId = 100

    this.state = {

      term: '',

      filter: 'all', // all, active, done

      todoData: [
        this.createTodoItem('Drink Coffe'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ]
    }

    this.deleteItem = (id) => {
      const idx = this.state.todoData.findIndex((el) => el.id === id)
      this.setState(({todoData}) => {
        
        const newArray = [...todoData]
        newArray.splice(idx, 1)
        return { todoData: newArray }
      })
    }

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text)
      this.setState(({todoData}) => {
        const newArray = [...todoData, newItem]
        return { todoData: newArray }
      })
    }

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      })
      
    }

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
      })
    }

    this.onSearchChange = (term) => {
      this.setState({ term })
    }

    this.search = (items, term) => {
      if (term.length === 0) {
        return items
      }

      return items.filter((item) => {
        return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1
      })
    }

    this.onFilterChange = (filter) => {
      this.setState({ filter })
    }

    this.filter = (items, filter) => {
      switch(filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter((item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
        default:
          return items
      }
    }
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      dole: false,
      id: this.maxId++
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  render() {
    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(
      this.search(todoData, term), filter
    )

    const doneCount = todoData.filter(
      (el) => el.done
    ).length

    const todoCount = todoData.filter(
      (el) => !el.done
    ).length

    const importantCount = todoData.filter(
      (el) => el.important && !el.done
    ).length

    return (
      <div className="todo-app">
        <AppHeader
          toDo={todoCount}
          done={doneCount}
          important={importantCount}
        />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>
  
        <TodoList
          todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
};