import React, { Component } from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	Hidden,
	IconButton,
	List,
	ListItem,
	Drawer,
	ListItemText,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		width: '100%',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	list: {
		width: 250,
	},
}

class NavBar extends Component {
	state = {
		left: false,
	}

	toggleDrawer = isOpen => {
		this.setState({
			left: isOpen,
		})
	}

	handleClick = tag => {
		document.getElementById('#' + tag).scrollIntoView()
	}

	render() {
		const { classes } = this.props

		const ListInflator = ['Resume', 'contact'].map(item => {
			if (item === 'Resume') {
				return (
					<ListItem key={item} button>
						<a
							style={{
								textDecoration: 'none',
							}}
							href="https://drive.google.com/file/d/1srijAOwk1Wwrkpr26lMAXG6XoR_AJ6uq/view?usp=sharing"
						>
							<ListItemText primary={item} />
						</a>
					</ListItem>
				)
			}
			var href = '#' + item
			return (
				<ListItem key={item} button>
					<a
						onClick={() => this.handleClick(item)}
						style={{ textDecoration: 'none' }}
						href={href}
					>
						<ListItemText
							primary={item.charAt(0).toUpperCase() + item.slice(1)}
						/>
					</a>
				</ListItem>
			)
		})

		const sideList = (
			<div className={classes.list}>
				<List>{ListInflator}</List>
			</div>
		)

		return (
			<div className={classes.root}>
				<AppBar elevation={0} position="fixed" color="primary">
					<Hidden smDown>
						<div className={classes.centerBar}>
							<Toolbar>
								<div style={{ flexGrow: 1 }} />
								<Typography variant="title">Yash</Typography>
								<div style={{ flexGrow: 1 }} />
								<a
									style={{
										textDecoration: 'none',
									}}
									href="https://drive.google.com/file/d/1srijAOwk1Wwrkpr26lMAXG6XoR_AJ6uq/view?usp=sharing"
								>
									<Typography variant="title">Resume</Typography>
								</a>
								&emsp;
								<a
									style={{ textDecoration: 'none' }}
									onClick={() => this.handleClick('contact')}
									href="#contact"
								>
									<Typography variant="title">Contact</Typography>
								</a>
								<div style={{ flexGrow: 1 }} />
							</Toolbar>
						</div>
					</Hidden>
					<Hidden mdUp>
						<Toolbar>
							<IconButton
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
								onClick={() => this.toggleDrawer(!this.state.left)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.grow}>
								Yash
							</Typography>
						</Toolbar>
						<Drawer
							open={this.state.left}
							onClose={() => this.toggleDrawer(false)}
						>
							<div
								tabIndex={0}
								role="button"
								onClick={() => this.toggleDrawer(false)}
								onKeyDown={() => this.toggleDrawer(false)}
							>
								{sideList}
							</div>
						</Drawer>
					</Hidden>
				</AppBar>
			</div>
		)
	}
}

export default withStyles(styles)(NavBar)
