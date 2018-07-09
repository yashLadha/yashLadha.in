import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  mainGrid: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '8px',
  }
});

const AboutComp = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid className={classes.mainGrid} alignItems={'center'} container spacing={24}>
        <Grid item md={3} xs={12}>3 space</Grid>
        <Grid item md={9} xs={12}>9 space</Grid>
      </Grid>
    </div>
  );
}

AboutComp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AboutComp);