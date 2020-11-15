import App from 'next/app';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { isMobile } from '../lib/isMobile';
import { themeDark, themeLight } from '../lib/theme';
import { CssBaseline } from '@material-ui/core';
class MyApp extends App {
  public componentDidMount() {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  public render() {
    const { Component, pageProps } = this.props;
    console.log(isMobile);

    return (
      <ThemeProvider theme={false ? themeDark : themeLight}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

/**
 * Notes:
 * - more info on baseline styles:
 *  - https://material-ui.com/components/css-baseline/#css-baseline
 *  - https://github.com/necolas/normalize.css/blob/master/normalize.css
 */
export default MyApp;
