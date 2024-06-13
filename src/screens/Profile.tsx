import React from "react";
import { GoArrowLeft } from "react-icons/go";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../types";
import { useSelector } from "react-redux";

const Profile = () => {

  const user: UserDetails = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[80%] mx-auto my-16">
      {/* for taking back to dashboard */}
      <div className="flex items-center gap-x-2 mb-7">
        <GoArrowLeft
          size={20}
          color="#4a5b77"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-xl font-montserrat font-medium text-[#4a5b77]">
          Welcome, {user.name}
        </p>
      </div>

      {/* for displaying details */}
      <div className="border rounded-3xl shadow-md shadow-[#f5f5f5] py-10 font-roboto">
        <div className="w-2/5 xl:w-4/5 mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-x-3 mb-7">
          <div className="text-[#4a5b77] font-semibold text-2xl border border-[#f5f5f5] bg-[#f5f5f5] rounded-full h-20 w-20 flex justify-center items-center">
            {user.name?.split(" ")[0][0] + "" + user.name?.split(" ")[1][0]}
          </div>

          <div className="flex flex-col gap-y-2 text-[#4a5b77]">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-y-4 items-center justify-between w-[80%] mx-auto mb-5">
          <InputBox type="text" label={"User ID"} value={user.id!} />
          <InputBox type="text" label={"Name"} value={user.name!} />
        </div>

        <div className="flex flex-col xl:flex-row gap-y-4 items-center justify-between w-[80%] mx-auto mb-5">
          <InputBox type="text" label={"Email ID"} value={user.email!} />
          <InputBox
            type="text"
            label={"Address"}
            value={
              user.address?.street! +
              ", " +
              user.address?.suite +
              ", " +
              user.address?.city
            }
          />
        </div>

        <div className="flex justify-center items-center xl:justify-start xl:items-start w-[80%] mx-auto">
          <InputBox type="text" label={"Phone"} value={user.phone!} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
