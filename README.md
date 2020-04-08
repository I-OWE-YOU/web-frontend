# tegoedje

## Project setup

`yarn install`

### Compiles and hot-reloads for development

`yarn serve`

### Lints and fixes files

`yarn lint`

Also, a lint-staged preCommit gitHook will run prettier and stylelint before
being able to commit inconsistencies, so check the Git output in your console
if you're unable to stage your changes.

### Deployment to AWS S3

The deployment of the application is straight forward.
First you need to build the application with the following command

`yarn build:prod`

This command will build the application in production mode.
This means it will read the `.env.production` as primary env file, and fallback to `.env`

After the build is complete, run the following command

`yarn deploy:prod`

This will deploy the application to S3 and invalidate the CloudFront cache, but only
if this is enabled

By default the config for the deployment is located in `vue.config.js` with some defaults.
The defaults are for the **dev** environment. This configs can be overridden with `.env` file

This applies for all environments, like **production**, **dev**, and **testing**.
And also if you have `.env.local`

```javascript
VUE_APP_S3D_AWS_PROFILE = stagingadmin
VUE_APP_S3D_REGION = eu - west - 1
VUE_APP_S3D_BUCKET = stagingbucket
VUE_APP_S3D_CREATE_BUCKET = true
VUE_APP_S3D_UPLOAD_CONCURRENCY = 5
```

In most cases you should only override the **AWS_PROFILE** and the **BUCKET**.
