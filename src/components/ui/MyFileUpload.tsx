"use client";

import React, { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Image, Upload, Button, Spin, Progress } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useUploadFilesMutation } from "@/store/features/addAnnouncement/announcementApi";
import { RcFile } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

  const [uploadFiles] = useUploadFilesMutation();
  
  // Initialize fileList from photos on mount and when photos changes
  useEffect(() => {
    if (photos && photos.length > 0) {
      const newFileList = photos.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done" as const,
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

  // This is a controlled upload now - we'll update the list manually
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // We don't update fileList here anymore - will be managed by our custom handlers
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);

    const newPhotos = newFileList
      .filter((file) => file.status === "done")
      .map((file) => file.url || "");

    setPhotos(newPhotos);
    return true;
  };

  const uploadFilesToServer = async (files: FileType[]): Promise<string[]> => {
    if (!files || files.length === 0) return [];
    
    const formData = new FormData();
    
    setUploadingFiles(files.map(file => file.name));
    setUploadProgress(0);
    
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await uploadFiles(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      console.log(response.data?.data);
      
      setTimeout(() => {
        setUploadingFiles([]);
        setUploadProgress(0);
      }, 500);
      
      return response.data?.data || [];
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadingFiles([]);
      setUploadProgress(0);
      throw error;
    }
  };

  // Completely disable the internal upload mechanism and handle it ourselves
  const customRequest = ({ onSuccess }: any) => {
    // Just mark as success, our beforeUpload will handle the actual upload
    if (onSuccess) {
      onSuccess("ok");
    }
  };

  const handleDeleteAll = () => {
    setFileList([]);
    setPhotos([]);
  };

  const beforeUpload = async (file: RcFile, uploadedFiles: RcFile[]) => {
    // We process the first file only to avoid duplicate processing
    // We identify the first file with its unique lastModified timestamp
    if (uploadedFiles.length > 0 && file === uploadedFiles[0]) {
      // We're the first file in this batch
      try {
        setUploading(true);
        
        // First add the files to the visual list as "uploading"
        const tempFileList = [...fileList];
        
        const uploadingItems = uploadedFiles.map((file) => ({
          uid: `-${Date.now()}-${file.name}`,
          name: file.name,
          status: "uploading" as const,
          percent: 0,
          originFileObj: file,
        }));
        
        setFileList([...tempFileList, ...uploadingItems]);
        
        // Then upload them all at once
        const fileUrls = await uploadFilesToServer(uploadedFiles);
        
        if (fileUrls && fileUrls.length > 0) {
          // Get all temp entries we just added
          const newFileListWithoutTemp = fileList.filter(
            (item) => !uploadingItems.some((tempItem) => tempItem.uid === item.uid)
          );
          
          // Create new entries with URLs from server
          const newFiles = await Promise.all(
            uploadedFiles.map(async (file, index) => {
              const base64Preview = await getBase64(file);
              return {
                uid: `-${Date.now()}-${index}`,
                name: file.name,
                status: "done" as const,
                url: fileUrls[index],
                preview: base64Preview,
              };
            })
          );
          
          const finalFileList = [...newFileListWithoutTemp, ...newFiles];
          setFileList(finalFileList);
          
          const newPhotos = finalFileList
            .filter((file) => file.status === "done")
            .map((file) => file.url || "");
          
          setPhotos(newPhotos);
        } else {
          // If upload failed, remove the temp entries
          setFileList(
            fileList.filter(
              (item) => !uploadingItems.some((tempItem) => tempItem.uid === item.uid)
            )
          );
        }
      } catch (error) {
        console.error("Error in file upload:", error);
      } finally {
        setUploading(false);
      }
    }
    
    // Return false to prevent the default upload behavior for ALL files
    return false;
  };

  const uploadButton = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {uploading ? (
          <LoadingOutlined className="text-4xl text-[#1AA683]" />
        ) : (
          <UploadOutlined className="text-4xl text-[#1AA683]" />
        )}
        <p className="text-sm text-[#252525]">
          {uploading ? (
            "Загрузка..."
          ) : (
            <>
              <span className="text-[#1AA683]">Нажмите</span>, чтобы загрузить, или перетащите.
            </>
          )}
        </p>
        <p className="text-sm text-[#B5B7C0]">Минимум количество 5</p>
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
            disabled={uploading}
          >
            Удалить все
          </Button>
        </div>
      )}

      {/* Upload progress indicator */}
      {uploadingFiles.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium mb-1">
              Загрузка {uploadingFiles.length} файлов...
            </p>
            <Progress percent={uploadProgress} status="active" strokeColor="#1AA683" />
            <div className="text-xs text-gray-500 mt-1">
              {uploadingFiles.slice(0, 2).map((name, i) => (
                <div key={i}>{name}</div>
              ))}
              {uploadingFiles.length > 2 && (
                <div>+{uploadingFiles.length - 2} ещё</div>
              )}
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
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
          border: 2px dashed #1aa683 !important;
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
        beforeUpload={beforeUpload}
        className="w-full"
        accept="image/*"
        disabled={uploading}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
    </div>
  );
};

export default MyFileUpload;