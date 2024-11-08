import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: theme.spacing(4),
  },
  title: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    color: '#ffffff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    marginBottom: theme.spacing(4),
  },
  button: {
    borderRadius: 30,
    fontSize: '1.2rem',
    padding: theme.spacing(2, 4),
    margin: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 0.2s',
    },
  },
  mascot: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing(4),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const bounce = useSpring({
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(0px)' });
        await next({ transform: 'translateY(-20px)' });
      }
    },
    from: { transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  return (
    <Box className={classes.root}>
      {showConfetti && <Confetti />}
      <Grid container direction="column" alignItems="center" justify="center" spacing={4}>
        <animated.div style={fadeIn}>
          <Typography variant="h2" className={classes.title}>
            Welkom bij KidzFun!
          </Typography>
        </animated.div>

        <animated.div style={bounce}>
          <img 
            src="/mascot.png" 
            alt="KidzFun Mascotte" 
            className={classes.mascot}
          />
        </animated.div>

        <animated.div style={fadeIn}>
          <Button
            component={Link}
            to="/games"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            🎮 Speel spelletjes
          </Button>
        </animated.div>

        <animated.div style={fadeIn}>
          <Button
            component={Link}
            to="/ar"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            🔍 AR Avontuur
          </Button>
        </animated.div>

        <animated.div style={fadeIn}>
          <Button
            component={Link}
            to="/chatbot"
            variant="contained"
            color="default"
            className={classes.button}
          >
            🤖 Praat met onze mascotte
          </Button>
        </animated.div>
      </Grid>
    </Box>
  );
};

export default HomePage;