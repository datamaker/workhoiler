# Meteor + React + Redux + React-Router v3 + SSR boilerplate

A simple kit to start experimenting with SSR, Meteor and React.

### Features
Authentication (Sign Up / Sign In)
Memo Creation / Manipulation (edit, delete, star)
User Search

### Includes
- Meteor v1.6.0.1
- React v16.2.0
- React-helmet
- React-router v3
- React-router-ssr
- React-router-redux
- React-transition-group
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

### Folder structure
    .
    ├── client                  # Client files
    │   ├── styles              # Styles
    │   ├── main.html           # First loaded view pulling from imports
    │   └── index.js            # Imports all required files - React render
    ├── imports                 # A client/server folder
    │   ├── api                 #
    │   |  └── schema.js        # Schema & query definitions
    |   └── ui                  # UI React rendering
    │      └── App.js           # Component using `graphql` HOC
    │      └── Header.js        # Basic presentational component
    │      └── Loading.js       # Reusable loading component
    │      └── LoginForm.js     # Component using `withApollo` HOC
    ├── server                  # Server files
    │   └── index.js            # Main server file initiating Apollo server
    └── package.json            # node dependencies

