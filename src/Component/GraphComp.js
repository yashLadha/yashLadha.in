import React, { PureComponent } from 'react';
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

class GraphComponent extends PureComponent {
  componentWillMount() {
    this.props.fetchEventData();
  }

  render() {
    const { githubData } = this.props.data;
    if (githubData.length > 0) {
      return (
        <LineChart
          width={600}
          height={300}
          data={githubData}
          style={{
            margin: 'auto',
            padding: '8px',
          }}
        >
          <XAxis dataKey="timestamp" />
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
