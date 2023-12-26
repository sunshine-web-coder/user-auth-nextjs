"use client";

import { Avatar, Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import axios from "axios";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/actions";
import { toast } from "react-toastify";
import { countriesData } from "@/constants";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import useLogout from "../Logout";

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
      const response = await axios.put(
        `http://localhost:3000/api/user/updateUserById/${user._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      dispatch(updateUser(response.data.user));

      toast.success("profile updated successfully");
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
        } else {
          // Handle other 401 errors
          toast.error("Invalid credentials");
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
          defaultValue={user?.profession || "add profession"}
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
          defaultValue={new Date(user?.dateOfBirth).toLocaleDateString("en-US")}
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
