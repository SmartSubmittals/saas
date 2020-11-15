- git 
- node 
- yarn
- eslint
- prettier 
- next.js 
- express


## Server Side vs Client Side Rendering 
- https://async-await.com/article/server-side-vs-client-side-rendering-in-react-apps

 As mentioned earlier in this book, it is important for anyone who builds a Next.js web application to know the difference between server-side and client-side rendered pages (SSR and CSR, respectively).

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
