import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',

        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/todos/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,

                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        })
    }
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        })
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const todo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
        };
        console.log(todo);
        axios.post('http://localhost:5000/todos/update/' + this.props.match.params.id, todo)
            .then(res => console.log(res.data))
            .then(window.location = '/')

    }

    render() {
        return (
            <div> 
<h3>Edit Todo Component </h3>
<form onSubmit={this.onSubmit}>
<div className="form-group">
<label>Todo:</label>
<input type="text"
className="form-control"
value={this.state.todo_description}
onChange={this.onChangeTodoDescription}
/>
</div>
<div className="form-group">
<label>Responsible:</label>
<input 
type="text"
className="form-control" 
value={this.state.todo_responsible}
onChange={this.onChangeTodoResponsible}
/>
</div>
<div className="form-group">
<div className="form-check form-check-inline">
<input className="form-check-input" 
type="radio"
name="priorityOptions"
id="priorityLow"
value="Low" checked={this.state.todo_priority === "Low"}
onChange={this.onChangeTodoPriority}
/>
<label className="form-check-label">Low</label>
</div>
<div className="form-check form-check-inline">
<input className="form-check-input"
type="radio"
name="priorityOptions"
id="priorityMedium"
value="Medium"
checked={this.state.todo_priority === "Medium"}
onChange={this.onChangeTodoPriority}
/>
<label className="form-check-label">Medium</label>
</div>
<div className="form-check form-check-inline">
<input className="form-check-input"
type="radio"
name="priorityOptions"
id="priorityHigh"
value="High"
checked={this.state.todo_priority === "High"}
onChange={this.onChangeTodoPriority}
/>
<label className="form-check-label">High</label>
</div>
</div>
<div className="form-group">
<input type="submit" value="Edit Todo" className="btn btn-primary" />
</div>
</form>
</div>

        )
    }
}








//