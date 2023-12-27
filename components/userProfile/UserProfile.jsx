"use client";

import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import RightDrawer from "../rightDrawer/RightDrawer";
import { useState } from "react";
import {
  CameraIcon,
  CopyIcon,
  EditIcon,
  ExternalLinkIcon,
} from "../svgIcons/SvgIcons";
import EditProfile from "../auth/EditProfile";
import EditSocial from "../auth/EditSocial";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { updateUser } from "@/redux/actions";
import { useForm } from "react-hook-form";
import useLogout from "../Logout";
import { profileDetails, socialLinks } from "@/constants";
import { updateUserProfileImage } from "@/constants/ApiService";
import ConfirmModal from "../modals/ConfirmModal";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accessToken = Cookies.get("accessToken")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSocialDrawerOpen, setIsSocialDrawerOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { handleLogout } = useLogout();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCopyToClipboard = (text) => {
    try {
      copy(text);
      toast.success("Link copied to clipboard:", text);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Error copying to clipboard:", error);
    }
  };

  const handleOpenConfirmModal= () => {
    onOpen();
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsSocialDrawerOpen(false);
  };

  const handleIsSocialDrawerOpen = () => {
    setIsSocialDrawerOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (!imageFile) {
      toast.error("Please choose a cover photo before uploading.");
      setIsLoading(false);
      return;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = imageFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Please choose a valid image file.");
      setIsLoading(false);
      return;
    }

    try {
      const imageUrl = await updateUserProfileImage(
        user.slug,
        user._id,
        imageFile,
        accessToken,
      );

      dispatch(updateUser(imageUrl.user));

      toast.success("Image updated successfully");
      setPreviewImg(null);
    } catch (error) {
      // Handle errors
      if (error?.response?.status === 401) {
        if (
          error?.response?.data?.message ===
          "Token has expired, please login again"
        ) {
          toast.error("Token has expired, please login again");
          handleLogout();
        }
      } else {
        console.error("An error occurred:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full overflow-hidden">
      <div className="flex flex-col border">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h5 className="border-b pb-2 text-lg font-semibold">
            Profile information
          </h5>
          <div className="relative flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5 flex items-center gap-4">
                <div>
                  <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                    <Avatar
                      isBordered
                      as="button"
                      className="h-[80px] w-[80px] transition-transform"
                      src={user?.profileImage}
                    />
                    <div className="upload-btn-wrapper relative top-[-30px] w-full">
                      <input
                        {...register("profileImage")}
                        type="file"
                        name="myfile"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button className="upload-btn flex w-full items-center justify-center border-0 bg-black/30 text-sm text-white">
                        <CameraIcon />
                      </button>
                    </div>
                  </div>
                  {previewImg && (
                    <Avatar
                      isBordered
                      className="h-[20px] w-[20px] transition-transform"
                      src={previewImg}
                    />
                  )}
                </div>

                <Button
                  color="primary"
                  type="submit"
                  className="bg-[#EA454C]"
                  isDisabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload New Avatar"}
                </Button>
              </div>
            </form>
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="w-full space-y-4 md:space-y-3">
                {profileDetails.map((userData) => (
                  <div
                    key={userData.key}
                    className="flex items-center justify-between gap-3 rounded-2xl border-2 px-[13px] py-2"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-xs" htmlFor={userData.key}>
                        {userData.name}
                      </label>
                      {userData.key === "dateOfBirth" ? (
                        <span className="text-sm">
                          {user?.[userData.key] &&
                          new Date(user?.[userData.key])
                            ? new Date(user?.[userData.key]).toLocaleDateString(
                                "en-US",
                              )
                            : "not added"}
                        </span>
                      ) : (
                        <span className="text-sm">
                          {user?.[userData.key] || "not added"}
                        </span>
                      )}
                    </div>
                    <div>
                      <EditIcon
                        className="right-3 top-4 cursor-pointer"
                        onClick={handleDrawerOpen}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full space-y-4 md:space-y-3">
                <p className="mb-3 text-sm font-semibold">SOCIAL LINKS</p>
                {socialLinks.map((link) => (
                  <div
                    key={link.key}
                    className="flex justify-between gap-3 rounded-2xl border-2 px-[13px] py-2"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-xs" htmlFor={link.key}>
                        {link.name}
                      </label>
                      <span className="text-sm">
                        {user?.social?.[link.key]
                          ? user.social[link.key]
                          : "not added"}
                      </span>
                    </div>
                    <div className="right-3 top-5 flex items-center gap-2 ">
                      <span
                        title="Copy to clipboard"
                        onClick={() =>
                          handleCopyToClipboard(user?.social?.[link.key])
                        }
                      >
                        <CopyIcon className="cursor-pointer" />
                      </span>
                      <a target="_blank" href={user?.social?.[link.key]}>
                        <ExternalLinkIcon />
                      </a>
                      <EditIcon
                        className="cursor-pointer"
                        onClick={handleIsSocialDrawerOpen}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <Button color="primary" type="submit" className="bg-[#EA454C]"
              onClick={handleOpenConfirmModal}
              >
                DELETE ACCOUNT
              </Button>
            </div>
          </div>

          <RightDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
            <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>
            <EditProfile handleDrawerClose={handleDrawerClose} />
          </RightDrawer>
          <RightDrawer isOpen={isSocialDrawerOpen} onClose={handleDrawerClose}>
            <h2 className="mb-4 text-xl font-bold">Edit Socials</h2>
            <EditSocial handleDrawerClose={handleDrawerClose} />
          </RightDrawer>
          <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </main>
      </div>
    </div>
  );
}
