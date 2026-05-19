import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../utils/asyncHandler.js';

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadStudyMaterial = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required' });

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(201).json({
      message: 'Cloudinary not configured. Stored in memory for local testing only.',
      fileName: req.file.originalname,
      size: req.file.size,
    });
  }

  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(base64, { folder: 'erp/materials' });
  res.status(201).json({ url: result.secure_url, publicId: result.public_id });
});
