import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <TodoList title="Список справ" />
    </div>
  );
}

export default App;

//Компонент TodoList.js
import React from "react";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
      justAdded: false,
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  handleAdd = () => {
    const text = this.state.newTask.trim();
    if (text === "") return;

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, text],
      newTask: "",
      justAdded: true,
    }));

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ justAdded: false });
    }, 2000);
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") this.handleAdd();
  };

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>

        <input
          type="text"
          value={this.state.newTask}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Нове завдання"
        />
        <button onClick={this.handleAdd}>Додати</button>

        {this.state.justAdded && (
          <p>Завдання додано!</p>
        )}

        <p>Усього завдань: {this.state.tasks.length}</p>

        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;