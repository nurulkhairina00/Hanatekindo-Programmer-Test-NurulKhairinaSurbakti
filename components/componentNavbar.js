/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

function componentNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // state dropdown

  // handle togle dropdown
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // logout
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <nav className="navbar px-3 border-bottom">
        <button className="btn border-0" id="sidebar-toggle" type="button">
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="ml-auto">
          <button
            className="btn nav-icon border-0"
            onClick={handleToggleDropdown}
          >
            <Image
              src="/profile.png"
              alt="profile"
              width={35}
              height={35}
              className="img-fluid"
            />
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu dropdown-menu-end show">
              <li>
                <a
                  style={{ fontSize: "11px" }}
                  className="dropdown-item"
                  onClick={logoutHandler}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default componentNavbar;
