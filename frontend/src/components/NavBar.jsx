import { Link, NavLink } from 'react-router-dom';
import {assets} from '../assets/assets'
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ThemeContext } from '../context/ThemeContext';
const NavBar = () => {
    const [visible,setVisible] = useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,location}=useContext(ShopContext);
    const {theme,toggleTheme}=useContext(ThemeContext);
    
  return (
    <div className="flex items-center justify-between py-5 font-medium">
        <Link to='/'><img src={assets.logo} className="w-36"alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>
        
        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} onClick={()=>setShowSearch(true)} className="w-5 cursor-pointer" alt="" />
            {token && (
                <div className='group relative'>
                    <Link to={'/profile'}>
                    <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />
                    </Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={() => toggleTheme()} className='cursor-pointer hover:text-black'>DarkMode</p>
                        <p
                        onClick={() => {
                            localStorage.removeItem("token");
                            setToken("");
                            navigate("/login");
                        }}
                        className='cursor-pointer hover:text-black'
                        >
                        Logout
                        </p>
                    </div>
                    </div>
                </div>
                )}
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
                {getCartCount() >0 &&<span className='absolute right-[-5px] bottom-[-5px] text-center w-4 leading-4 bg-black text-white rounded-full aspect-square text-[8px]'>{getCartCount()}</span>}
            </Link>
            {!token && location.pathname !== '/login' && <Link to={'/login'}><button className=' py-2 px-4 rounded cursor-pointer bg-black text-white'>Login/Signup</button></Link>}
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
        </div>
        {/* Sidebar menu for small screens*/}
        <div className={'absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all '+ (visible ? 'w-full' : 'w-0')}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>{setVisible(false)}} className='items-center flex gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180'/>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavBar;