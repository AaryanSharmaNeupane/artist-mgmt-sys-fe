import React, { useCallback } from "react";
import { IoIosMenu } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import { useLayoutContext } from "../context/LayoutContextProvider";

export const Header = () => {
  const { setShowMenu, showMenu } = useLayoutContext();

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [setShowMenu]);

  return (
    <section className="bg-primary text-txtprimary">
      <div className="container mx-auto px-6 py-2 ">
        <div className="flex justify-between items-center h-15">
          <div className="inline-flex items-center cursor-pointer">
            <button className="cursor-pointer" onClick={toggleMenu}>
              <IoIosMenu size={30} />
            </button>
          </div>
          <h1 className="font-semibold text-lg">Artist Management System</h1>
          <div className="inline-flex items-center cursor-pointer">
            <h1 className="px-2">Log out</h1>
            <FiLogOut />
          </div>
        </div>
      </div>
    </section>
  );
};
