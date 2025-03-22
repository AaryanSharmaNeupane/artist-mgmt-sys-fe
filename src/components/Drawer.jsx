import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { GiLoveSong } from "react-icons/gi";
import { useLayoutContext } from "../context/LayoutContextProvider";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";

export const Drawer = () => {
  const { showMenu, setEditData, setShowMenu } = useLayoutContext();
  const navigate = useNavigate();

  const menuData = [
    { id: 1, menu: "Dashboard", routerLink: "/", icon: <MdDashboard /> },
    { id: 2, menu: "Users", routerLink: "/user", icon: <FiUsers /> },
    {
      id: 3,
      menu: "Artists",
      routerLink: "/artist",
      icon: <GiLoveSong />,
    },
  ];

  const handleMenuClick = (route) => {
    setShowMenu(true);
    setEditData(null);
    navigate(route);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-drawerColor transition-all duration-300 ${
          showMenu ? "w-1/5" : "w-[5%]"
        }`}
      >
        <ul className="p-4 space-y-4">
          {menuData.map(({ id, menu, routerLink, icon }) => (
            <li
              key={id}
              className="flex items-center cursor-pointer p-3 hover:bg-gray-200 rounded-lg transition-all"
              onClick={() => handleMenuClick(routerLink)}
            >
              <span className="text-[24px] text-[#4a528f]">{icon}</span>
              {showMenu && <span className="ml-4 px-4 font-bold">{menu}</span>}
            </li>
          ))}
        </ul>
      </aside>

      <main
        className={`transition-all duration-300 ${
          showMenu ? "w-4/5" : "w-[95%]"
        }`}
      >
        <AllRoutes />
      </main>
    </div>
  );
};
