# UploadFlow

A polished file/image upload demo with drag-and-drop, client-side validation, previews, upload progress, and a local Express storage backend.

## Features

- Drag-and-drop or styled file picker
- JPG, PNG, WebP, and PDF validation
- 10 MB client/server size limit
- Image preview before upload
- Real XHR upload progress
- Express + Multer backend
- Uploaded files served from local `uploads/`
- Download/view link after success

## Run locally

```bash
npm install
npm run dev
```

In a second terminal:

```bash
node server.js
```

Open the Vite URL shown in the terminal.

> For production, replace local disk storage with S3, Cloudinary, or Firebase Storage and add authentication/access controls.
