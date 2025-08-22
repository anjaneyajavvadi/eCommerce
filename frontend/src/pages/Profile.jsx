import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import Orders from "./Orders";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [profileData, setProfileData] = useState({});
  const [editName, setEditName] = useState(false);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfileData(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/setProfile`,
        { name: profileData.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Profile updated!");
        setEditName(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="px-3">
      <div className="flex flex-col md:flex-row gap-10">

        <div className="flex flex-col gap-3 mt-4 px-3 w-full sm:w-[90%] md:w-[40%] lg:w-[30%]">
          <Title text1={"YOUR "} text2={"PROFILE"} />
          <div className="flex flex-col gap-4 border border-gray-200 rounded-2xl shadow-md p-4 bg-white">
            
    
            <div className="flex flex-row items-center gap-1">
              <span className="font-medium w-12">Name:</span>
              {editName ? (
                <input
                  className="col-span-2 border border-gray-300 rounded-md px-2 py-1 w-full"
                  type="text"
                  value={profileData.name || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              ) : (
                <span className="break-words">{profileData.name}</span>
              )}
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="font-medium w-12">Email:</span>
              <span className="break-words">{profileData.email}</span>
            </div>

            <div className="flex justify-end">
              {editName ? (
                <button
                  onClick={saveProfile}
                  className="bg-black text-white rounded-md hover:bg-white hover:text-black border border-black px-4 py-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditName(true)}
                  className="bg-black text-white rounded-md hover:bg-white hover:text-black border border-black px-4 py-2"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="w-full md:w-[60%] lg:w-[70%]">
          <div className="flex flex-col gap-3 mt-4 px-3">
            <Title text1={"SAVED"} text2={"ADDRESSES"} />
            <div className="w-full min-h-[100px] border border-gray-200 rounded-2xl shadow-md p-4 bg-white flex justify-center items-center text-gray-500">
              No Addresses Found
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 px-3">
        <Orders />
      </div>
    </div>
  );
};

export default Profile;
