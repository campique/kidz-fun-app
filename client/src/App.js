import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/theme';
import HomePage from './components/HomePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* Andere routes hier toevoegen wanneer je ze maakt */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
