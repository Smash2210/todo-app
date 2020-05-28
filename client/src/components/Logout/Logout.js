import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  logout = () => {
    localStorage.clear();
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
export default Logout