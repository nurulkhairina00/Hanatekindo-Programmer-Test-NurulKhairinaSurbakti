import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import Link from "next/link";

function componentSidebar() {
  return (
    <>
      <aside id="sidebar">
        <div className="h-100">
          <div className="sidebar-logo d-none d-md-block">
            <Link href="/">Hanatekindo</Link>
            <ul className="sidebar-nav">
              <li className="sidebar-header">Users</li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <IoPeopleSharp className="text-white pe-2" size={25} />
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center pt-5 d-md-none">
            <IoPeopleSharp className="text-white mt-4" size={25} />
          </div>
        </div>
      </aside>
    </>
  );
}

export default componentSidebar;
