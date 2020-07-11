import React, { Component } from 'react';
import './App.css';

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleReg } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
	persons: [],
	editing: false,
	personAge: '',
	date: '',
  };
  
  async componentDidMount() {
    const response = await fetch('/api/user');
	const json = await response.json();
	this.setState({ persons: json });
	
	const d = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];
	var date = d.getDate(); //Current Date
    var month = monthNames[d.getMonth()] //Current Month
    var year = d.getFullYear(); //Current Year
	
	this.setState({
      //Setting the value of the date time
      date:
         month + ' ' + + date + ', ' + year,
    });
  }
  
  async getProducts() {
    const response = await fetch('/api/user');
	const json = await response.json();
	this.setState({ persons: json });
  }
  
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
	this.getProducts();
	this.setState({ post: '' });
  };
  
  onClick = async e => {
    e.preventDefault();
    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.currentTarget.value }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
	this.getProducts();
	};
	
	onEdit = async e => {
		e.preventDefault();
		this.setState({ id: e.currentTarget.value });
		
		const response = await fetch('/api/getById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.currentTarget.value }),
    });
	const json = await response.json();
	this.setState({ personAge: json });
	this.state.personAge.map(personage =>  this.setState({ personAge: personage.todo }));
	this.setState({ editing: true });
	}
	
	 handleUpdate = async e => {
    e.preventDefault();
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.state.id, personAge: this.state.personAge }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
	this.getProducts();
	this.setState({ post: '',personAge: '' ,editing: false});
  };
  
    onDone = async e => {
    e.preventDefault();
    const response = await fetch('/api/done', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.currentTarget.value }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
	this.getProducts();
	};
  
      onUnDone = async e => {
    e.preventDefault();
    const response = await fetch('/api/undone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.currentTarget.value }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
	this.getProducts();
	};
  
render() {
	const editing = this.state.editing;
    return (
	
	<div class="container">
	
	
      <div class="header">
	  <div>
	  <FontAwesomeIcon icon={faBars} size="1x" style={{ color: '#cfc9cc', margin: '25px'}}/>
			
		</div>
		<p class="head">My To-Dos</p>
			
			<p class="date">{this.state.date}</p>
			
		</div>
			
		<div class="content">
		<br/>
       <table class="sturdy">
	   
		<tbody>
        { this.state.persons.map(person => 
          <tr key={person.id}>
		  <td>
		   {
					  person.complete ? (
					  <button class="completeButton" value={person.id} onClick={this.onUnDone}><span><FontAwesomeIcon icon={faCheckCircle} size="lg" style={{ color: '#33cc33'}}/></span></button>
					  ) : (
					  <button class="incompleteButton" value={person.id} onClick={this.onDone}><span><FontAwesomeIcon icon={faCheckCircleReg} size="lg" style={{ color: '#33cc33'}}/></span></button>
					  )
				  }
		  </td>
            <td>{person.todo}</td>
            <td>
			 <button class="editButton" value={person.id} onClick={this.onEdit}><FontAwesomeIcon icon={faEdit} size="lg" style={{ color: '#cc66ff'}}/></button>
              <button class="deleteButton" value={person.id} onClick={this.onClick}><FontAwesomeIcon icon={faTrashAlt} size="lg" style={{ color: '#ff0066'}}/></button>
				 
			  </td>
            </tr>
          )}
		  </tbody>
        </table>
      </div> 
		
     <div class="footer"> 
	<br/>
		{ 
            editing  ? (
			<div>
			
        <form onSubmit={this.handleUpdate}>
          
          <input
            type="text"
           value={this.state.personAge}
            onChange={e => this.setState({ personAge: e.target.value })}
          />
          <button class="updateButton" type="submit"><FontAwesomeIcon icon={faSyncAlt} size="2x" style={{ color: '#cc00cc'}} transform="right-0.5 grow-2.5"/></button>
		  <button class="cancelButton" onClick={() => this.setState({ editing: false})}><FontAwesomeIcon icon={faTimesCircle} size="2x" style={{ color: '#cc00cc'}} transform="right-12 grow-3"/></button>
        </form>
        </div>	
			) : (
			<div>
			
        <form onSubmit={this.handleSubmit}>
          
          <input
            type="text"
			placeholder="Add new todo..."
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          required/>
          <button class="submitButton" type="submit"><FontAwesomeIcon icon={faPlusCircle} size="3x" style={{ color: '#cc00cc'}} transform="right-12"/></button>
        </form>
        </div>
			)
			}
	  </div>
	  
	  </div>
    );
  }
}

export default App;