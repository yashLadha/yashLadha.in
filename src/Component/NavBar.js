import { AppBar, Hidden, IconButton, Toolbar, Typography, withStyles, withWidth } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'recompose';

const styles = theme => ({
  root: {
    background: '#000',
    position: 'sticky',
    boxShadow: 'none',
  },
  headerTitle: {
    fontFamily: 'Raleway, sans-serif',
    margin: theme.spacing.unit,
    padding: '1em 0em'
  },
  flex: {
    flex: 1,
  },
  toolbar: {
    margin: '0 auto',
  },
  smallDisplayNav: {
    background: '#000',
    position: 'sticky',
    boxShadow: 'none',
  }
});

const NavBar = (props) => {
  const { classes } = props;
  return (
    <div>
      <Hidden mdUp>
        <AppBar classes={{ root: classes.smallDisplayNav }}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Yash Ladha
          </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden smDown>
        <AppBar classes={{
          root: classes.root,
        }}>
          <Toolbar classes={{ root: classes.toolbar }}>
            <Typography classes={{ root: classes.headerTitle, }} variant='title' color='primary'>Yash Ladha</Typography>
            <Typography classes={{ root: classes.headerTitle, }} variant='title' color='primary'>About Me</Typography>
            <Typography classes={{ root: classes.headerTitle, }} variant='title' color='primary'>Projects</Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withWidth(),
)(NavBar);