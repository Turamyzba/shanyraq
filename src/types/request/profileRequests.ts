export interface EditProfileRequest {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    phoneNumber?: string;
    gender?: "MALE" | "FEMALE";
  }
  
  export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
  }
  
  export interface AddPasswordRequest {
    password: string;
  }
  
  export interface UploadPhotoRequest {
    file: string;
  }