import React, { useState, useEffect, useContext } from "react";
import { Link} from 'react-router-dom';
import Cart from "./cart_product_detail";
import { ImSpinner6 } from "react-icons/im";
import SelfModifiedInput from "./selfModifiedInput";
import NormalButton from "./Button/NormalButton";
import { CreateContext } from "./CartProvider";
function cart(){
    const {cart,updateCart,convertProducts} = useContext(CreateContext);
    const [carts,setCart] = useState(cart);

    const [cart_products,setCarts] = useState([]);
    useEffect(()=>{
        setCarts(convertProducts)
    },[convertProducts]);
   
    const totalCount =  cart_products.reduce(function(previous,current){
        return previous + current.quantity*current.product.price;
    },0)

   function handle_count(id,dummy_count){
    const d = [...cart_products];
    const x = {...cart};
    x[id] = dummy_count;
    for(let i=0;i<d.length;i++){
        if(d[i].product.id==id){
            d[i].quantity = dummy_count;
        }
    }
    setCart(x);
    setCarts(d);
   }
   function handle_cart(){
    const m = {...carts};
    const keys_array = Object.keys(m);
    for(let i=0;i<keys_array.length;i++){
        if(m[keys_array[i]]==0){
            delete m[keys_array[i]];
        }
    }
    updateCart(m);
   }
   if(Object.keys(cart).length==0){
    return (
        <div className="flex flex-col gap-6 items-center">
        <h1 className="bold text-3xl">Your Cart Is Empty</h1>
        <Link to="/">{<NormalButton name="Home" />}</Link>
        </div>
    )
}
    return(
        <div className="flex flex-col gap-8 bg-gray-100 py-8 justify-center grow">
            <Link to="/" className="self-center">{<NormalButton name="Home" extraclasses="bg-orange-600" />}</Link>
        <div className="w-[90%] self-center border rounded-md flex flex-col gap-4 bg-white py-12 px-12 h-[90%]">
        
        <div className="border border-gray-200 rounded-md flex flex-col bg-white">
            <div className="flex pl-[248px] py-2  pr-12 gap-12 bg-gray-200">
                <h3 className="bold text-xl grow">Name</h3>
                <h3 className="bold text-xl w-20">Price</h3>
                <h3 className="bold text-xl w-20">Quantity</h3>
                <h3 className="bold text-xl w-20">Subtotal</h3>
            </div>
                <hr />
                {cart_products.length==0 && <ImSpinner6 className="text-5xl mx-auto animate-spin"/>}
               {cart_products.length>0 && cart_products.map(function(item){
                    return(
                        <div key={item.product.id}>
                        <Cart  cart={item.product} quantity={item.quantity} dummy_quan={handle_count}/>
                        </div>
                    )
                })}
            <div className="flex py-2 justify-between px-2">
                <div className="flex gap-2">
                    <SelfModifiedInput extraClasses="py-1 px-2 border rounded-md" labelClasses="sr-only" label="Coupon" id="Coupon" type="text" placeholder="Coupon Code" />
                    <NormalButton name="Apply Coupon" />
                </div>
                <button onClick={handle_cart} className="border rounded-md bg-red-500 px-6 text-white">Update Cart</button>
            </div>
        </div>
        <div className="border self-end  flex flex-col gap-3 min-w-80 max-w-96  pb-2 bg-white">
            <h1 className="px-2 pt-2 bold text-xl">Cart totals</h1>
            <hr />
            <div className="flex flex-col gap-2">
            <div className="px-2 flex gap-16">
                <h2>Subtotal</h2>
                <h2>${totalCount.toFixed(2)}</h2>
            </div>
            <hr />
            <div className="px-2 flex gap-16">
                <h2>Total</h2>
                <h2>${totalCount.toFixed(2)}</h2>
            </div>
            <hr />
            </div>
            <NormalButton name="Proceed To Checkout"/>
        </div>
        </div>
        </div>
        
    )
}
export default cart;