# Overview
This projects proposed to present the oAuth Implicit Flow.
This flow allows the client application to get the authorization token from the Authorization Server
# Getting started
## 1. Generate credentials
1. Go to https://console.cloud.google.com/apis/credentials
2. Press on Create Credentials button and select oauth Client ID
3. Select Application type: Web application
4. Add the Authorized JavaScript origins (hostname of your server). For local development, add http://localhost:[PORT]
5. Add Authorized redirect URIs. This is the Redirect URI where you will be redirected after the oAuth process is completed. For local development add someting like http://localhost:[PORT]/home
6. Press on Create button
7. To view you credentials, press on the app name. (You should see the credentials: client_id and client_secret)

## 2. Setup project
1. Clone this repository
2. Add the .env file with the folowing vairables:
    - REACT_APP_CLIENT_ID={your client id} This must be the clientId from the created Google credentials
    - REACT_APP_OAUTH_REDIRECT_URI={redirect uri introduced when creating the credentials}
    - REACT_APP_OAUTH_RESPONSE_TYPE=token
    - REACT_APP_OAUTH_SCOPE=email
    - REACT_APP_GOOGLE_ACCOUNTS=https://accounts.google.com/o/oauth2/v2/auth
    - REACT_APP_GOOGLE_USER_INFO_URL=https://www.googleapis.com/oauth2/v3/userinfo
3. Run the project with `npm start` command and try it out
