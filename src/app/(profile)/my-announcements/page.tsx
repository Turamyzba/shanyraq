"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { message } from "antd";
import {
  useArchiveAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetMyActiveAnnouncementsQuery,
  useGetMyArchivedAnnouncementsQuery,
  useRestoreAnnouncementMutation,
} from "@/store/features/myAnnouncements/announcementApi";
import { MyAnnouncementsListResponse } from "@/types/response/myAnnouncementResponses";
import DesktopAnnouncementsList from "../components/desktop/MyAnnouncements/AnnouncementsList";
import MobileAnnouncementsList from "../components/mobile/MyAnnouncements/AnnouncementsList";

const MyAnnouncements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [activeAnnouncements, setActiveAnnouncements] = useState<any[]>([]);
  const [archivedAnnouncements, setArchivedAnnouncements] = useState<any[]>([]);

  const isDesktop = useMediaQuery({ minWidth: 992 });

  const { data: activeData, isLoading: activeLoading } = useGetMyActiveAnnouncementsQuery();
  const { data: archivedData, isLoading: archivedLoading } = useGetMyArchivedAnnouncementsQuery();

  const [archiveAnnouncement] = useArchiveAnnouncementMutation();
  const [restoreAnnouncement] = useRestoreAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const formatAnnouncements = (data: MyAnnouncementsListResponse | undefined): any[] => {
    if (!data) return [];

    return data.map((announcement) => ({
      id: announcement.announcementId,
      title: announcement.title,
      address: announcement.address,
      date: announcement.arriveDate,
      roomCount: parseInt(announcement.roomCount),
      genderRestriction: announcement.selectedGender,
      roommatesCount: announcement.roommates,
      price: announcement.cost,
      image: announcement.image,
      applicationCount: announcement.applicationCount || 0,
    }));
  };

  useEffect(() => {
    if (activeData?.data) {
      setActiveAnnouncements(formatAnnouncements(activeData.data));
    }
  }, [activeData]);

  useEffect(() => {
    if (archivedData?.data) {
      setArchivedAnnouncements(formatAnnouncements(archivedData.data));
    }
  }, [archivedData]);

  const handleTabChange = (tab: "active" | "archived") => {
    setActiveTab(tab);
  };

  const handleArchive = async (id: number) => {
    try {
      await archiveAnnouncement(id).unwrap();

      const announcementToArchive = activeAnnouncements.find((a) => a.id === id);

      setActiveAnnouncements((prev) => prev.filter((a) => a.id !== id));

      if (announcementToArchive) {
        setArchivedAnnouncements((prev) => [announcementToArchive, ...prev]);
      }

      message.success("Объявление успешно архивировано");
    } catch (error) {
      console.error("Failed to archive announcement:", error);
      message.error("Не удалось архивировать объявление");
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await restoreAnnouncement(id).unwrap();

      const announcementToRestore = archivedAnnouncements.find((a) => a.id === id);

      setArchivedAnnouncements((prev) => prev.filter((a) => a.id !== id));

      if (announcementToRestore) {
        setActiveAnnouncements((prev) => [announcementToRestore, ...prev]);
      }

      message.success("Объявление успешно восстановлено");
    } catch (error) {
      console.error("Failed to restore announcement:", error);
      message.error("Не удалось восстановить объявление");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id).unwrap();

      setArchivedAnnouncements((prev) => prev.filter((a) => a.id !== id));
      message.success("Объявление успешно удалено");
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      message.error("Не удалось удалить объявление");
    }
  };

  const announcements = activeTab === "active" ? activeAnnouncements : archivedAnnouncements;
  const isLoading = activeTab === "active" ? activeLoading : archivedLoading;

  const AnnouncementsList = isDesktop ? DesktopAnnouncementsList : MobileAnnouncementsList;

  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <AnnouncementsList
          announcements={announcements}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onArchive={handleArchive}
          onRestore={handleRestore}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MyAnnouncements;
