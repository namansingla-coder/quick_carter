import React, {memo, useContext} from 'react';
import { CreateContext } from './CartProvider';
import {  CreateUser } from './UserDetail';
import Logo from "./images/Q.png"
import { GrShop } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
function Header(){
  const {totalCount} = useContext(CreateContext);
    const {user,setUser} = useContext(CreateUser);
    let logoutClass = "";
    let loginClass = "hidden";
    if(!user){
      logoutClass = "hidden"; 
      loginClass = "";
    }
    function logout(){
      localStorage.setItem("token","");
      setUser();
    }
    return(
        <div id="header" className="flex justify-between py-4 sm:mx-16 h-18" >
        <img className="h-12" src={Logo} />
        <div className='flex self-center gap-8 relative mr-8'>
          <Link to="/my_cart">
        <GrShop className='absolute text-4xl text-orange-400'/>
        <p className='relative left-2.5 top-2.5 text-orange-400'>{totalCount}</p>
        </Link>
        <Link to="/login">
        <IoPersonOutline className={'text-3xl relative top-1 '+loginClass}/>
        </Link>
        <button onClick={logout} className={"relative top-1 border rounded-md bg-red-500 text-white px-2 py-1 "+logoutClass}>Logout</button>
        </div>
      </div>
    )
}
export default memo(Header);