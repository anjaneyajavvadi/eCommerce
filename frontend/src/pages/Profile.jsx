import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import Orders from "./Orders";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import ProfileDetails from "../components/ProfileDetails";
import Addresses from "../components/Addresses";

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);

  return (
    <div className="px-3">
      <div className="flex flex-col md:flex-row gap-10">
        <ProfileDetails/>
        <Addresses profile/>
      </div>

      <div className="flex flex-col gap-3 mt-4 px-3">
        <Orders />
      </div>
    </div>
  );
};

export default Profile;
