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


last checkpoint: [API infrastructure review](https://builderbook.org/books/saas-boilerplate/user-model-mongoose-and-mongodb-mongodb-index-jest-testing-your-settings-page-file-upload-to-aws-s3#api-infrastructure-for-updating-profile)


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


## Typescript 
- TypeScript does not check the type of data that comes from the server. 

## CORS
- need to add allowed origin from eventual production url on S3

## Further reading 
- principle of least privilege:

https://stackoverflow.com/questions/53153170/when-to-use-private-protected-methods-in-typescript-with-react