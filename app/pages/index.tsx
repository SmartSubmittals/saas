import Button from '@material-ui/core/Button';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/layout';
import NProgress from 'nprogress';

import confirm from '../lib/confirm';
import notify from '../lib/notify';
import { getUserBySlugApiMethod } from '../lib/api/public';

type Props = { user: { email: string; displayName: string } };

class Index extends React.Component<Props> {
  public static async getInitialProps() {
    const slug = 'team-builder-book';

    const user = await getUserBySlugApiMethod(slug);

    console.log(user);

    return { ...user };
  }

  public render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Index page</title>
          <meta name="description" content="This is a description of the Index page" />
        </Head>
        <div style={{ padding: '0px 30px', fontSize: '15px', height: '100%' }}>
          <p>Content on Index page</p>
          <Link href="/csr-page" as="/csr-page">
            <a>Go to CSR page</a>
          </Link>
          <p />
          <Button
            variant="contained"
            onClick={() =>
              confirm({
                title: 'Are you sure?',
                message: 'explanatory message',
                onAnswer: async (answer) => {
                  // console.log(answer);
                  if (!answer) {
                    return;
                  }

                  NProgress.start();

                  try {
                    notify('You successfully confirmed.');
                  } catch (error) {
                    console.error(error);
                    notify(error);
                  } finally {
                    NProgress.done();
                  }
                },
              })
            }
          >
            Test Confirmer and Notifier
          </Button>
          <p>Your email: {this.props.user.email}</p>
          <p>Your name: {this.props.user.displayName}</p>
        </div>
      </Layout>
    );
  }
}

export default Index;

/**
 * Notes:
 * - Key elements of the Index Page
 * - The key elements of the Index page are:
 * --> we defined types for the page component's props
 * --> we defined the page component by extending React.Component
 * --> we wrapped the page's content with the Layout component (which is a higher-order component)
 * --> we defined Next's getInitialProps method that will be called when the page receives a request
 * --> when the method getInitialProps is called, it then calls getUserBySlugApiMethod to get a user's information
 */
