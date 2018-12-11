import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

/*
	 A higher-order component that focuses on giving a component its authentication through *Context Consumer 
	
		<AuthUserContext.Consumer>
			{authUser =>
				...
			}
		</AuthUserContext.Consumer>
	
	*https://reactjs.org/docs/context.html
*/

const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props){
			super(props);

			this.state = {
				authUser : null,
			};
		}
		
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
				authUser
					? this.setState({ authUser })
					: this.setState({ authUser: null });
			});
		}
	
		componentWillUnmount() {
			this.listener();
		}

		render(){
			return (
			<AuthUserContext.Provider value={this.state.authUser}>
				<Component {...this.props} />
			</AuthUserContext.Provider>
			)
		}
	}
	return withFirebase(WithAuthentication);
};

export default withAuthentication;
