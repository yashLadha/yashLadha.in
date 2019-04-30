import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Skills from './SkillsComponent'

const style = theme => ({
	basicBg: {
		color: theme.palette.primary.contrastText,
		height: '600px',
		textAlign: 'center',
		display: 'flex' /* NEW, Spec - Firefox, Chrome, Opera */,
		// eslint-disable-next-line
		display: '-webkit-box' /* OLD - iOS 6-, Safari 3.1-6, BB7 */,
		// eslint-disable-next-line
		display: '-ms-flexbox' /* TWEENER - IE 10 */,
		// eslint-disable-next-line
		display: '-webkit-flex' /* NEW - Safari 6.1+. iOS 7.1+, BB10 */,

		justifyContent: 'center',
		alignItems: 'center',
	},
	aboutContent: {
		background: 'white',
		padding: theme.spacing.unit,
		maxWidth: '600px',
		fontSize: '1.3rem',
		fontFamily: 'Source Code Pro',
		textAlign: 'center',
		lineHeight: '1.5em',
	},
	secondContent: {
		color: theme.palette.secondary.main,
		fontSize: '1.1rem',
		fontWeight: '600',
	},
})

class About extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				<div className={classes.basicBg}>
					<div className={classes.aboutContent}>
						<h1 style={{ color: '#689F38' }}>Developer</h1>
						<span className={classes.secondContent}>Yash</span> is a computer
						science engineer interested in <b>Web Technologies</b>,{' '}
						<b>Native Mobile Development</b> and <b>Open Source</b>. <br />
						He was Google Summer of Code 2018 Intern and had done Open Source
						Contribution in organisations like FOSSASIA, Oppia. He also mentor
						students for Open Source Contribution (GCI mentor).
					</div>
				</div>
				<Skills />
			</div>
		)
	}
}

export default withStyles(style)(About)
