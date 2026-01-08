'use client';
import React, { FC, useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  isLoading: boolean;
  albumId: number;
}

const PhotoUpload: FC<PhotoUploadProps> = ({ onUpload, isLoading, albumId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const imageFiles = Array.from(fileList).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    await onUpload(files);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer block"
        >
          <Upload className="w-12 h-12 text-primary-500 mx-auto mb-3" />
          <p className="text-lg font-medium text-gray-700">
            Drag photos here or click to select
          </p>
          <p className="text-sm text-gray-500 mt-1">
            PNG, JPG, GIF, WebP up to 10MB
          </p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2 mb-4">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span className="text-sm text-gray-700 truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="w-full bg-gradient-primary text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </span>
            ) : (
              `Upload ${files.length} Photo${files.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;