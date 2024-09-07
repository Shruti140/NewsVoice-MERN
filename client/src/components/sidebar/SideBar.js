import './sidebar.css';
import { auth } from "../Auth/firebase";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { MdMessage, MdConnectWithoutContact} from "react-icons/md";
import { BiAnalyse} from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./sidebarMenu";
import Theme from "../theme/theme";
import { IoIosBusiness } from "react-icons/io";

const routes = [
  {
    path: "/NewsData",
    name: "Home",
    icon: <FaHome size={25}/>,
  },
  {
    path: "/startup",
    name: "Startup News",
    icon: <IoIosBusiness size={25} />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse size={25} />,
  },
  {
    path: "/addnews",
    name: "Add News",
    icon: <MdMessage size={25} />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation size={25} />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog size={25}/>,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser size={25}/>,
      },
    ],
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <MdConnectWithoutContact size={25}/>,
  },
  {
    path: "/saved",
    name: "Read Later",
    icon: <AiFillHeart size={25}/>,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  async function handleLogout() {
    try {
        await auth.signOut();
        window.location.href = "/login";
        console.log("User logged out successfully!");
        toast.success("User logged out Successfully", {
            position: "top-center",
        });
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
  }

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
  <>
    <div className="main-container">
      <motion.div animate={{width: isOpen ? "200px" : "45px", transition: {duration: 0.5,type: "spring",damping: 10,},}} className={`sidebar `}>
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo" >
                NewsVoice
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="bars">
            <FaBars onClick={toggle} size={25} />
          </div>
        </div>
        <div>
          <AnimatePresence>
            {isOpen && (
              <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                <div className='sidebar-theme'>Select a theme</div>
                <Theme/>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu setIsOpen={setIsOpen} route={route} showAnimation={showAnimation} isOpen={isOpen} />
              );
            }
            return (
              <NavLink to={route.path} key={route.id} className="link" activeclassname="active" aria-label="website-pages" >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
          <div className='link' onClick={handleLogout}>
            < GrLogout className='icon' size={25} />
            <AnimatePresence>
              {isOpen && (
                <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                  Logout
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  </>
  );
};

export default SideBar;