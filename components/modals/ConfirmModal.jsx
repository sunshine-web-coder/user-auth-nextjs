import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserById } from "@/constants/ApiService";
import useLogout from "../Logout";
import Cookies from "js-cookie";

export default function ConfirmModal({ isOpen, onOpenChange }) {
  const user = useSelector((state) => state.auth.user);
  const accessToken = Cookies.get("accessToken")
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogout } = useLogout();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserById(user._id, accessToken);
      toast.success("Account deleted successfully");
      handleLogout();
    } catch (error) {
      if (error?.response?.status) {
        if (
          error?.response?.data?.message ===
          "Token has expired, please login again"
        ) {
          toast.error("Token has expired, please login again");
          handleLogout();
        }
        if (error?.response?.data?.message === "User not found") {
          toast.error("User not found");
        }
      } else {
        console.error("An error occurred:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      // Close the modal regardless of success or failure
      onOpenChange(false);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                You want to delete your account?
              </ModalHeader>
              <ModalBody>
                <h5 className="text-center">Account Deletion Confirmation</h5>
                <p className="text-center text-sm">
                  Are you sure you want to delete your account? This action is
                  irreversible, and all of your data will be permanently
                  removed.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-[#EA454C]"
                  onPress={handleDeleteAccount}
                  isDisabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete My Account"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
