/**
 * Cloudinary Service — server-side only
 *
 * Initializes Cloudinary SDK with env vars.
 * NEVER import this from client components.
 * API_SECRET is never exposed to the browser.
 */

import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Don't throw at build time — only throw at runtime if actually used without config
const isConfigured = !!(cloudName && apiKey && apiSecret);

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

// Export flag for runtime checks
export const isCloudinaryConfigured = isConfigured;

export { cloudinary };

/**
 * Folder convention: nauka-motion/projects/<projectSlug>/<type>
 */
export function buildCloudinaryFolder(projectSlug: string, type: string): string {
  return `nauka-motion/projects/${projectSlug}/${type}`;
}

/**
 * Build a deterministic public ID for cover/og (single asset per type).
 * For multi-asset types (gallery, desktop, mobile, section), use timestamp.
 */
export function buildPublicId(
  projectSlug: string,
  type: string,
  isUnique: boolean = false
): string {
  const folder = buildCloudinaryFolder(projectSlug, type);
  if (isUnique) {
    return `${folder}/${Date.now()}`;
  }
  return `${folder}/current`;
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload a file buffer to Cloudinary.
 * Server-side only — uses API_SECRET.
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  publicId: string,
  folder: string
): Promise<CloudinaryUploadResult> {
  if (!isConfigured) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.');
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: publicId,
          folder: folder,
          resource_type: 'image',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (!result) {
            reject(new Error('Cloudinary upload returned no result'));
            return;
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      )
      .end(fileBuffer);
  });
}

/**
 * Delete a Cloudinary asset by public_id.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!isConfigured) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.');
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (result?.result !== 'ok' && result?.result !== 'not found') {
        reject(new Error(`Cloudinary delete failed: ${result?.result}`));
        return;
      }
      resolve();
    });
  });
}
