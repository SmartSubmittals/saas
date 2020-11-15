import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const themeDark = createMuiTheme({
  palette: {
    primary: { main: grey[200] },
    secondary: { main: grey[400] },
    type: 'dark',
  },
});

const themeLight = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: grey[900] },
    type: 'light',
  },
});

export { themeDark, themeLight };

/**
 * Notes:
 * - customizing theme: https://material-ui.com/customization/default-theme/#default-theme
 */
