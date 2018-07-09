import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, withWidth } from '@material-ui/core';
import { compose } from 'recompose';

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: '#234',
    margin: 'auto',
    minHeight: '100vh',
  },
  mainGrid: {
    maxWidth: '720px',
    margin: 'auto',
    textAlign: 'center',
    padding: '8px',
    [theme.breakpoints.up('md')]: {
      top: '50%',
      bottom: '50%',
      position: 'absolute',
      left: '30%',
      right: '30%',
    }
  },
  media: {
    width: '100%',
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      height: '70%',
    },
    height: '100%'
  },
  contentStyle: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
    color: '#fff',
    padding: '4px',
  }
});

const AboutComp = (props) => {
  const { classes, width } = props;

  return (
    <div className={classes.root}>
      <Grid className={classes.mainGrid} alignItems={'center'} container spacing={8}>
        <Grid item md={3} xs={12}>
          <img className={classes.media} src='/images/profile.jpeg' />
        </Grid>
        <Grid item md={9} xs={12}>
          <p className={classes.contentStyle}>This is a Short Introduction about me. I currently study Computer Science and i love to code.</p>
        </Grid>
      </Grid>
    </div>
  );
}

AboutComp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles),
  withWidth(),
)(AboutComp);