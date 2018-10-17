import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/actions';
import '../shared/icons.svg';

const style = theme => ({
  root: {
    padding: theme.spacing.unit,
    display: 'flex' /* NEW, Spec - Firefox, Chrome, Opera */,
    display: '-webkit-box' /* OLD - iOS 6-, Safari 3.1-6, BB7 */,
    display: '-ms-flexbox' /* TWEENER - IE 10 */,
    display: '-webkit-flex' /* NEW - Safari 6.1+. iOS 7.1+, BB10 */,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    projects: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => {
      dispatch(fetchProjects());
    },
  };
};

const Project = ({ project }) => {
  return (
    <Card
      style={{
        margin: 'auto',
        maxWidth: '450px',
        height: '300px',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          maxWidth: '128px',
          textAlign: 'center',
          margin: '8px auto',
        }}
      >
        <svg className={`icon icon-${project.image}`}>
          <use xlinkHref={`#icons_${project.image}`} />
        </svg>
      </div>
      <CardContent>
        <Typography color="secondary" component="h2">
          {project.name}
        </Typography>
        <Typography color="secondary" component="h5">
          {project.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

class Projects extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    const { classes, projects } = this.props;

    const inflateProjects = projects.projectsList.map(project => {
      return (
        <Grid key={project.id} item xs={12} md={4}>
          <Project project={project} />
        </Grid>
      );
    });

    return (
      <div className={classes.root}>
        <h1>Projects</h1>
        <div
          style={{
            maxWidth: '900px',
          }}
        >
          <Grid
            spacing={16}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {inflateProjects}
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Projects));
