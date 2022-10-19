# front-end SPA application

## About

This is a VueJS SPA application with a large portion of the OIDC/OAuth 2 code borrowed from the [MSAL Vue 3 example](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/vue3-sample-app/).

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run dev
```

Optionally, to run the dark variant of the Brewz SPA app: `npm run dev:dark`.

To show the security features of the app (sign in, etc), you will need to navigate to `/config` in the Brewz app, set the **Enable Security** checkbox, then refresh your browser.

### Compiles and minifies for production

```shell
npm run build
```

### Run unit tests

```shell
npm run test:unit
```

### Create unit test coverage report

```shell
npm run test:coverage
```

### Lints and fixes files

```shell
npm run lint
```

### Audit and fix security issues

```shell
npm audit fix
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
