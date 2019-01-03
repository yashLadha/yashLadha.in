import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import { connect } from 'react-redux';
import { fetchSkills } from '../redux/actions';
import SvgRender from './SvgRender';
import { Spring } from 'react-spring';
import theme from '../MaterialTheme';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSkills: () => {
      dispatch(fetchSkills());
    },
  };
};

class CircularCard extends Component {
  state = {
    enterRadius: 0,
    leaveRadius: 0,
    bgColor: '#000',
  };

  handleMouseEnter = () => {
    this.setState({
      enterRadius: 0,
      leaveRadius: 6,
      bgColor: theme.palette.secondary.darkAccentColor,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      enterRadius: 6,
      leaveRadius: 0,
      bgColor: '#000',
    });
  };

  render() {
    const { skill } = this.props;
    return (
      <Spring
        from={{
          shadowLength: this.state.enterRadius,
          backColor: this.state.bgColor,
        }}
        to={{
          shadowLength: this.state.leaveRadius,
          backColor: this.state.bgColor,
        }}
      >
        {props => (
          <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={{
              height: '100px',
              width: '100px',
              margin: '16px auto',
              borderRadius: '50%',
              background: '#dfdce2',
              boxShadow: '0px 0px 16px ' + props.shadowLength + 'px #989797d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <SvgRender
              elem={skill.name.toLowerCase()}
              color={props.backColor}
              width="60"
              height="60"
            />
          </div>
        )}
      </Spring>
    );
  }
}

class Skills extends Component {
  componentDidMount() {
    this.props.fetchSkills();
  }

  render() {
    const { skillsList } = this.props;
    const renderSkills = skillsList.map(skill => {
      return (
        <Grid key={skill.id} item xs={12} md={4}>
          <CircularCard skill={skill} />
        </Grid>
      );
    });
    return (
      <div
        style={{ maxWidth: '720px', textAlign: 'center', margin: '16px auto' }}
      >
        <h1>Skills</h1>
        <Grid container spacing={16}>
          {renderSkills}
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills);
