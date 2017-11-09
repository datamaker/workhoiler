# Meteor + Apollo + React + Redux + React-Router v3 + SSR boilerplate

A simple kit to start experimenting with Apollo, Meteor and React.

### Features
Authentication (Sign Up / Sign In)
Memo Creation / Manipulation (edit, delete, star)
User Search

### Includes
- Meteor v1.6
- GraphQL server running with Express bound to the Meteor app
- Apollo client
- React v16
- React-helmet
- React-router v3
- React-router-ssr
- React-router-redux
- React-addons-css-transition-group
- Redux
- Redux-thunk
- Immutability-helper
- Accounts UI, Basic & password
- ES6 Syntax
- ESLint
- ESLint-config-airbnb
- SCSS

Check `package.json` for specific versions

### Running it

```
meteor npm install
meteor
```

GraphiQL is enabled at [/graphiql](http://localhost:3000/graphiql).

### Folder structure
    .
    ├── client                  # Client files
    │   ├── styles              # Styles
    │   ├── main.html           # First loaded view pulling from imports
    │   └── main.js             # Imports all required files - React render
    ├── imports                 # A client/server folder
    │   ├── api                 #
    │   |  └── schema.js        # Schema & query definitions
    |   └── ui                  # UI React rendering
    │      └── App.js           # Component using `graphql` HOC
    │      └── Header.js        # Basic presentational component
    │      └── Loading.js       # Reusable loading component
    │      └── LoginForm.js     # Component using `withApollo` HOC
    ├── server                  # Server files
    │   └── server.js           # Main server file initiating Apollo server
    └── package.json            # node dependencies


### Learn more

- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)