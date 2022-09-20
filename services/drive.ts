import { google } from 'googleapis';
import { Readable } from 'stream';

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

const uploadFile = async (file: Express.Multer.File, folderId: string, filename: string) => {
  const fileMetadata = {
    name: filename,
    parents: [folderId],
  };
  const media = {
    mimeType: file.mimetype,
    body: Readable.from(file.buffer),
  };

  const res = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });
  return res.data.id;
};

const deleteFile = async (fileId: string) => {
  const res = await driveService.files.delete({
    fileId: fileId,
  });
  return res.data;
};

const getFiles = async (folderId: string) => {
  const res = await driveService.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType, webViewLink, webContentLink)',
  });
  return res.data.files;
};

export { uploadFile, deleteFile, getFiles };
