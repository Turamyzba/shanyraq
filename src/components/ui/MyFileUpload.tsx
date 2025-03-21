"use client";

import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Image, Upload, Button, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface FileUploadProps {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  maxCount?: number;
}

const getBase64 = (file: FileType): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MyFileUpload: React.FC<FileUploadProps> = ({ photos, setPhotos, maxCount = 8 }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize fileList from photos on mount and when photos changes
  useEffect(() => {
    if (photos && photos.length > 0) {
      const newFileList = photos.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: 'done' as const,
        url: url,
      }));
      setFileList(newFileList);
    } else {
      setFileList([]);
    }
  }, [photos]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // Fix duplication by not updating the fileList on upload
    if (!uploading) {
      setFileList(newFileList);
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    
    // Update the parent component's photos array
    const newPhotos = newFileList
      .filter(file => file.status === 'done')
      .map(file => file.url || '');
    
    setPhotos(newPhotos);
    return true;
  };

  // Custom request to handle file uploads
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      setUploading(true);
      // Simulate upload process
      const base64 = await getBase64(file);
      
      // Add to fileList
      const newFile = {
        uid: `-${Date.now()}`,
        name: file.name,
        status: 'done' as const,
        url: base64,
      };
      
      const newFileList = [...fileList, newFile];
      setFileList(newFileList);
      
      // Update parent photos array
      const newPhotos = newFileList
        .filter(file => file.status === 'done')
        .map(file => file.url || '');
      
      setPhotos(newPhotos);
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess("ok");
          setUploading(false);
        }, 500);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      setUploading(false);
      message.error('Не удалось загрузить файл');
    }
  };

  const handleDeleteAll = () => {
    setFileList([]);
    setPhotos([]);
  };

  // Custom upload button to match your design
  const uploadButton = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <UploadOutlined className="text-4xl text-[#1AA683]" />
        <p className="text-sm text-[#252525]">
          <span className="text-[#1AA683]">Нажмите</span>, чтобы загрузить,
          или перетащите.
        </p>
        <p className="text-sm text-[#B5B7C0]">
          Минимум количество 5
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto flex flex-col">
      {/* Custom styles for Ant Design Upload component */}
      {fileList.length > 0 && (
        <div className="flex justify-between items-center mt-6 mb-4">
          <span className="text-sm font-semibold text-[#252525] m-0">Загруженные фотографии</span>
          <Button 
            type="text" 
            danger 
            onClick={handleDeleteAll}
            className="p-0 h-auto hover:bg-transparent hover:underline"
          >
            Удалить все
          </Button>
        </div>
      )}
      
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}


      <style jsx global>{`
        .ant-upload-select {
          width: 100% !important;
          height: 180px !important;
          margin-right: 0 !important;
          margin-bottom: 0 !important;
          border: 2px dashed #ccc !important;
          background-color: transparent !important;
          transition: border 0.3s ease;
        }
        
        .ant-upload-select:hover {
          border: 2px dashed #1AA683 !important;
        }
      `}</style>

      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        onRemove={handleRemove}
        multiple
        className="w-full"
        accept="image/*"
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      
      
    </div>
  );
};

export default MyFileUpload;