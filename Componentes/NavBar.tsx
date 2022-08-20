import React from "react";

interface NavBarProps {
    
}

const NavBar = ({}:NavBarProps) => {
    const handleClick = () => {
        window.location.reload();
    }
    return(
        <div 
            className="bg-[#141414ff] sticky top-0 h-[50px] w-screen z-10"
        >
            <img 
                className="rounded-lg bg-transparent absolute left-4 top-[6.5px] h-9 w-9 hover:cursor-pointer hover:scale-105" 
                src="Build-Computer-Icon.png"
                onClick={() => handleClick()}
            />
            <em className="absolute left-[57.5px] top-[12.5px] text-blue-500">
                PC Builder
            </em>
        </div>
    )
}

export default NavBar;