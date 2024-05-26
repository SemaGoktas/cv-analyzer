"use client";

import React, { useState, useCallback } from "react";

interface CVUploadProps {
  onFileSelect: (file: File | null) => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFile = (file: File | null) => {
    if (file && file.type !== "application/pdf") {
      alert("Lütfen sadece PDF dosyası yükleyiniz.");
      setFileName(null);
      onFileSelect(null);
      return;
    }
    setFileName(file?.name ?? null);
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-lg font-medium text-gray-700">
        CV PDF Yükleyin:
      </label>

      {/* Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${
          isDragOver ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
        }`}
      >
        <p className="text-gray-600">
          Dosyanızı buraya sürükleyip bırakın veya aşağıdan seçin.
        </p>
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Dosya Seç
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {fileName && (
        <p className="text-green-600 font-medium">
          Seçilen dosya: <strong>{fileName}</strong>
        </p>
      )}
    </div>
  );
};

export default CVUpload;
