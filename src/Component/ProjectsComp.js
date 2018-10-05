import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  withStyles,
  Chip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  projectGrid: {
    maxWidth: theme.spacing.unit * 150,
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing.unit * 45,
    },
    margin: 'auto',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  media: {
    height: '150px',
    width: '150px',
    margin: '0 auto',
  },
  cardLayout: {
    padding: '24px',
    height: '300px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
      height: '350px',
    },
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
  const inflateTags = project.tags.map(tag => {
    return <Chip key={tag} className={classes.chip} label={tag} />;
  });

  return (
    <Grid item md={4} xs={12}>
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
          {inflateTags}
        </CardContent>
      </Card>
    </Grid>
  );
};

class ProjectComponent extends Component {
  state = {
    modalOpen: false,
    projectInfo: null,
  };

  componentWillMount() {
    this.props.fetchProjects();
  }

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
          <Grid className={classes.projectGrid} container spacing={32}>
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
