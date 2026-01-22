/**
 * useImageUpload Hook
 * 
 * Provides image upload functionality with drag & drop
 */

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { storageService } from '../services/storageService';

export const useImageUpload = (options = {}) => {
  const {
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
    folder = 'posts',
    onUploadComplete,
  } = options;

  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * Handle file drop
   */
  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          file.errors.forEach((error) => {
            if (error.code === 'file-too-large') {
              toast.error(t('upload.fileTooLarge', { name: file.file.name }));
            } else if (error.code === 'file-invalid-type') {
              toast.error(t('upload.invalidType', { name: file.file.name }));
            }
          });
        });
        return;
      }

      // Check max files
      if (images.length + acceptedFiles.length > maxFiles) {
        toast.error(t('upload.maxFilesExceeded', { max: maxFiles }));
        return;
      }

      setUploading(true);
      setProgress(0);

      const newImages = [];
      const totalFiles = acceptedFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        try {
          const file = acceptedFiles[i];
          const result = await storageService.uploadImage(file, folder);
          
          newImages.push({
            id: result.path,
            url: result.url,
            path: result.path,
            name: file.name,
            size: file.size,
          });

          setProgress(Math.round(((i + 1) / totalFiles) * 100));
        } catch (error) {
          toast.error(error.message || t('upload.error'));
        }
      }

      setImages((prev) => [...prev, ...newImages]);
      setUploading(false);
      setProgress(0);

      if (onUploadComplete && newImages.length > 0) {
        onUploadComplete(newImages);
      }
    },
    [images, maxFiles, folder, t, onUploadComplete]
  );

  /**
   * Remove an image
   */
  const removeImage = useCallback(
    async (imageId) => {
      try {
        const image = images.find((img) => img.id === imageId);
        if (image) {
          await storageService.deleteImage(image.path);
          setImages((prev) => prev.filter((img) => img.id !== imageId));
          toast.success(t('upload.removed'));
        }
      } catch (error) {
        toast.error(error.message || t('upload.removeError'));
      }
    },
    [images, t]
  );

  /**
   * Clear all images
   */
  const clearImages = useCallback(async () => {
    try {
      const paths = images.map((img) => img.path);
      if (paths.length > 0) {
        await storageService.deleteImages(paths);
      }
      setImages([]);
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  }, [images]);

  /**
   * Dropzone configuration
   */
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize,
    maxFiles: maxFiles - images.length,
    noClick: false,
    noKeyboard: false,
  });

  return {
    images,
    uploading,
    progress,
    isDragActive,
    getRootProps,
    getInputProps,
    removeImage,
    clearImages,
    openFileDialog: open,
  };
};

export default useImageUpload;
