import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { StatusKey, statusLabels } from "./StatusLabels";
import styles from "../../layout.module.scss";

interface UserAvatarProps {
  status: StatusKey;
  size?: "normal" | "large";
  showEditIcon?: boolean;
  onEditClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  status,
  size = "normal",
  showEditIcon = false,
  onEditClick,
}) => {
  const avatarSize = size === "large" ? styles.largeAvatar : "";

  return (
    <div className={`${styles.avatarWrapper} ${avatarSize}`}>
      <div className={styles.photoCircle}>
        <img src="/avatar/image.png" alt="Profile Photo" />
        <svg viewBox="0 0 200 200" className={styles.circleSvg} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1aa683" />
              <stop offset="100%" stopColor="#28a745" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="5"
          />
          <path
            id="circlePath"
            fill="none"
            d="M 100,100 m -70,0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0"
          />
          <text
            fill="#fff"
            fontSize={size === "large" ? "20" : "18"}
            fontWeight="bold"
            stroke="#000"
            strokeWidth={size === "large" ? "4" : "3"}
            paintOrder="stroke"
          >
            <textPath href="#circlePath" startOffset="110" textAnchor="middle">
              {statusLabels[status]}
            </textPath>
          </text>
        </svg>
      </div>
      {showEditIcon && (
        <EditOutlined className={styles.editIcon} onClick={onEditClick ? onEditClick : undefined} />
      )}
    </div>
  );
};

export default UserAvatar;
