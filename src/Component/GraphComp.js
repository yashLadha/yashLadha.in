import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchGithubPublicEvents } from '../redux/actions';
import { Card } from '@material-ui/core';
import { Spring } from 'react-spring';

const mapStateToProps = state => {
  return {
    data: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventData: () => {
      dispatch(fetchGithubPublicEvents());
    },
  };
};

class GraphComponent extends Component {
  state = {
    enterRadius: 0,
    leaveRadius: 0,
    bgColor: '#000',
  };

  componentWillMount() {
    this.props.fetchEventData();
    this.updateDimension();
  }

  handleMouseEnter = () => {
    this.setState({
      enterRadius: 0,
      leaveRadius: 4,
      bgColor: '#f48fb1',
    });
  };

  handleMouseLeave = () => {
    this.setState({
      enterRadius: 4,
      leaveRadius: 0,
      bgColor: '#000',
    });
  };

  updateDimension = () => {
    const chartWidth =
      window.innerWidth < 600
        ? window.innerWidth - window.innerWidth / 10
        : 600;
    const chartHeight = window.innerHeight < 1000 ? 200 : 300;
    this.setState({
      height: chartHeight,
      width: chartWidth,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }

  render() {
    const { githubData } = this.props.data;
    if (githubData.length > 0) {
      return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
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
              <Card
                style={{
                  margin: 'auto',
                  maxWidth: this.state.width + this.state.width / 10,
                  height: this.state.height + this.state.height / 10,
                  padding: '8px',
                  borderRadius: '2%',
                  background: '#f5f5f5',
                  boxShadow:
                    '0px 0px 8px ' + props.shadowLength + 'px #989797d9',
                }}
              >
                <LineChart
                  width={this.state.width}
                  height={this.state.height}
                  data={githubData}
                  style={{
                    margin: 'auto',
                    padding: '8px',
                  }}
                >
                  <XAxis
                    dataKey="xAxisRep"
                    name="date/month"
                    interval={2}
                    reversed={true}
                  />
                  <YAxis dataKey="contributions" />
                  <Tooltip />
                  <Legend verticalAlign="top" layout="vertical" />
                  <Line
                    type="monotone"
                    dataKey="contributions"
                    stroke="#c2185b"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </Card>
            )}
          </Spring>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent);
