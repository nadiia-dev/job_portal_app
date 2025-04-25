import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { getNotifications, getProfile } from "../api/userApi";
import { RootState } from "../redux/store";
import { Badge } from "antd";

type MenuItem = {
  title: string;
  onClick: () => void;
  icon: JSX.Element;
  path: string;
};

const DeafultLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { reload, unread } = useSelector(
    (state: RootState) => state.notifications
  );
  const user = JSON.parse(localStorage.getItem("user")!);
  const [menuToRender, setMenuToRender] = useState<MenuItem[]>([]);

  const userMenu = useMemo(
    () => [
      {
        title: "Home",
        onClick: () => navigate("/"),
        icon: <i className="ri-home-7-line"></i>,
        path: "/",
      },
      {
        title: "Applied Jobs",
        onClick: () => navigate("/applied-jobs"),
        icon: <i className="ri-file-list-3-line"></i>,
        path: "/applied-jobs",
      },
      {
        title: "Posted Jobs",
        onClick: () => navigate("/posted-jobs"),
        icon: <i className="ri-file-list-2-line"></i>,
        path: "/posted-jobs",
      },
      {
        title: "Profile",
        onClick: () => navigate(`/profile/${user.id}`),
        icon: <i className="ri-user-2-line"></i>,
        path: "/profile",
      },
      {
        title: "Logout",
        onClick: () => {
          localStorage.removeItem("user");
          navigate("/login");
        },
        icon: <i className="ri-logout-box-r-line"></i>,
        path: "/login",
      },
    ],
    [navigate, user.id]
  );

  const adminMenu = useMemo(
    () => [
      {
        title: "Home",
        onClick: () => navigate("/"),
        icon: <i className="ri-home-7-line"></i>,
        path: "/",
      },
      {
        title: "Jobs",
        onClick: () => navigate("/admin/jobs"),
        icon: <i className="ri-file-list-2-line"></i>,
        path: "/admin/jobs",
      },
      {
        title: "Users",
        onClick: () => navigate("/admin/users"),
        icon: <i className="ri-user-2-line"></i>,
        path: "/admin/users",
      },
      {
        title: "Logout",
        onClick: () => {
          localStorage.removeItem("user");
          navigate("/login");
        },
        icon: <i className="ri-logout-box-r-line"></i>,
        path: "/login",
      },
    ],
    [navigate]
  );

  const getData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await getProfile(user.id);

      dispatch(hideLoading());
      if (response) {
        if (response.data?.isAdmin === true) {
          setMenuToRender(adminMenu);
        } else {
          setMenuToRender(userMenu);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user.id, dispatch, adminMenu, userMenu]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        dispatch(showLoading());
        await getNotifications();
        dispatch(hideLoading());
      } catch (e) {
        if (e instanceof Error) {
          dispatch(hideLoading());
        }
      }
    };
    loadNotifications();
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="sidebar justify-content-between flex">
        <div
          className="menu"
          style={{
            width: collapsed ? "40px" : "150px",
          }}
        >
          {menuToRender.map((item, index) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive && "active-menu-item"}`}
                onClick={item.onClick}
                key={index}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex items-center gap-2">
            {collapsed && (
              <i
                className="ri-menu-2-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            <span className="logo">JOB PORTAL APP</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <Badge
              count={unread?.length || 0}
              className="mx-5"
              onClick={() => navigate("/notifications")}
            >
              <i className="ri-notification-line"></i>
            </Badge>
            <span>{user?.name}</span>
            <i className="ri-shield-user-line"></i>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default DeafultLayout;
