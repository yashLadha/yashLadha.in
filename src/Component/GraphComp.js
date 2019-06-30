import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchGithubPublicEvents } from '../redux/actions';

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
  componentWillMount() {
    this.props.fetchEventData();
    this.updateDimension();
  }

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
        <LineChart
          width={this.state.width}
          height={this.state.height}
          data={githubData}
          style={{
            margin: 'auto',
            padding: '8px',
          }}
        >
          <XAxis dataKey="xAxisRep" name="date/month" interval={2} />
          <YAxis dataKey="contributions" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="contributions"
            stroke="#c2185b"
            activeDot={{ r: 8 }}
          />
        </LineChart>
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
