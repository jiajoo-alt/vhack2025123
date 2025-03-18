import React from "react";
import styles from "./BottomNavBar.module.css";
import navBarItems from "../navBarItems";
import { FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { LuScan } from "react-icons/lu";

interface BottomNavBarProps {
  toggle: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ toggle }) => {
  const location = useLocation();

  return (
    <div className={styles.bottomNavContainer}>
      <div className={styles.bottomNavWrapper}>
        {navBarItems.slice(0, 2).map((item, index) => (
          <Link 
            to={item.link} 
            key={index} 
            className={`${styles.bottomNavLinks} ${location.pathname === item.link ? styles.active : ""}`}
            onClick={toggle}
          >
            <div className={styles.navItem}>
              <span className={styles.navIcon}>{item.icon}</span>
            </div>
          </Link>
        ))}

        {/* Centered Scan Icon */}
        <div className={styles.scanIconContainer}>
          <Link to="/scan" className={styles.scanIconLink}>
            <LuScan className={styles.scanIcon} />
          </Link>
        </div>

        {navBarItems.slice(2, 5).map((item, index) => (
          <Link
            to={item.link}
            key={index + 2}
            className={`${styles.bottomNavLinks} ${location.pathname === item.link ? styles.active : ""}`}
            onClick={toggle}
          >
            <div className={styles.navItem}>
              <span className={styles.navIcon}>{item.icon}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
