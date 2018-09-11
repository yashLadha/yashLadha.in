import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  projectGrid: {
    maxWidth: '720px',
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  cardLayout: {
    height: '410px',
  },
});

class ProjectComponent extends Component {
  projectSelect = (id, details) => () => {
    alert(id + ' ' + details);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="projects">
        <Grid className={classes.projectGrid} container spacing={8}>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway, Roboto, sans-serif',
                fontSize: '2rem',
                fontWeight: '500',
              }}
              variant="title"
            >
              Projects
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card
              onClick={this.projectSelect('test', 'test')}
              className={classes.cardLayout}
            >
              <CardMedia
                className={classes.media}
                image="/images/python.png"
                title="Bavarder"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  Bavarder
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  This is a realtime chat server created in Django
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/angular.png"
                title="Incresto"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  Incresto
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  This is a sample mini-blog created with Angular 5 and
                  bootstrap.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/android.png"
                title="Newpie"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  NewPie
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  This is an android app which fetched news from the popular
                  news houses.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/python.png"
                title="10-fast-fingers"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  10-fast-fingers-hack
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  This is an automation script to achieve `GOOD LEVEL` typing
                  speed on 10-fast fingers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/c.jpg"
                title="VIDHI"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  VIDHI
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  Mini Compiler created from taking motivation from Kotlin,
                  Scala.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/android.png"
                title="Design github"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  Design Github
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  Sample Android application created using Github API and
                  Retrofit library.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/js.svg"
                title="Hatsphere server"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  HatSphere Server
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  Express based server for the android application, that
                  communicates with the firebase admin sdk.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/android.png"
                title="Hatspher user"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  HatSphere User Android App
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  Android application for user HatSphere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.cardLayout}>
              <CardMedia
                className={classes.media}
                image="/images/js.svg"
                title="React Portfolio"
              />
              <CardContent>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  variant="headline"
                  component="h2"
                >
                  React Portfolio
                </Typography>
                <Typography
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                  component="p"
                >
                  This is my portfolio created in React.
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
};

export default withStyles(styles)(ProjectComponent);
