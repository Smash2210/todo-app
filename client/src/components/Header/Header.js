import React from 'react';
import Logout from "../Logout/Logout";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
        return (
            <div className={"header-wrapper"}>
                <p>Todo Application</p>
                {isLoggedIn ?
                    <div className={"menu-options"}>
                        <div className={"menu-items"}>
                            <span>Todo List</span>
                            <span>Profile</span>
                        </div>
                        <Logout></Logout>
                    </div> : null}
            </div>
        )
    }
}
export default Header