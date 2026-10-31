# Connecting a YouTube channel

This is the one-time setup needed before Orbit Studio can upload a video. Do not put the client secret in `index.html` or commit it to GitHub.

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project for Orbit Studio.
2. Open **APIs & Services → Library**, search for **YouTube Data API v3**, and enable it.
3. Open **APIs & Services → OAuth consent screen**. Choose the appropriate user type, fill in the app name/support email, add yourself as a test user while the app is in testing, and add the upload scope: `https://www.googleapis.com/auth/youtube.upload`.
4. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**. Select **Web application**.
5. Add the app's exact callback URL as an authorized redirect URI. For local development, this can be a route such as `http://localhost:3000/auth/google/callback`; production must use the final HTTPS URL. The configured value and the value in code must match exactly.
6. Store the client ID and client secret only in server-side environment variables. The browser should redirect the user to Google; the server exchanges the returned authorization code and securely stores the resulting token for that channel.
7. After the user signs in and consents, call `channels.list(mine=true)` to show the channel that will receive uploads. Keep the final upload as a separate, explicit user-approval action.
8. Upload the finalized MP4 with YouTube Data API `videos.insert`, using the `youtube.upload` scope. Set the title, description, privacy status, and made-for-kids setting deliberately before sending.

Google uses OAuth for this because publishing must be done on behalf of the selected YouTube account. A service account is not supported for this user-channel authorization flow.
