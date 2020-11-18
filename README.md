- git 
- node 
- yarn
- eslint
- prettier 
- next.js 
- express
- mongoDB
- mongoose
- jest.js


last checkpoint: [Authentication HOC withAuth](https://builderbook.org/books/saas-boilerplate/login-page-session-and-cookie-google-oauth-api-authentication-hoc-withauth-firstgriditem-logic-in-app-hoc#authentication-hoc-withauth)


## Deployment 
- production-server folder will contain a compiled code that we will use to deploy our API server to AWS Elastic Beanstalk in Chapter 10.
## Server Side vs Client Side Rendering 
- https://async-await.com/article/server-side-vs-client-side-rendering-in-react-apps

 It is important for anyone who builds a Next.js web application to know the difference between server-side and client-side rendered pages (SSR and CSR, respectively).

When a user loads your Next.js application for the first time in his/her browser - we call this an initial load. A web page that gets loaded in this way (with initial load) is rendered on the server - we call it a server-side rendered page. That is a property of all Next.js applications.

After a user has loaded a Next.js application on his/her browser, this user may click a navigational link on the page to load another page from the application. A web page that gets loaded in this fashion is rendered on the browser - we call it a client-side rendered page.

## React Higher Order Components
- Bundling oft-used features into the react components that get loaded on every page. that way we define them once and allow for their use everywhere 
- i.e. Notifier and Confirmer
- Passing isMobile as props for all components

## 11/15/2020 - before express commit
- So far, we have not written any server-specific code in our Next.js application. The code inside pages, components, and lib is available on both client (browser) and server. Say you load the Index page on the browser. The code from components gets imported to the Index page, and this page gets rendered on the server and then sent to the browser. If you access the Index page by clicking a navigational link (<Link /> element), then the page is rendered on the browser. In other words, the code we wrote is available and present on both client and server.

We have not written any code that is only present on the server and never gets sent to the client (browser). Why? Because up until this moment, there was no need to have such code. Next.js was taking care of routing for pages! If we want to render a page at route /, then we create a file with the name index.tsx inside the pages folder. That's it, done. The name of the file becomes a route automatically. Next.js provides simple routing for pages out-of-the-box.

## Next.js compilation
- Note that by default, Next.js compiles code in the pages folder. When we run the yarn dev command (which equates to yarn next), Next.js, by default, imports code from components and lib to the page code and compiles our TypeScript page code.

In contrast, Next.js, by default, does not compile code in the server/server.ts folder. We have to add new commands to package.json to properly compile our TypeScript server-only code.

- we need to remember that now our web application has two servers, next and express:
 -- 
    When a request is sent to fetch pages or static files, this request should be handled by the next server.
    When a request is sent to fetch other types of data (other than pages), this request should be handled by the express server.

- you have both next server, page and express server, user object. That's because when our Index page is requested by the browser, both servers receive a request. The next server receives a request because we loaded / in our browser. The express server receives a request because we call our getUser API method inside getInitialProps of the Index page.

## API Infrastructure

- When we say "API infrastructure", we mean everything we did in this chapter so far. For our server-side rendered Index page, this infrastructure is:

    The browser sends a request to the server
    This triggers the getInitialProps method (on the server)
    This triggers the getUser method (on the server)
    This triggers the sendRequestAndGetResponse method (on the server)
    This triggers the fetch method (on the server)
    This sends a request to the Express route /api/v1/public/get-user (on the server)
    The Express route sends a response with a body that has a user object in JSON format to the page (via network, but the response is sent from the server to the server)
    The server renders a page with the user's email addresss (on the server)
    The server sends a rendered page to the browser
    The browser displays a server-side rendered page with the user's email (on the browser)

- Getting signed request API:

    has static method updateProfile for User model
    uses Mongoose API methods to define this static method
    final req-res cycle is between API server and MongoDB Atlas server

- Updating profile API:

    has "standalone" signRequestForUpload method
    uses AWS S3 API getSignedUrl method
    final req-res cycle is between API server and AWS S3 server

Why do we need to get this so-called "signed request"? Why can't we just upload the file to our server (for example, our API server)? We could do this, but then we would need to properly store files in MongoDB. In addition, when end users add or retrieve files, we would need to temporarily keep these files in the RAM memory of our MongoDB Atlas server and API server (also in our APP server's memory for server-side rendered pages). This is not a viable setup for a scalable web application. Thus, we outsource file management to AWS S3.


## Next && Express 
We chose the Next.js framework for many benefits it offers: server-side rendering, routing for pages, compiling, etc. Our current web application has a hybrid server - there are two servers, and both listen to incoming requests:

    The Next.js or next server deals with requests for pages and static files.
    The Express.js or express server deals with API requests (data manipulation, CRUD tasks)

In other words:

    End users who load pages make the next server busy.
    End users who CRUD data (submit forms, delete Posts, edit Discussions) make the express server busy.

- But due to Node.js's fundamental property of being single-threaded, our next and express servers are mutually blocking.

Let's say your web application gets popular and many people navigate between pages - that would make the next server clogged with tasks and moreover will block the express server. End users that load many pages will block CRUD tasks. The opposite is also true - heavy CRUDing in your web application on the express server will block page rendering (and loading as a result) since the next server will be blocked.

The solution is to decouple tasks. We can make one server responsible for requests to pages and make a new, second server deal with API requests. We can call our current web application, which is located at book/3-begin/app, APP. And we can call a new server, which will deal with API requests, API.


- Order matters for an Express.js server. Not only does the order of Express routes matter, but also the order of Express middleware matters. If you move server.use(express.json()); middleware under all Express routes, then you will get an Invalid JSON error.

- To make BUCKET_FOR_AVATARS available on the browser, you have to update the /app/next.config.js file:

## Javascript Promises
- In JavaScript, a Promise object is a special object that has state and result properties, as well as methods (e.g. resolve and reject methods). Here's some good documentation for Promise object and its properties:

https://javascript.info/promise-basics

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

This is how a Promise works:

    A Promise object initially has state: "pending", result: undefined.
    When a Promise's method resolve (for example, resolve("Resolved")) is called, the object parameters become state: "fulfilled", result: "Resolved".
    When a Promise's method reject (for example, reject("Rejected")) is called, the object parameters become state: "rejected", result: "Rejected".



# Scaling Node.js Server
- https://async-await.com/article/how-to-scale-a-node-js-server-isolate-expensive-tasks-in-forked-process


## MongoDB

- MongoDB database stores data as a so-called Document. The format of the Document is BSON. BSON is a binary representation of JSON data:
- Mongoose Schema allows you to define the shape of the MongoDB Document
-In Mongoose, Model is a class:

https://mongoosejs.com/docs/api.html#model_Model

- In Mongoose, we call the model method to create a subclass of Mongoose Model:
'''const User = mongoose.model('User', mongoSchema);'''
- 

- An instance of the User Model is a Mongoose Document, which is also a class. A Mongoose Document represents a one-to-one mapping to documents as stored in MongoDB:

- In MongoDB, a collection contains documents (e.g. the users collection contains user documents). When you want to find one document in a database by say the _id parameter - the database has to scan each document, which has many parameters, within the entire collection (a so-called collection scan). This can be time consuming. An index is a data structure that stores values for only one or a few parameters - so our database saves time by scanning an index instead of performing a collection scan. However, we have to configure MongoDB to create an index for certain parameters.

- single field, unique single field, compound, and unique compound 

## Mongoose
- mongoose handles data type validation for mongoDB

## Jest 

- https://jestjs.io/
- Jest's configuration can be defined in the package.json file of your project, or through a jest.config.js, or jest.config.ts file
-  testPathIgnorePatterns option allows us to not execute automated tests (in other words, ignore) located inside the book/4-begin/api/production-server folder.
- The ts-jest preset that allows us to use Jest for TypeScript code.


## AWS
- For any AWS API service, be it S3 or SES, we have to configure AWS with two environmental variables (AWS_ACCESSKEYID and AWS_SECRETACCESSKEY) and a region. AWS services are per region, meaning that your AWS dashboard and API setup may look completely different for different regions. 

## AWS S3
- AWS S3 requires us to generate a unique signedRequest using AWS_ACCESSKEYID and AWS_SECRETACCESSKEY parameters, among others. We have to generate signedRequest before uploading a file to AWS S3. AWS_ACCESSKEYID and AWS_SECRETACCESSKEY parameters can be found on your AWS dashboard.

- We generate signedRequest by sending a request (that has all necessary information) from our API server to an AWS S3 server. This request is sent to the https://${bucket}.s3.amazonaws.com/${prefix}/${randomStringForPrefix}/${fileName} API endpoint (we discuss every parameter later in this section). The AWS S3 server sends back a response that contains signedRequest.

- Once the API server has signedRequest, we can send a second request to the AWS S3 server. signedRequest is a unique API endpoint to which our web application can send a file. We send our second request to the AWS S3 server. This second request contains an uploaded file and is sent to the signedRequest API endpoint. The final destination for the uploaded file is signedRequest.url. We save signedRequest.url as a new avatarUrl of a user document in our MongoDB database. 

## Image Upload
- Image file represented by a file-like object called a blob
- We can adjust the parameters of this object (like resizing image)
- https://developer.mozilla.org/en-US/docs/Web/API/Blob

## App
- In our APP project, any environmental variable inside the .env file is available anywhere on the server but not on the browser
- General pattern for page rendering:
```javascript
// some imports go here

type Props = { user: { email: string; displayName: string } };

class Index extends React.Component<Props> {
  public static async getInitialProps() {
    // some JS/TS code goes here
  }

  public render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Index page</title>
          <meta name="description" content="This is a description of the Index page" />
        </Head>
        // some HTML/React/Material-UI code goes here
      </Layout>
    );
  }
}

export default Index;
```
-  code in the API project always runs on the server and never on the browser (client). That's why you always see us referring to API as API server. Contrary to this, code in the APP project can run on the server and on the browser. Why is that? That's because the Next.js framework for React has both server-side and client-side rendered pages. In other words, it is important to understand where an initial request comes from.

## Cookies, Session, and Auth
- cookie only gets saved to the browser when an initial request to the page comes from the browser.
- the session object gets created by the server and is not accessible on the browser. This object is a unique object. When an end user loads a page of your web application, the server creates a unique session object.
- can store unique user-related data in the session object
- When an end user has a cookie object saved to the browser, the API server will receive this cookie with an initial request because of the code we wrote earlier in /app/lib/api/sendRequestAndGetResponse.ts:
```javascript
if (request && request.headers && request.headers.cookie) {
  headers.cookie = request.headers.cookie;have
}
```
- The API server will use a unique cookie to find a unique session document in the database. From this unique session document, the API server will find a unique user document and save it to req.user. The API server will hold this user document in its memory as req.user. 
- API server creates session, and session is only accessible on the server
- Session Parameters:
  - name
  - secret
  - resave
  - saveUninitialized

  - name: name will become the name of the cookie object that will be attached to the response. As we discussed earlier, our API server not only creates a session object, but it also creates a corresponding cookie object that gets sent to the browser and saved to the browser. The parameter is optional. If you have multiple projects and cookies, you should give informative names to the cookies. 
  - secret: secret is a key that is used to encode a value for cookie. After cookie is saved to the browser, requests from the browser to our API server will contain cookie data. Our API server then decodes the value of cookie into session's id. Using the id of session, our API server finds a unique session document in our MongoDB database and then - since the session document contains the user id - finds and retrieves a unique user document from the datbase.
  - resave: resave forces the session to be saved to the database, even if the session was not modified. We set it to false.
  - saveUninitialized: saveUninitialized saves an uninitialized session to the database. An uninitialized session object is an object that was created but not modified in any way. We don't want our database to be overwhelmed with session documents that we don't use. Remember, every request to our API server will result in creating a session object, but we do not want to save any session object to the database. More on this later.

- Cookie parameters:
  - httpOnly
  - maxAge
  - secure
  - httpOnly: httpOnly: true means that cookie can be saved to the browser only with an HTTP response from the API server.
  - maxAge: maxAge: 14 * 24 * 60 * 60 * 1000 is how long a cookie will be stored on the browser, measured in milliseconds (unlike session.ttl, which is measured in seconds). 
  secure: secure set to false makes sure that once cookie exists on the browser, requests that are coming from the browser to the API server will contain cookie, even if the protocol is HTTP and not HTTPS. If secure: true, then the website must be secured with an SSL certificate (HTTPS) to send cookie with a request to the server



- Remember, every request to our API server will result in creating a session object, but we do not want to save any session object to the database

## Typescript 
- TypeScript does not check the type of data that comes from the server. 

## CORS
- need to add allowed origin from eventual production url on S3

## Google OAuth
- delegated authentication (Google Oauth) vs non-delegated (passwordless)
- secured with two step verification 

  - An end user clicks the login button on the Login page of our web application.
  - The browser sends req1 to API at the Express route /auth/google.
  - API calls the passport.authenticate method that sends res1 to the browser. This response asks the browser to redirect an end user to Google at a unique URL. This unique URL is generated by passport.
  - Google's website asks the end user to "Sign in with Google". If a user has more than one Google account, the user is offered to select a specific account (we will configure passport with a prompt parameter later in this section,since many people have more than one Google account).
  - After a user confirms their intent to log in with their Google account, Google's website sends req2 to the Google OAuth server.
  - The Google OAuth server sends res2 to the browser. This response contains Authorization Code and asks the browser to send req3 to our API server at the Express route /oauth2callback.
  - Our API server calls the passport.authenticate method that sends req4 to the Google OAuth server (unique URL generated by passport). This request contains Authorization Code.
  - The Google OAuth server sends res4 to our API server. This response contains an Access Token or error.
  - If API gets an Access Token from Google OAuth's server, then API sends res3 to the browse. This response asks the browser to redirect an end user to YourSettings page
  - If API gets an error response from Google OAuth's server, then API sends res3 to the browser. This time, the response asks the browser to redirect an end user to the Login page.

###### google passport 
  -  passport does multiple things. It generates a unique URL for redirecting an end user to Google's website. Passport is also responsible for sending requests to the browser and the Google OAuth server. How did we know when to call the passport.authenticate method? Because the passport official docs told us to call this method two times: once inside each Express route. 
  - passport populates req.user on our API server, not on APP. If we had a single-project architecture, we would be done and ready for testing. However, we have two projects. Thus, we need to pass user data from API to APP. We need to create an API method that will send a request from APP to API,as well as an Express route that sends a response containing user data from API to APP.

## AWS SES 
- In this book, we hardcode email templates into the code. When you start your API server (either locally or in production), our goal is to make the API server insert these hardcoded templates into our MongoDB database.

  - On the browser, a new end user clicks the LoginButton component on the Login page of our web application

  - This triggers an entire cascades of redirects, methods, and req-res cycles

  - Eventually, the static method signInOrSignUpViaGoogle of our User model gets called

  - Inside the signInOrSignUpViaGoogle method, we will call two methods: getEmailTemplate and sendEmail

  - getEmailTemplate will search for the welcome email template inside the emailtemplates collection of our MongoDB database

  - if getEmailTemplate successfully finds the welcome email template, it adds variable parameters to the template (in our case, the user's displayName)

  - next, the sendEmail method gets called with multiple arguments (email template is one of those arguments)

  - sendEmail calls the ses.sendEmail AWS SES API method:

  - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property

  - ses.sendEmail sends a request with the POST method from our API server to the AWS SES server

  - The AWS SES server sends an email to an Email server. In our case, it is Gmail server.

  - A newly signed-up user finds our welcome email inside their inbox web application on the browser. In our case, we will be checking our Gmail inbox on the browser.


## Business Communication
- It's important that you, as a business owner, specify in your business's terms of service that your business reserves the right to send an occasional communication to signed-up users and/or paying customers. It's also common to specify that your business will not share or sell email addresses. You should also add two features that make your app compliant with GDPR regulation:

    - allow end users to download all associated data with their accounts
    - allow end users to delete their accounts and all associated data

## Mailchimp
- All code is on our API server, there is no code on our APP project. In other words, Mailchimp API is server-only infrastructure.
- We will use the fetch method that we learned about in Chapter 3. In Chapter 3, we used fetch to define sendRequestAndGetResponse that sends requests and receives responses. For server-side rendered pages, fetch deals with a req-res cycle between the APP server and API server. For client-side rendered pages, fetch deals with a req-res cycle between the APP browser and API server. In Mailchimp API, we will use fetch to send a request with the POST method from our API server to the Mailchimp server.
- Once we define a server-side addToMailchimp method, we simply add it to two static methods for our User model: signInOrSignUpViaGoogle and signInOrSignUpByPasswordless.

## Further reading 
- principle of least privilege:

https://stackoverflow.com/questions/53153170/when-to-use-private-protected-methods-in-typescript-with-react


- ```ctx``` (context) properties:
    - We can access a request and its headers with ctx.req and ctx.req.headers, respectively. We can access a cookie saved to the browser with ctx.req.headers.cookie. We took the value of ctx.req.headers.cookie and assigned it to headers.cookie.
    - app/lib/api/sendRequestAndGetResponse.ts will indeed take an opts argument, extract cookie (if any) and send it to our API server

## Reference:
```https://builderbook.org/books/saas-boilerplate```
