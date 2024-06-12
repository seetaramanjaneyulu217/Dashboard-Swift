import React from "react";
import logo from '../assets/swift_logo.svg'
import { useSelector } from "react-redux";
import { UserDetails } from "../types";

const Header = () => {

    const user: UserDetails = useSelector((state: any) => state.user.user)

  return (
    <div className="bg-[#282846] flex justify-between px-36 py-5">
        <img src={logo} alt="logo" />

        <div className="flex items-center gap-x-3">
            <div className="text-[#4a5b77] text-xl font-semibold border border-white bg-white rounded-full w-11 h-11 flex justify-center items-center">{user.name?.split(' ')[0][0] + "" + user.name?.split(' ')[1][0]}</div>
            <div className="text-white">{user.name}</div>
        </div>
    </div>
  )
};

export default Header;
