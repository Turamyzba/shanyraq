import React, { useState } from "react";
import { Button, Collapse } from "antd";
import styles from "./GroupDetails.module.scss";

interface Member {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  date: string;
  avatar: string;
  isOwner?: boolean;
}

interface GroupProps {
  group: {
    id: number;
    name: string;
    members: Member[];
    isUserMember: boolean;
    isUserGroupCreator: boolean;
  };
  onLeaveGroup?: () => void;
}

const { Panel } = Collapse;

const GroupCard: React.FC<GroupProps> = ({ group, onLeaveGroup }) => {
  const avatarLimit = 3;
  const displayedAvatars = group.members.slice(0, avatarLimit);
  const hasMoreAvatars = group.members.length > avatarLimit;

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitle}>
          <h3>{group.name}</h3>
          <div className={styles.avatarsRow}>
            {displayedAvatars.map((member, index) => (
              <div
                key={member.id}
                className={styles.avatar}
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})`,
                  zIndex: avatarLimit - index,
                }}
              />
            ))}
            {hasMoreAvatars && (
              <div className={styles.moreAvatars}>+{group.members.length - avatarLimit}</div>
            )}
          </div>
        </div>

        {group.isUserMember && (
          <div className={styles.userStatus}>
            {group.isUserGroupCreator ? (
              <span className={styles.creatorBadge}>Вы создатель группы</span>
            ) : (
              <span className={styles.memberBadge}>Вы участник группы</span>
            )}
          </div>
        )}
      </div>

      <Collapse className={styles.collapse} expandIconPosition="end" bordered={false}>
        <Panel header="Участники группы" key="1" className={styles.collapsePanel}>
          <div className={styles.membersList}>
            {group.members.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberInfo}>
                  <div
                    className={styles.memberAvatar}
                    style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
                  />
                  <div className={styles.memberData}>
                    <div className={styles.memberName}>
                      {member.name}
                      {member.isOwner && <span className={styles.ownerBadge}>Хозяин жилья</span>}
                    </div>
                    <div className={styles.memberEmail}>{member.email}</div>
                  </div>
                </div>

                <div className={styles.memberDetails}>
                  <div className={styles.memberDetail}>
                    <span className={styles.detailLabel}>Возраст</span>
                    <span className={styles.detailValue}>{member.age}</span>
                  </div>
                  <div className={styles.memberDetail}>
                    <span className={styles.detailLabel}>Контакты</span>
                    <span className={styles.detailValue}>{member.phone}</span>
                  </div>
                  <div className={styles.memberDetail}>
                    <span className={styles.detailLabel}>Дата</span>
                    <span className={styles.detailValue}>{member.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>

      {onLeaveGroup && (
        <div className={styles.leaveGroupSection}>
          <Button onClick={onLeaveGroup} className={styles.leaveGroupButton} danger>
            Покинуть группу
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
