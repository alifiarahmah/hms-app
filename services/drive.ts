import { google } from 'googleapis';

const oAuth2Client = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const driveService = google.drive({
  version: 'v3',
  auth: oAuth2Client,
});
