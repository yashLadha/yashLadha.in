import { Card, CardContent, Chip, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProjects } from '../redux/actions'
import SvgRender from './SvgRender'
import theme from '../MaterialTheme'
import { Spring } from 'react-spring'

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
		fontFamily: 'Source Code Pro',
		alignItems: 'center',
	},
	chip: {
		margin: theme.spacing.unit,
	},
})

const mapStateToProps = state => {
	return {
		projects: state,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchProjects: () => {
			dispatch(fetchProjects())
		},
	}
}

class Project extends Component {
	state = {
		enterRadius: 0,
		leaveRadius: 0,
		bgColor: '#000',
	}

	handleMouseEnter = () => {
		this.setState({
			enterRadius: 0,
			leaveRadius: 4,
			bgColor: theme.palette.secondary.accentColor,
		})
	}

	handleMouseLeave = () => {
		this.setState({
			enterRadius: 4,
			leaveRadius: 0,
			bgColor: '#000',
		})
	}

	render() {
		const { project } = this.props
		// Render chips component
		const projectChipComponent = project.tags.map((tag, idx) => {
			return (
				<Chip
					style={{
						margin: '4px',
					}}
					color="secondary"
					key={idx}
					label={tag}
					variant="outlined"
				/>
			)
		})
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
						<a href={project.link} style={{ textDecoration: 'none' }}>
							<Card
								style={{
									margin: 'auto',
									maxWidth: '300px',
									height: '400px',
									borderRadius: '5%',
									background: '#f5f5f5',
									boxShadow:
										'0px 0px 8px ' + props.shadowLength + 'px #989797d9',
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
									<SvgRender elem={project.image} color={props.backColor} />
								</div>
								<CardContent>
									<Typography color="secondary" variant="p">
										<b>{project.name}</b>
									</Typography>
									<Typography
										style={{
											fontSize: '0.8rem',
										}}
										color="secondary"
										variant="p"
									>
										{project.content}
									</Typography>
									{projectChipComponent}
								</CardContent>
							</Card>
						</a>
					)}
				</Spring>
			</div>
		)
	}
}

class Projects extends Component {
	componentWillMount() {
		this.props.fetchProjects()
	}

	render() {
		const { classes, projects } = this.props

		const inflateProjects = projects.projectsList.map(project => {
			return (
				<Grid key={project.id} item xs={12} md={4}>
					<Project project={project} />
				</Grid>
			)
		})

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
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(style)(Projects))
