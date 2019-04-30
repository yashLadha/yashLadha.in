import React, { Component } from 'react'
import { TextField, Grid, withStyles, Button } from '@material-ui/core'

const style = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%',
	},
	button: {
		margin: theme.spacing.unit,
		width: '100%',
	},
})

class Contact extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				<div style={{ width: '100%', textAlign: 'center' }}>
					<h1>Contact</h1>
				</div>
				<Grid container spacing={8}>
					<Grid
						style={{
							margin: '16px auto',
							padding: '16px',
						}}
						item
						xs={12}
						md={6}
					>
						<form noValidate onSubmit={this.handleSubmit} autoComplete="off">
							<Grid container>
								<Grid style={{ padding: '8px' }} item xs={12} md={12} lg={6}>
									<TextField
										className={classes.textField}
										id="email"
										margin="normal"
										label="Email"
										autoCorrect="off"
										autoComplete="email"
										variant="outlined"
									/>
								</Grid>
								<Grid style={{ padding: '8px' }} item xs={12} md={12} lg={6}>
									<TextField
										className={classes.textField}
										id="organisation-name"
										autoComplete="off"
										margin="normal"
										label="Organisation"
										variant="outlined"
									/>
								</Grid>
								<Grid style={{ padding: '8px' }} item xs={12} md={12} lg={12}>
									<TextField
										className={classes.textField}
										multiline
										margin="normal"
										label="Query"
										id="query"
										variant="outlined"
									/>
								</Grid>
								<Grid style={{ padding: '8px' }} item xs={12} md={12} lg={12}>
									<Button
										variant="outlined"
										color="secondary"
										className={classes.button}
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(style)(Contact)
