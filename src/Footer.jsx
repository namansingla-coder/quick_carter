import React, {memo} from 'react';
function Footer(){
    return(
    <div className="bg-gray-500 flex justify-between sm:px-8 py-4">
        <p className="text-white">Copyright 2024 | CodeYogi</p>
        <p className="text-white">Powered by CodeYogi</p>
        
      </div>
);}
export default memo(Footer);