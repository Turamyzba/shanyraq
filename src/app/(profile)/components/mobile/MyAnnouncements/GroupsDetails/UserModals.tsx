// components/mobile/MyAnnouncements/GroupsDetails/UserModals.tsx

import React from "react";
import { Modal, Button } from "antd";
import { User, ActionModalContent } from "./types";
import styles from "./GroupsDetails.module.scss";

interface UserModalsProps {
  selectedUser: User | null;
  isQuestionnaireModalVisible: boolean;
  isCoverLetterModalVisible: boolean;
  isActionModalVisible: boolean;
  actionModalContent: ActionModalContent;
  onCloseQuestionnaireModal: () => void;
  onCloseCoverLetterModal: () => void;
  onCloseActionModal: () => void;
}

const UserModals: React.FC<UserModalsProps> = ({
  selectedUser,
  isQuestionnaireModalVisible,
  isCoverLetterModalVisible,
  isActionModalVisible,
  actionModalContent,
  onCloseQuestionnaireModal,
  onCloseCoverLetterModal,
  onCloseActionModal,
}) => {
  return (
    <>
      <Modal
        title="Анкета"
        open={isQuestionnaireModalVisible}
        onCancel={onCloseQuestionnaireModal}
        footer={[
          <Button key="close" onClick={onCloseQuestionnaireModal}>
            Закрыть
          </Button>,
        ]}
        width="90%"
      >
        {selectedUser?.questionnaire && (
          <div className={styles.questionnaireModal}>
            <div className={styles.userHeaderInfo}>
              <div
                className={styles.userAvatarLarge}
                style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${selectedUser.id})` }}
              />
              <h3>{selectedUser.username}</h3>
            </div>

            {selectedUser.questionnaire.answers.map((item, index) => (
              <div key={index} className={styles.questionAnswer}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        title="Сопроводительное письмо"
        open={isCoverLetterModalVisible}
        onCancel={onCloseCoverLetterModal}
        footer={[
          <Button key="close" onClick={onCloseCoverLetterModal}>
            Закрыть
          </Button>,
        ]}
        width="90%"
      >
        {selectedUser && (
          <div className={styles.coverLetterModal}>
            <div className={styles.userHeaderInfo}>
              <div
                className={styles.userAvatarLarge}
                style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${selectedUser.id})` }}
              />
              <h3>{selectedUser.username}</h3>
            </div>
            <p className={styles.coverLetterText}>{selectedUser.coverLetter}</p>
          </div>
        )}
      </Modal>

      <Modal
        title={actionModalContent.action === "accept" ? "Заявка принята" : "Заявка отклонена"}
        open={isActionModalVisible}
        onCancel={onCloseActionModal}
        footer={[
          <Button key="close" onClick={onCloseActionModal} type="primary">
            Закрыть
          </Button>,
        ]}
        width="90%"
      >
        <div className={styles.actionModalContent}>
          <p>{actionModalContent.message}</p>
        </div>
      </Modal>
    </>
  );
};

export default UserModals;
