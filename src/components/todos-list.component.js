import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
<td>{props.todo.todo_description}</td>
<td>{props.todo.todo_responsible}</td>
<td>{props.todo.todo_priority}</td>
<td>{props.todo.todo_completed}</td>
<td>
<Link to={'/edit/'+props.todo._id}>edit | </Link>
<a href="#" onClick={() =>{
props.deleteTodo(props.todo._id)
}}>delete</a>
</td>
</tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/todos')
            .then(res => {
                this.setState({ todos: res.data });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTodo(id) {
        axios.delete("http://localhost:5000/todos/" + id)
            .then(res => console.log(res.date));
        this.setState({
            todos: this.state.todos.filter(el => el._id !== id)
        })
    }
    todoList() {
        return this.state.todos.map(currentTodo => {
            return <Todo todo={currentTodo}
			deleteTodo={this.deleteTodo} key={currentTodo._id}/>
        })
    }
    render() {
        return (
            <div>
<h3> ToDos</h3>
<table className="table">
<thead className="thead-light">
<tr>
<th>Description</th>
<th>Responsible</th>
<th>Priority</th>
</tr>
</thead>
<tbody>
{ this.todoList()}
</tbody>
</table>
</div>
        )
    }
}