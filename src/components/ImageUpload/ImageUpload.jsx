/**
 * Image Upload Component
 * 
 * Drag & drop image upload with preview
 */

import { FaCloudUploadAlt, FaTimes, FaImage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useImageUpload } from '../../hooks/useImageUpload';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ onImagesChange, maxFiles = 5 }) => {
  const { t } = useTranslation();
  const {
    images,
    uploading,
    progress,
    isDragActive,
    getRootProps,
    getInputProps,
    removeImage,
  } = useImageUpload({
    maxFiles,
    onUploadComplete: onImagesChange,
  });

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${
          uploading ? styles.uploading : ''
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className={styles.uploadProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{t('upload.uploading', { progress })}</span>
          </div>
        ) : isDragActive ? (
          <div className={styles.dropMessage}>
            <FaCloudUploadAlt className={styles.dropIcon} />
            <p>{t('upload.dropHere')}</p>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <FaImage className={styles.placeholderIcon} />
            <p className={styles.placeholderText}>{t('upload.dragDrop')}</p>
            <p className={styles.placeholderSubtext}>{t('upload.or')}</p>
            <button type="button" className={styles.browseButton}>
              {t('upload.browse')}
            </button>
            <p className={styles.hint}>
              {t('upload.hint', { max: maxFiles })}
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className={styles.preview}>
          {images.map((image) => (
            <div key={image.id} className={styles.previewItem}>
              <img src={image.url} alt={image.name} className={styles.previewImage} />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeImage(image.id)}
                aria-label={t('upload.remove')}
              >
                <FaTimes />
              </button>
              <span className={styles.imageName}>{image.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
