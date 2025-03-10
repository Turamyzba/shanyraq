"use client";
import React from "react";
import Container from "@/components/layouts/Container";
import Filter from "./Filter";
import HomeCard from "@/components/common/Card";
import Images from "@/components/common/Images";
import styles from "./Apartments.module.scss";
import { Select, SelectItem } from "@heroui/react";

// Using mock data for the cards
const mockAnnouncements = [
  { announcementId: 1, title: "Apartment 1", description: "Cozy apartment in downtown" },
  { announcementId: 2, title: "Apartment 2", description: "Spacious apartment with balcony" },
  { announcementId: 3, title: "Apartment 3", description: "Modern studio apartment" },
  { announcementId: 4, title: "Apartment 4", description: "Luxury apartment with sea view" },
  { announcementId: 5, title: "Apartment 5", description: "Affordable apartment" },
  { announcementId: 6, title: "Apartment 6", description: "Bright and airy apartment" },
];

export default function ApartmentsPage() {
  // Static UI value (dropdown closed, no error, no loading)
  const selectedSort = "Самые подходящие";

  return (
    <Container>
      <div className={styles.wrapper}>
        {/* Left: Static Filter UI */}
        <Filter />

        {/* Right: Sort controls and Cards Grid */}
        <div className={styles.rightColumn}>
          <div className={styles.sortControls}>
            <div className="flex items-center gap-[12px] cursor-pointer">
              <p className={styles.sortText}>{selectedSort}</p>
              <Images.ChevronDown size={20} color={"#5c5c5c"} />
            </div>
            {/* (Dropdown UI not active in this static version) */}
            <button type="button">
              <Images.Map />
            </button>
          </div>
          {/* Uncomment the following to show the grid of cards */}
          {/*
          <div className={styles.gridContainer}>
            <div className={styles.cardGrid}>
              {mockAnnouncements.map((announcement) => (
                <HomeCard key={announcement.announcementId} card={announcement} />
              ))}
            </div>
          </div>
          */}
        </div>
      </div>
    </Container>
  );
}
