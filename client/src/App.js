import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Confetti from 'react-confetti';
import theme from './styles/theme';
import Games from './components/Games';
import Lobby from './components/Lobby';
import ConnectFour from './components/games/ConnectFour';
import TicTacToe from './components/games/TicTacToe';
import Pictionary from './components/games/Pictionary';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Confetti />
      <Typography variant="h2" className={classes.title}>
        Welcome to Kidz Fun App!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Choose a game to play:
      </Typography>
      <Button
        href="/games"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        View Games
      </Button>
    </Container>
  );
}

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
