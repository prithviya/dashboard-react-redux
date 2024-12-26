import React, { useState } from 'react';
import Pics from '../imag';
import Patient from './Patient';

function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('patients'); // Set 'patients' as the default active menu

    const menuItems = [
        { name: 'overview', icon: 'home' },
        { name: 'patients', icon: 'people' },
        { name: 'schedule', icon: 'event' },
        { name: 'message', icon: 'message' },
        { name: 'transaction', icon: 'credit_card' },
    ];

    return (
        <div className="h-[97vh] overflow-hidden"> {/* Ensures the overall layout takes up 98vh */}
            <nav className="bg-[#ffffff] text-white px-4 py-2 flex items-center justify-between m-5 rounded-full border">
                {/* Left Logo */}
                <div className="flex items-center">
                    <img src={Pics.LOGO} alt="Logo" />
                </div>

                {/* Center Menu */}
                <ul className="hidden md:flex space-x-6">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => setActiveMenu(item.name)} // Update the active menu on click
                        >
                            <a
                                href="/#"
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${activeMenu === item.name
                                    ? 'bg-[#01F0D0] text-[#072635]' // Highlighted background for active menu
                                    : 'text-[#072635] hover:bg-[#f5f7fa]'}`
                                }
                            >
                                <span className="material-icons text-xl">{item.icon}</span>
                                <span className="text-sm capitalize">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Profile */}
                <div className="flex items-center space-x-2">
                    <img
                        src={Pics.PROFILE}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border border-gray-200"
                    />
                    <a
                        href="/#"
                        className="flex flex-col items-center text-[#072635] space-x-2"
                    >
                        <span className="text-sm capitalize font-bold">
                            Dr. Jose Simmons
                        </span>
                        <span className="text-sm capitalize text-[#707070]">
                            General Practitioner
                        </span>
                    </a>
                    <a href="/#" className="flex items-center text-[#072635] space-x-2">
                        <span className="material-icons text-xl">settings</span>
                        <span className="material-icons text-xl">more_vert</span>
                    </a>
                </div>
            </nav>

            {/* Patient Component: Use overflow-auto here to allow scrolling inside this section */}
            <div className="h-full">
                <Patient />
            </div>
        </div>
    );
}

export default Dashboard;
