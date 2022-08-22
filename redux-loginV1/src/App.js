import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import ChangeUserData from './components/ChangeUserData';
import { useSelector, useDispatch } from 'react-redux'

function App() {

  // Using state.isLoggedIn wouldn't make the component rerender. useSelector is needed for that!
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const isChangingUserData = useSelector(state => state.isChangingUserData)
  const username = useSelector(state => state.username)

  const dispatch = useDispatch()

  const handleChangeUserData = () => {
    dispatch({
      type: 'TOGGLE_CHANGE_USER_DATA'
    })
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <div>Hallo {username}!
            <Logout />
          </div>
          <div>
            <button onClick={handleChangeUserData}>Change User Data</button>
            {isChangingUserData && <ChangeUserData />}
          </div>
        </div>
      ) : <Login />}
    </div>
  );
}

export default App;

/* OBSOLETE:
// const mapStateToProps = (state, ownProps) => {
//   return {
//     isLoggedIn: state.isLoggedIn
//   }
// }

// export default connect(mapStateToProps)(App)
*/
