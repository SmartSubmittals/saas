require('dotenv').config();

module.exports = {
  env: {
    URL_APP: process.env.URL_APP,
    URL_API: process.env.URL_API,
    PORT_APP: process.env.PORT_APP,
    BUCKET_FOR_AVATARS: process.env.BUCKET_FOR_AVATARS,
    BUCKET_FOR_TEAM_LOGOS: process.env.BUCKET_FOR_TEAM_LOGOS,
    STRIPE_TEST_PUBLISHABLEKEY: process.env.STRIPE_TEST_PUBLISHABLEKEY,
    STRIPE_LIVE_PUBLISHABLEKEY: process.env.STRIPE_LIVE_PUBLISHABLEKEY,
    // more env variables

    /**
     * Notes:
     * By default, all environmental variables inside .env file are available on the server only. Whatever environmental variable you will add to the next.config.js file, will be available on the browser as well.
     * Next.js compiles components and pages folders by default with Babel
     * We have to compile the server folder with the tsc command from the typescript package since Next.js does not compile server folder.
     */
  },
};
