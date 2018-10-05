import {
  AppBar,
  Hidden,
  Toolbar,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
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
    margin: '0 8px',
    padding: '1em 0em',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    color: '#fff',
    textAlign: 'center',
  },
  toolbar: {
    position: 'absolute',
    right: 0,
  },
  smallDisplayNav: {
    // backgroundColor: '#E1BBA1',
    zIndex: '1',
    backgroundColor: '#21D4FD',
    position: 'sticky',
    boxShadow: 'none',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDrawer = openState => () => {
    this.setState({
      open: openState,
    });
  };

  handleClick = id => () => {
    if (document.getElementById(id) !== null) {
      document.getElementById(id).scrollIntoView();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
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
                  onClick={this.handleClick('about')}
                  style={{ textDecoration: 'none', color: '#E0E0E0' }}
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
                  style={{ textDecoration: 'none', color: '#E0E0E0' }}
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
