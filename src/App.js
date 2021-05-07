import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import Home2 from "./components/home2"
import store from "./store"
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <Home2 />
    </div>
    </Provider>
  );
}

export default App;
