# Getting started

Expected node version is 22+.

Expected npm version is 10.5+

**Important pieces**

1. [storage.js](https://github.com/rorokimdim/instawork/blob/main/website/team/src/storage.js) handles talking to the server
2. [App.jsx](https://github.com/rorokimdim/instawork/blob/main/website/team/src/App.jsx) sets up the app routes and pages.

# Install dependencies

```bash
npm install
```

# Run locally

Make sure the django server is up and running as the website
depends on it.

Server URI is configured in `vite.config.js`.

Next, run

```bash
npm run dev
```

and open `http://localhost:5173/` in your browser.
