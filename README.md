<a href="https://www.mongodb.com/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" alt="MongoDB" width="150" /></a>
<a href="https://v3.nuxtjs.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuxt_logo.svg/1200px-Nuxt_logo.svg.png" alt="Nuxt" width="150" /></a>
# MongoDB Nuxt Module

MongoDB Nuxt (3) Module to connect Nuxt Front-end to a MongoDB Database using Nitro server engine and global defined Nuxt plugins for a fast, easy and extensive integration.


## Key Features

- Easy integration by adding full Connection String or add credentials / params
- Auto-generating URI / connection string
- Default server route implemented for communication to Nitro server where requests get handled towards MongoDB
- Request handling by Nitro server to keep credentials SSR and safe
- Out of the box Nuxt plugins added for easy implementation within clientside and execute CRUD operation
- Nuxt 3 support


## Setup
In order to use this module, please provide the following steps.


### 1. Add dependancy

Using yarn:
```
$ yarn add nuxt-mongodb
```

Using npm:
```
$ npm i nuxt-mongodb
```


### 2. Add Nuxt Options
add `nuxt-mongodb` to your Nuxt Options:

```javascript
// nuxt.config.ts

export default defineNuxtConfig({
  ...
  modules: ['nuxt-mongodb'],
  ...
})
```


### 3. Add MongoDB Connection String / Credentials
Either add the credentials either by adding values to `process.env` or `nuxt options`. Choose between adding `uri` or `params`.

#### Env Variables

##### Connection String
```dotenv
# URI
MONGODB_URI=""
```
- or - 
##### Params
```dotenv
# PARAMS
MONGODB_USERNAME=""
MONGODB_PASSWORD=""
MONGODB_HOST=""
MONGODB_DATABASE=""
MONGODB_OPTIONS=""
MONGODB_CLUSTER_URL=""
```

### Nuxt Options

#### Connection String
```javascript
// nuxt.config.ts

export default defineNuxtConfig({
  ...
  mongoDb: {
    uri: '', 
  }
  ...
})
```

#### Params
```javascript
// nuxt.config.ts

export default defineNuxtConfig({
  ...
  mongoDb: {
    username: '', 
    password: '', 
    host: '', 
    database: '', 
    options: '', 
    clusterUrl: '', 
  }
  ...
})
```
Please visit <a href="https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/#std-label-node-connection-options">the official MongoDB docs</a> for a complete overview of options


## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
