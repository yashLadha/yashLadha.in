import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'recompose';

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: 'none',
  },
  headerTitle: {
    fontFamily: 'Raleway, sans-serif',
    margin: theme.spacing.unit,
    padding: '1em 0em',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    color: '#fff',
  },
  toolbar: {
    margin: '0 auto',
  },
  smallDisplayNav: {
    backgroundColor: '#E1BBA1',
    position: 'sticky',
    boxShadow: 'none',
  },
});

class NavBar extends Component {
  handleClick = id => {
    if (document.getElementById(id) !== null) {
      document.getElementById(id).scrollIntoView();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Hidden mdUp>
          <AppBar classes={{ root: classes.smallDisplayNav }}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                classes={{ root: classes.headerTitle }}
              >
                Yash Ladha
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smDown>
          <AppBar
            classes={{
              root: classes.root,
            }}
            position="absolute"
          >
            <Toolbar classes={{ root: classes.toolbar }}>
              <Typography
                classes={{ root: classes.headerTitle }}
                variant="title"
                color="primary"
              >
                <a
                  onClick={this.handleClick('Home')}
                  style={{ textDecoration: 'none', color: '#E1BBA1' }}
                  href="#Home"
                >
                  Yash Ladha
                </a>
              </Typography>
              <Typography
                classes={{ root: classes.headerTitle }}
                variant="title"
                color="primary"
              >
                <a
                  onClick={this.handleClick('about')}
                  style={{ textDecoration: 'none', color: '#E1BBA1' }}
                  href="#about"
                >
                  About Me
                </a>
              </Typography>
              <Typography
                classes={{ root: classes.headerTitle }}
                variant="title"
                color="primary"
              >
                <a
                  onClick={this.handleClick('projects')}
                  style={{ textDecoration: 'none', color: '#E1BBA1' }}
                  href="#projects"
                >
                  Projects
                </a>
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth()
)(NavBar);
