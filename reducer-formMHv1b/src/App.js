import React, { useReducer } from 'react';
import './App.css';

const initialState = {
  name: '',
  email: '',
  department: '',
  amAvailability: false,
  pmAvailability: false,
  issue: '',
  message: '',
  newsletter: false,
  tos: false,
  gdpr: false,
  isValid: false,
  status: {
    name: '',
    email: '',
    department: '',
    availability: '',
    issue: '',
    message: '',
    legal: ''
  }
}

const getStatusClassName = status => {
  if (status === '') return 'untouched'
  else if (status === 'ok') return 'valid'
  else return 'invalid'
}

const computeStatus = (state) => {
  const status = {...initialState.status}

  // Name
  if (state.name.length > 0 || state.status.name != '') {
    if (state.name.length > 3) {
      status.name = 'ok'
    } else {
      status.name = 'Name should have at least 4 letters!'
    }
  }

  // E-Mail
  if (state.email.length > 0 || state.status.email != '') {
    if (state.email.includes('@') && state.email.includes('.')) {
      status.email = 'ok'
    } else {
      status.email = ''

      if (!state.email.includes('@')) {
        status.email += 'Email address needs to contain an "@" sign!'
      }

      if (!state.email.includes('.')) {
        status.email += 'Email address needs to contain a "."!'
      }

    }
  }

  // Department
  if (state.department != '' || state.status.department != '') {
    status.department = 'ok'
  }

  // Availability
  if (state.amAvailability || state.pmAvailability || state.status.availability != '') {
    if (state.amAvailability || state.pmAvailability) {
      status.availability = 'ok'
    } else {
      status.availability = 'You need to select at least one time at which you are available!'
    }
  }

  // Issue
  if (state.issue != '' || state.status.issue != '') {
    if (state.issue != '' && state.issue != 'Complaint') {
      status.issue = 'ok'
    } else if (state.issue === '') {
      status.issue = "You must select an issue type"
    } else if (state.issue === 'Complaint'){
      status.issue = "Sorry, we don't process complaints!"
    }
  }

  // Message
  if (state.message.length > 0 || state.status.message != '') {
    if (state.message.length > 20) {
      status.message = 'ok'
    } else {
      status.message = 'Message should contain at least 20 letters!'
    }
  }

  // Legal
  if (state.tos || state.gdpr || state.newsletter || state.status.legal != '') {
    if (state.tos && state.gdpr) {
      status.legal = 'ok'
    } else {
      status.legal = 'You need to accept the TOS and GDPR'
    }
  }

return status

}

const isValid = (state) => {
  return Object.values(state.status).every(status => status === 'ok')
}

function formReducer(state, action) {
  let newState = {}

  switch (action.type) {
    case 'CHANGE':
      newState = {
        ...state,
        [action.name]: action.value
      }
      newState.status = computeStatus(newState)
      newState.isValid = isValid(newState)

      return newState;
    case 'SUBMIT':
      return {
        ...initialState,
      }
    default:
      return state;
  }
}

function App() {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const changeHandler = (event) => {
    const { target } = event
    const { tagName, type, name } = target;

    let inputValue = ''

    if (tagName === "INPUT") {
      switch (type) {
        case "text":
          inputValue = target.value
          break;
        case "radio":
          inputValue = target.value
          break;
        case "checkbox":
          inputValue = target.checked
          break;

        default:
          break;
      }
    } else if (tagName === "TEXTAREA") {
      inputValue = target.value
    } else if (tagName === "SELECT") {
      inputValue = target.value
    }

    dispatch({
      type: 'CHANGE',
      name,
      value: inputValue,
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SUBMIT'
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Contact Form</h1>
        <form>
          
          <div className={getStatusClassName(formState.status.name)}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" onChange={changeHandler} value={formState.name}></input>
            <p className="error">{!['','ok'].includes(formState.status.name) ? formState.status.name : ''}</p>
          </div>

          <div className={getStatusClassName(formState.status.email)}>
            <label htmlFor="email">E-Mail: </label>
            <input type="text" name="email" onChange={changeHandler} value={formState.email}></input>
            <p className="error">{!['','ok'].includes(formState.status.email) ? formState.status.email : ''}</p>
          </div>

          <div className={getStatusClassName(formState.status.department)}>
            <label htmlFor="department">Department</label>
            <div>
              <label>Sales: </label>
              <input type="radio" name="department" value="Sales" onChange={changeHandler} checked={formState.department === "Sales"} ></input>
            </div>
            <div>
              <label>Admin: </label>
              <input type="radio" name="department" value="Admin" onChange={changeHandler} checked={formState.department === "Admin"} ></input>
            </div>
            <div>
              <label>Development: </label>
              <input type="radio" name="department" value="Development" onChange={changeHandler} checked={formState.department === "Development"} ></input>
            </div>
          </div>

          <div className={getStatusClassName(formState.status.availability)}>
            <label htmlFor="availability" onChange={changeHandler}>Availability</label>
            <div>
              <label htmlFor="amAvailablility">AM</label>
              <input type="checkbox" name="amAvailability" value="AM" onChange={changeHandler} checked={formState.amAvailability}></input>
            </div>
            <div>
              <label htmlFor="pmAvailability">PM</label>
              <input type="checkbox" name="pmAvailability" value="PM" onChange={changeHandler} checked={formState.pmAvailability}></input>
            </div>
            <p className="error">{!['','ok'].includes(formState.status.availability) ? formState.status.availability : ''}</p>
          </div>

          <div className={getStatusClassName(formState.status.issue)}>
            <label htmlFor="issue">Issue: </label>
            <select name="issue" value={formState.issue} onChange={changeHandler}>
              <option value="">Please select an issue type</option>
              <option value="Request">Request</option>
              <option value="Support">Support</option>
              <option value="Comment">Comment</option>
              <option value="Compliment">Compliment</option>
              <option value="Complaint">Complaint</option>
              <option value="Other">Other</option>
            </select>
            <p className="error">{!['','ok'].includes(formState.status.issue) ? formState.status.issue : ''}</p>
          </div>

          <div className={getStatusClassName(formState.status.message)}>
            <p>Message: </p>
            <textarea name="message" value={formState.message} onChange={changeHandler}></textarea>
            <p className="error">{!['','ok'].includes(formState.status.message) ? formState.status.message : ''}</p>
          </div>

          <div className={getStatusClassName(formState.status.legal)}>
            <div>
              <label htmlFor="newletter">Subscribe to newsletter: </label>
              <input type="checkbox" name="newsletter" onChange={changeHandler} checked={formState.newsletter}></input>
            </div>
            <div>
              <label htmlFor="tos">Accept TOS: </label>
              <input type="checkbox" name="tos" onChange={changeHandler} checked={formState.tos}></input>

            </div>
            <div>
              <label htmlFor="gdpr">Acknowledge GDPR: </label>
              <input type="checkbox" name="gdpr" onChange={changeHandler} checked={formState.gdpr}></input>
            </div>
            <p className="error">{!['','ok'].includes(formState.status.legal) ? formState.status.legal : ''}</p>
          </div>

          <button onClick={submitHandler} disabled={!formState.isValid}>Submit</button>
        </form>

      </main>
    </div>
  );
}

export default App;
