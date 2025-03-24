import { Outlet } from "react-router";
import Navbar from "../components/AppNavbar/Navbar";
import Sidebar from "../components/AppSidebar/components/Sidebar/sidebar";
import React from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import Footer from "../components/FooterApp/Footer";

export default function Markup() {
    return (
        <>
            <div className="container-fluid px-3 px-md-4 pt-2 pt-md-1" >
                <Navbar />
                <div className="d-flex">
                    <Sidebar />
                    <Outlet />
                    <ScrollTop className="bg-transparent scroll-to-top" />
                </div>
            </div>
            <Footer />
        </>
    )
}