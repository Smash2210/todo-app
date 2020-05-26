import React from 'react';
import Logout from "../Logout/Logout";

class Header extends React.Component {
    render() {
        return (
            <div className={"header-wrapper"}>
                <p>Todo Application</p>
                <div className={"menu-options"}>
                    <div className={"menu-items"}>
                        <span>Todo List</span>
                        <span>Settings</span>
                    </div>
                    <Logout></Logout>
                </div>
            </div>
        )
    }
}
export default Header