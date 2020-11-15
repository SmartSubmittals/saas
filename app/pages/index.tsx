import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Index = () => (
  <div>
    <Head>
      <title> Index Page</title>
      <meta name="description" content="This is a description of the Index page" />
    </Head>
    <div style={{ padding: '0px 30px', fontSize: '65px', height: '100%', color: '#222' }}>
      <p>Content on Index page</p>
    </div>
    <Link href="/csr-page" as="/csr-page">
      <a>Go to CSR page</a>
    </Link>
  </div>
);

export default Index;
