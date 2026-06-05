'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileSelected, disabled = false }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, TXT, or Word document');
      return;
    }
    setFileName(file.name);
    onFileSelected(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-primary/30 hover:border-primary/50 bg-primary/5'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
          accept=".pdf,.txt,.doc,.docx"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-full">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <div className="text-center">
            {fileName ? (
              <>
                <p className="text-lg font-semibold text-foreground">
                  {fileName}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click to change resume
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-foreground">
                  Drop your resume here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse (PDF, TXT, DOC, DOCX)
                </p>
              </>
            )}
          </div>
        </div>

        {isDragActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
        )}
      </div>
    </motion.div>
  );
}
