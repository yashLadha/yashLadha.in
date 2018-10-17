import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
  },
};

class NavBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <div className={classes.centerBar}>
            <Toolbar>
              <div style={{ flexGrow: 1 }} />
              <Typography variant="title">Yash</Typography>
              <div style={{ flexGrow: 1 }} />
              <a
                style={{
                  textDecoration: 'none',
                }}
                href="/resume"
              >
                <Typography variant="title">Resume</Typography>
              </a>
              &emsp;
              <Typography variant="title">Projects</Typography>
              <div style={{ flexGrow: 1 }} />
            </Toolbar>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
