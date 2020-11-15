import { openSnackbarExternal } from '../components/common/Notifier';

export default function notify(obj) {
  openSnackbarExternal({ message: obj.message || obj.toString() });
}

/**
 * Notes:
 * - This will allow us to show Notifier with a simple call notify('some text') instead of openSnackbarExternal({ message: 'some text' }).
 */
