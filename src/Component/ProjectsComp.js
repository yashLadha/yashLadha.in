import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  projectGrid: {
    maxWidth: '720px',
    margin: 'auto',
  }
});

class ProjectComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.projectGrid} container spacing={8}>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway, Roboto, sans-serif',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
              variant='title'>Projects</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component='p'>
                  This is card1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component='p'>
                  This is card2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component='p'>
                  This is card1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component='p'>
                  This is card1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography component='p'>
                  This is card1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProjectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProjectComponent);
