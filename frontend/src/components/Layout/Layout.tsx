// import React from 'react';

// import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";



const Layout = () => {
    return (
        <>
            <header>
                <Header></Header>
            </header>
            <main >
                <Outlet/>
            </main>
            
        </>
    );
};

export default Layout;