"use client";

import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/actions";
import { toast } from "react-toastify";
import { countriesData } from "@/constants";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import useLogout from "../Logout";
import { updateUserById } from "@/constants/ApiService";

export default function EditProfile({ handleDrawerClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { handleLogout } = useLogout();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateUserById(user._id, data, accessToken);

      dispatch(updateUser(response.user));

      toast.success("Profile updated successfully");
      setIsLoading(false);
      handleDrawerClose();
    } catch (error) {
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
    <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("name")}
          label="Your full name"
          type="text"
          variant="bordered"
          defaultValue={user?.name}
        />
        {errors.name && (
          <span className="relative top-2 text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <Input
          {...register("profession")}
          label="Your profession"
          type="text"
          variant="bordered"
          defaultValue={user?.profession}
          placeholder="Add your profession"
        />
        {errors.profession && (
          <span className="relative top-2 text-red-500">
            {errors.profession.message}
          </span>
        )}
      </div>

      <div>
        <Input
          {...register("phoneNumber")}
          label="Phone Number"
          type="text"
          variant="bordered"
          defaultValue={user?.phoneNumber}
        />
        {errors.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber.message}</span>
        )}
      </div>

      <div>
        <Input
          {...register("dateOfBirth")}
          label="Date of Birth"
          type="text"
          variant="bordered"
          placeholder="MM/DD/YYYY"
          defaultValue={user?.dateOfBirth && new Date(user?.dateOfBirth)
            ? new Date(user?.dateOfBirth).toLocaleDateString("en-US")
            : "not added"}
        />
      </div>

      <div>
        <Autocomplete
          label="Select country"
          variant="bordered"
          defaultItems={countriesData}
          defaultSelectedKey={user?.nationality || "NG"}
          {...register("nationality")}
        >
          {(item) => (
            <AutocompleteItem
              key={item.value}
              startContent={
                <Avatar alt="Mexico" className="h-6 w-6" src={item.flag} />
              }
            >
              {item.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <div>
        <Textarea
          {...register("bio")}
          label="Add your bio"
          variant="bordered"
          defaultValue={user?.bio}
        />
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          type="submit"
          className={`w-full rounded-lg bg-[#111827] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          isDisabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
