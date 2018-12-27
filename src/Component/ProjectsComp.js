import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/actions';
import SvgRender from './SvgRender';
import { Spring } from 'react-spring';

const style = theme => ({
  root: {
    padding: theme.spacing.unit,
    display: 'flex' /* NEW, Spec - Firefox, Chrome, Opera */,
    // eslint-disable-next-line
    display: '-webkit-box' /* OLD - iOS 6-, Safari 3.1-6, BB7 */,
    // eslint-disable-next-line
    display: '-ms-flexbox' /* TWEENER - IE 10 */,
    // eslint-disable-next-line
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

class Project extends Component {
  state = {
    enterRadius: 0,
    leaveRadius: 0,
  };

  handleMouseEnter = () => {
    this.setState({
      enterRadius: 0,
      leaveRadius: 4,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      enterRadius: 4,
      leaveRadius: 0,
    });
  };

  render() {
    const { project } = this.props;
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Spring
          from={{ shadowLength: this.state.enterRadius }}
          to={{ shadowLength: this.state.leaveRadius }}
        >
          {props => (
            <Card
              style={{
                margin: 'auto',
                maxWidth: '300px',
                height: '300px',
                borderRadius: '5%',
                background: '#f5f5f5',
                boxShadow: '0px 0px 8px ' + props.shadowLength + 'px #989797d9',
              }}
            >
              <div
                style={{
                  maxWidth: '128px',
                  textAlign: 'center',
                  margin: '8px auto',
                  padding: '16px',
                }}
              >
                <SvgRender elem={project.image} />
              </div>
              <CardContent>
                <Typography color="secondary" variant="p">
                  <b>{project.name}</b>
                </Typography>
                <Typography
                  style={{
                    fontSize: '0.9rem',
                  }}
                  color="secondary"
                  variant="p"
                >
                  {project.content}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Spring>
      </div>
    );
  }
}

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
            spacing={32}
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
