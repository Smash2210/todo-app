import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router-dom";

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  logout = () => {
    this.props.clearStorage();
    this.props.history.push('/login');
  }
  render() {
    return (
      <div className={"logout-wrapper"} onClick={() => this.logout()}>
        <ExitToAppIcon></ExitToAppIcon>
      </div>
    )
  }
}
export default withRouter(Logout)