"use client"; 
import { useState } from "react";
import { DM_Sans } from "next/font/google";

import "./globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <div className="layout">
          <div className="row">
            <div className="col-12">
              <div className="row navbar-holder">
                <div className="col-12">
                  <Navbar />
                </div>
              </div>
              <div className="row app-holder">
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="d-block d-md-none sidebar-toggle-btn"
                        onClick={toggleSidebar}
                      >
                        <i className="bi bi-list"></i>
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className={`col-2 sidebar-col ${
                        isSidebarOpen ? "sidebar-open" : ""
                      }`}
                    >
                      <Sidebar />
                    </div>

                    <div className="col page-holder">
                      <main>{children}</main>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
