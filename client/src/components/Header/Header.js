import React from 'react';
import Logout from "../Logout/Logout";

class Header extends React.Component {
    constructor(props) {
        super(props);
        const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
        this.state = {
            isLoggedIn
        }
    }
    render() {

        return (
            <div className={"header-wrapper"}>
                <p>Todo Application</p>
                {this.state.isLoggedIn ?
                    <div className={"menu-options"}>
                        <div className={"menu-items"}>
                            <span>Todo List</span>
                            <span>Profile</span>
                        </div>
                        <Logout {...this.props}></Logout>
                    </div> : null}
            </div>
        )
    }
}
export default Header