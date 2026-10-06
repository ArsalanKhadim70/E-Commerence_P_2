// // src/cloudinary.js

// const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// /**
//  * Upload single image to Cloudinary
//  * @param {File} file - Image file from input
//  * @returns {Promise<string>} - Secure URL of uploaded image
//  */
// export const uploadImageToCloudinary = async (file) => {
//   try {
//     if (!file) {
//       throw new Error("No file provided");
//     }

//     if (!file.type.startsWith("image/")) {
//       throw new Error("Only image files are allowed");
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       throw new Error("Image size must be less than 5MB");
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);
//     formData.append("folder", "forever-products");

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to upload image");
//     }

//     const data = await response.json();
//     return data.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };

// /**
//  * Upload multiple images
//  * @param {FileList | File[]} files - Array of image files
//  * @returns {Promise<string[]>} - Array of secure URLs
//  */
// export const uploadMultipleImages = async (files) => {
//   try {
//     const fileArray = Array.from(files);
//     const uploadPromises = fileArray.map((file) => uploadImageToCloudinary(file));
//     const urls = await Promise.all(uploadPromises);
//     return urls;
//   } catch (error) {
//     console.error("Multiple upload error:", error);
//     throw error;
//   }
// };






const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload single image to Cloudinary
 * @param {File} file - Image file from input
 * @returns {Promise<string>} - Secure URL of uploaded image
 */
export const uploadImageToCloudinary = async (file) => {
  try {
    // 1. Check if environment variables exist
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      console.error("Cloudinary Env Missing:", { CLOUD_NAME, UPLOAD_PRESET });
      throw new Error("Cloudinary configuration missing in environment variables");
    }

    // 2. Validate File
    if (!file) {
      throw new Error("No file provided");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET.trim());

    // 3. Cloudinary API Call
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME.trim()}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    // 4. Handle Detailed API Errors
    if (!response.ok) {
      console.error("Cloudinary Detailed Response Error:", data);
      throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
    }

    console.log("Cloudinary Upload Success:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload catch error:", error.message || error);
    throw error;
  }
};

/**
 * Upload multiple images
 * @param {FileList | File[]} files - Array of image files
 * @returns {Promise<string[]>} - Array of secure URLs
 */
export const uploadMultipleImages = async (files) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }

    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map((file) => uploadImageToCloudinary(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Multiple upload error:", error);
    throw error;
  }
};