import { showToast } from "../utils/notification";
import { useUploadPhotoMutation, useDeleteProfilePhotoMutation } from "@/store/features/profile/profileApi";

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Hook for handling profile photo operations
export const useProfilePhoto = () => {
  const [uploadPhoto, { isLoading: isUploading }] = useUploadPhotoMutation();
  const [deletePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();

  // Upload photo
  const handleUploadPhoto = async (file: File) => {
    try {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast({
          title: "Ошибка",
          description: "Размер файла не должен превышать 5MB",
          color: "danger"
        });
        return false;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        showToast({
          title: "Ошибка",
          description: "Пожалуйста, загрузите изображение в формате JPG или PNG",
          color: "danger"
        });
        return false;
      }

      // Convert to base64
      const base64 = await fileToBase64(file);
      
      // Upload to server
      const result = await uploadPhoto({
        file: base64
      }).unwrap();
      
      if (result) {
        showToast({
          title: "Успешно",
          description: "Фото профиля успешно загружено",
          color: "success"
        });
        return true;
      } else {
        showToast({
          title: "Ошибка",
          description: "Ошибка при загрузке фото",
          color: "danger"
        });
        return false;
      }
    } catch (error) {
      showToast({
        title: "Ошибка",
        description: "Ошибка при загрузке фото",
        color: "danger"
      });
      return false;
    }
  };

  // Delete photo
  const handleDeletePhoto = async () => {
    try {
      const result = await deletePhoto().unwrap();
      
      if (result) {
        showToast({
          title: "Успешно",
          description: "Фото профиля успешно удалено",
          color: "success"
        });
        return true;
      } else {
        showToast({
          title: "Ошибка",
          description: "Ошибка при удалении фото",
          color: "danger"
        });
        return false;
      }
    } catch (error) {
      showToast({
        title: "Ошибка",
        description: "Ошибка при удалении фото",
        color: "danger"
      });
      return false;
    }
  };

  return { 
    handleUploadPhoto, 
    handleDeletePhoto, 
    isUploading, 
    isDeleting 
  };
};