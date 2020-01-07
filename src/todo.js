import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import { addTodo } from "./actions/todosActions";
import { deleteTodo } from "./actions/todosActions";
import { changeTodo } from "./actions/todosActions";

class Todo extends Component {
  state = {
    text: "",
    todos: []
  };
  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };
  add = () => {
    let newTodo = {
      id: uuid(),
      text: this.state.text,
      complete: false
    };
    this.setState({
      text: ""
    });
    this.props.addNewTodo(newTodo);
  };
  delete = id => {
    this.props.deleteTodo(id);
  };
  complete = id => {
    this.props.changeTodo(id);
  };
  render() {
    return (
      <div className="app"> <div>
        <div>
        
        <input className="inp"
        
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button className="btn"  type="button" onClick={this.add}>Add</button>

       
        </div>
      
        {this.props.todos.map(el => (
          <div className="scnd">
            
            <button className="btn" onClick={() => this.complete(el.id)}>
              {el.complete ? "undo" : "complete"}
            </button>
            <button className="btn"  onClick={() => this.delete(el.id)}>delete</button>
            <h1 className={el.complete ? "Complete" : "Undo"}>{el.text}</h1>
            </div>
       
         
        ))}
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todosReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addNewTodo: newTodo => dispatch(addTodo(newTodo)),
    deleteTodo: id=> dispatch(deleteTodo(id)),
    changeTodo: id=> dispatch(changeTodo(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);