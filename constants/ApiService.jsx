import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (formData) => {
  try {
    const response = await apiService.post("/user/register", formData);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const updateUserProfileImage = async (
  slug,
  userId,
  imageFile,
  accessToken,
) => {
  try {
    // // Fetch user's current profile image URL
    // const userResponse = await apiService.get(`/user/getUserBySlug/${slug}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const currentImageUrl = userResponse.data.profileImage;

    // console.log(currentImageUrl);

    // // Delete the previous image from Cloudinary
    // if (currentImageUrl) {
    //   const publicId = currentImageUrl.split("/").pop().split(".")[0];
    //   await axios.post(
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/delete_by_token`,
    //     { public_id: publicId },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`,
    //       },
    //     },
    //   );
    // }
    
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
    );

    const uploadImg = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );

    const imageUrl = uploadImg.data.secure_url;

    const response = await apiService.put(
      `/user/updateUserById/${userId}`,
      { profileImage: imageUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const linkResetPassword = async (formData) => {
  try {
    const response = await apiService.post("/user/link_resetpassword", formData);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};