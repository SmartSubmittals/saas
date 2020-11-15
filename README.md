- git 
- node 
- yarn
- eslint
- prettier 
- next.js 


## Server Side vs Client Side Rendering 
- https://async-await.com/article/server-side-vs-client-side-rendering-in-react-apps

 As mentioned earlier in this book, it is important for anyone who builds a Next.js web application to know the difference between server-side and client-side rendered pages (SSR and CSR, respectively).

When a user loads your Next.js application for the first time in his/her browser - we call this an initial load. A web page that gets loaded in this way (with initial load) is rendered on the server - we call it a server-side rendered page. That is a property of all Next.js applications.

After a user has loaded a Next.js application on his/her browser, this user may click a navigational link on the page to load another page from the application. A web page that gets loaded in this fashion is rendered on the browser - we call it a client-side rendered page.

## React Higher Order Components
- Bundling oft-used features into the react components that get loaded on every page. that way we define them once and allow for their use everywhere 
- i.e. Notifier and Confirmer