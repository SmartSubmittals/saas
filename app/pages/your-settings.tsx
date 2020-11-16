import Head from 'next/head';
import * as React from 'react';

import Layout from '../components/layout';

import { getUserBySlugApiMethod } from '../lib/api/public';

type Props = {
  isMobile: boolean;
  user: { email: string; displayName: string; slug: string; avatarUrl: string };
};

class YourSettings extends React.Component<Props> {
  public static async getInitialProps() {
    const slug = 'team-builder-book';

    const user = await getUserBySlugApiMethod(slug);

    console.log(user);

    return { ...user };
  }

  public render() {
    const { user } = this.props;

    return (
      <Layout {...this.props}>
        <Head>
          <title>Your Settings page</title>
          <meta name="description" content="description for Your Settings page" />
        </Head>
        <div
          style={{
            padding: this.props.isMobile ? '0px' : '0px 30px',
            fontSize: '15px',
            height: '100%',
          }}
        >
          <h3>Your Settings</h3>
          <h4 style={{ marginTop: '40px' }}>Your account</h4>
          <li>
            Your email: <b>{user.email}</b>
          </li>
          <li>
            Your name: <b>{user.displayName}</b>
          </li>
          <p />
          <br />
        </div>
      </Layout>
    );
  }
}

export default YourSettings;
