import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/theme';
import HomePage from './components/HomePage';
import Games from './components/Games';
import Lobby from './components/Lobby';
import ConnectFour from './components/games/ConnectFour';
import TicTacToe from './components/games/TicTacToe';
import Pictionary from './components/games/Pictionary';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/games" component={Games} />
            <Route path="/games/:game/lobby" component={Lobby} />
            <Route path="/games/connect-four/play" component={ConnectFour} />
            <Route path="/games/tic-tac-toe/play" component={TicTacToe} />
            <Route path="/games/pictionary/play" component={Pictionary} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
