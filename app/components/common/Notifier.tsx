import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

export let openSnackbarExternal;

class Notifier extends React.PureComponent {
  public state = {
    open: false,
    message: '',
  };

  constructor(props) {
    super(props);
    openSnackbarExternal = this.openSnackbar;
  }

  public render() {
    const message = (
      <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message }} />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={message}
        autoHideDuration={5000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }

  public handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  public openSnackbar = ({ message }) => {
    // console.log(openSnackbarExternal);
    this.setState({ open: true, message });
  };
}

export default Notifier;
/**
 * Notes:
 * - openSnackbar - takes message as an argument. If called, this functions shows the Notifier component. Then we can export this function from app/components/common/Notifier.tsx and import it to any page. In other words, we can import and add Notifier to Layout only once and then import/add the openSnackbar function as needed to any page.
 */
