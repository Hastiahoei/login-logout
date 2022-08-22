import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import {useStore, connect} from 'react-redux'

function App({isLoggedIn}) {

  const store = useStore()

  const state = store.getState()

  return (
    <div className="App">
      {isLoggedIn ? <div>Hallo {state.username} <Logout /></div> : <Login />}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(App)

// export default App;
