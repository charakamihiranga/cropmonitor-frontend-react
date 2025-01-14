import React from 'react';
import Navigation from "./Navigation.tsx";
import {Outlet} from "react-router-dom";

function RootLayout() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Navigation/>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:ml-80">
                <Outlet/>
            </main>
        </div>
    );
}

export default RootLayout;