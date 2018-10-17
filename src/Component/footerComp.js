import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchSocialMedia } from '../redux/actions';

const style = theme => ({
  root: {
    display: 'flex',
    marginTop: '16px',
    background: theme.palette.secondary.main,
  },
});

const mapStateToProps = state => {
  return {
    socialMedia: state.socialList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSocialMedia: () => {
      dispatch(fetchSocialMedia());
    },
  };
};

class Footer extends Component {
  componentWillMount() {
    this.props.fetchSocialMedia();
  }

  render() {
    const { classes, socialMedia } = this.props;

    const inflateSocialMedia = socialMedia.map(social => {
      return (
        <Grid key={social.id} item xs={12} md={1}>
          <a
            href={social.link}
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                padding: '8px',
                margin: '0 auto',
              }}
            >
              <svg
                style={{
                  width: '24px',
                  height: '24px',
                }}
                className={`icon icon-${social.name}`}
              >
                <use xlinkHref={`#icons_${social.name}`} />
              </svg>
            </div>
          </a>
        </Grid>
      );
    });

    return (
      <div className={classes.root}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '16px',
          }}
        >
          <Grid
            container
            spacing={32}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {inflateSocialMedia}
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Footer));
