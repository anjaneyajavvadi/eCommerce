import userModel from "../models/userModel.js";

const saveUserAddress = async (userId, address) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) return null;

    const fullName = `${address.firstName} ${address.lastName}`.trim();

    const exists = user.addresses.some(
      (addr) =>
        addr.name === fullName &&
        addr.street === address.street &&
        addr.city === address.city &&
        addr.state === address.state &&
        addr.zipCode === address.zipCode &&
        addr.country === address.country &&
        addr.phoneNumber === address.phoneNumber
    );

    if (!exists) {
      user.addresses.push({
        name: fullName,                // ✅ store combined
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        phoneNumber: address.phoneNumber,
      });
      await user.save();
    }

    return user;
  } catch (err) {
    console.error("Error saving address:", err);
    throw err;
  }
};


const getUserAddressess=async(req,res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        res.json({success:true,addresses:user.addresses});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
}

export {saveUserAddress,getUserAddressess};