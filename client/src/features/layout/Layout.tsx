import React, { useContext } from "react";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "duck";
import {
  Button,
  LoginIcon,
  ListIcon,
  EyeIcon,
  SelectTimeline,
  SelectScale
} from "components";
import styles from "./Layout.module.css";

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  const { isAuth, logout } = useContext(AppContext);
  const history = useHistory();
  const logoutHandler = () => {
    logout();
    history.push("/");
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      {children}
      <div className={styles.menuWrapper}>
        {window.location.pathname === "/" && (
          <>
            <SelectScale />
            <SelectTimeline />
          </>
        )}
        <Link to="/">
          <Button variant="secondary">
            <EyeIcon />
            <span className={styles.sub}>Show Timeline</span>
          </Button>
        </Link>
        {!isAuth ? (
          <Link to="/auth">
            <Button variant="secondary">
              <LoginIcon />
              <span className={styles.sub}>Sign In</span>
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/timeline-list">
              <Button variant="secondary">
                <ListIcon />
                <span className={styles.sub}>List Of Timelines</span>
              </Button>
            </Link>
            <Button variant="secondary" onClick={logoutHandler}>
              <LoginIcon className={styles.logout} />
              <span className={styles.sub}>Log Out</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
