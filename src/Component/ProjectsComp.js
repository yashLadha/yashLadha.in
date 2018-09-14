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
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/actions';

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

const mapStateToProps = state => {
  return {
    projects: state,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => {
    dispatch(fetchProjects());
  },
});

const ProjectRender = ({ classes, project }) => {
  return (
    <Grid key={project.id} item md={4} xs={12}>
      <Card className={classes.cardLayout}>
        <CardMedia
          className={classes.media}
          image={project.image}
          title={project.name}
        />
        <CardContent>
          <Typography
            style={{ fontFamily: 'Raleway, sans-serif' }}
            variant="headline"
            component="h2"
          >
            {project.name}
          </Typography>
          <Typography
            style={{ fontFamily: 'Raleway, sans-serif' }}
            component="p"
          >
            {project.content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

class ProjectComponent extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  projectSelect = (id, details) => () => {
    alert(id + ' ' + details);
  };

  render() {
    const { classes, projects } = this.props;

    const renderProjectList = projects.projectsList.map(project => {
      return (
        <ProjectRender key={project.id} classes={classes} project={project} />
      );
    });

    if (projects.projectsList.length > 0) {
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
            {renderProjectList}
          </Grid>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ProjectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectComponent));
