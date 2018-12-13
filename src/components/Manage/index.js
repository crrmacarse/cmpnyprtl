import React from 'react';

import {
    Route,
    Link
} from 'react-router-dom';

import ManageItems from './items';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// TODO: Manage Component

class ManagePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            title: 'Home',
        }
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    menuClicked = (event) => {
        this.setState({ title: event.nativeEvent.target.outerText })
        this.handleClose();
    }


    render() {
        const { match } = this.props;

        return (

            <section id="manage" className="container-fluid h-100 bg-white">
                <div className="row bg-dark py-1 mb-3 text-white">
                    <div className="col-12 text-right">
                        <p className="d-inline mx-2 px-3 small font-weight-light border-right mb-0"> &nbsp; Last Update: 2018/03/25 14:00:03</p>
                        <ManageMenu
                            match={this.props.match}
                            anchorEl={this.state.anchorEl}
                            title={this.state.title}
                            handleClick={this.handleClick}
                            handleClose={this.handleClose}
                            menuClicked={this.menuClicked}
                        />
                    </div>
                </div>
                <Route exact path={`${match.path}/`} component={ManageMain} />
                <Route path={`${match.path}/items`} component={ManageItems} />
            </section>

        )
    }

}

const ManageMain = () => (
    <div className="row text-dark">
        <p className="display-4">
            Hello
        </p>
    </div>
)

const ManageMenu = ({ match, anchorEl, title, handleClick, handleClose, menuClicked }) => {
    return (
        <React.Fragment>
            <p
                className="d-inline mx-2 small font-weight-bold mb-0"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                onClick={handleClick}
                aria-haspopup="true"
                style={{ cursor: 'pointer' }}
            > {title}</p>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link className = "clean-linkrouter" to={`${match.path}/`}>
                    <MenuItem name="Doctorate" onClick={menuClicked}>
                        Home
                    </MenuItem>
                </Link>
                
                <Link className = "clean-linkrouter" to={`${match.path}/items`}>
                    <MenuItem name="Doctorate" onClick={menuClicked}>
                        Manage Items
                </MenuItem>
                </Link>

            </Menu>
        </React.Fragment >
    )

}



// const ManagePage = ({ match }) =>
//     <section id="manage" className="container-fluid h-100 bg-white">

//     </section>

export default ManagePage;