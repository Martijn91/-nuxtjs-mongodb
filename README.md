# MongoDB Nuxt Module

MongoDB Nuxt (3) Module to connect Nuxt Front-end to a MongoDB Database using Nitro server engine and global defined Nuxt plugins for a fast, easy and extensive integration.


## Key Features

- Easy integration by adding full Connection String within Nuxt Options, or add credentials / params to let module auto-generate the connection string
- Default API endpoint implemeneted for communication to Nitro server where requests get handled towards MongoDB
- Request handling from Nitro server to MongoDB to keep credentials safe and serverside all the time
- Out of the box Nuxt plugins added by module for easy implementation within clientside and execute CRUD operation
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
