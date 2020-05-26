import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Logout extends React.Component {
  render() {
    return (
        <div className={"logout-wrapper"}>
            <ExitToAppIcon></ExitToAppIcon>
        </div>
    )
  }
}
export default Logout