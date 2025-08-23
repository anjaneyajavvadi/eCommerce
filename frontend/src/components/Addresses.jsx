import React, { useContext, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const Addresses = ({ checkout = false ,selectAddress}) => {
  const { addresses } = useContext(ShopContext);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="w-full sm:w-[90%] md:w-[40%] lg:w-[70%]">
      <div className="flex flex-col gap-3 mt-4 px-3">
        <Title text1={"SAVED"} text2={"ADDRESSES"} />

        {addresses.length > 0 ? (
          addresses.map((address, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 bg-white p-4 rounded-xl border ${
                checkout && selectedAddress === i
                  ? "border-black shadow-md"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {checkout ? (
                // ✅ Radio button for checkout
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === i}
                    onChange={() => {
                      setSelectedAddress(i);
                      if (checkout && selectAddress) {
                        selectAddress(address); // Pass selected address to parent
                      }
                    }}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-sm text-gray-700">
                      {address.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-800">
                      {address.street}, {address.city}, {address.state}{" "}
                      {address.zipCode}, {address.country}
                    </p>
                  </div>
                </label>
              ) : (
                // ✅ Simple list for profile
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">{address.name}</p>
                    <p className="text-sm text-gray-700">
                      {address.phoneNumber}
                      {address.mail}
                    </p>
                  </div>
                  <div className="text-sm text-gray-800 leading-5">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No saved addresses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Addresses;
