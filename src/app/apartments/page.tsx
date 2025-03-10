"use client";
import React, { useState } from "react";
import Container from "@/components/layouts/Container";
import Filter from "./Filter";
import Card from "@/components/common/Card";
import Images from "@/components/common/Images";
import styles from "./Apartments.module.scss";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import MyButton from "@/components/ui/MyButton";
import MySelect from "@/components/ui/MySelect";

const sortItems = [
  { value: "1", label: "Самые подходящие" },
  { value: "3", label: "По новизне" },
  { value: "4", label: "По убыванию цены" },
  { value: "2", label: "По возрастанию цены" },
];

const mockAnnouncements = [
  {
    id: 1,
    title: "Уютная квартира в центре",
    cost: "180 000",
    image: "/apartment1.jpg",
    address: "Алматы, Самал-2",
    selectedGender: "Мужчины",
    roomCount: 2,
    roommates: 1,
    arriveDate: "01.04.2024",
  },
  {
    id: 2,
    title: "Современная студия",
    cost: "220 000",
    image: "/apartment2.jpg",
    address: "Астана, Байконур",
    selectedGender: "Любой",
    roomCount: 1,
    roommates: 2,
    arriveDate: "10.03.2024",
  },
  {
    id: 3,
    title: "Комната с панорамным видом",
    cost: "150 000",
    image: "/apartment3.jpg",
    address: "Шымкент, Аль-Фараби",
    selectedGender: "Женщины",
    roomCount: 3,
    roommates: 1,
    arriveDate: "05.04.2024",
  },
  {
    id: 4,
    title: "Уютная квартира в центре",
    cost: "180 000",
    image: "/apartment1.jpg",
    address: "Алматы, Самал-2",
    selectedGender: "Мужчины",
    roomCount: 2,
    roommates: 1,
    arriveDate: "01.04.2024",
  },
  {
    id: 5,
    title: "Современная студия",
    cost: "220 000",
    image: "/apartment2.jpg",
    address: "Астана, Байконур",
    selectedGender: "Любой",
    roomCount: 1,
    roommates: 2,
    arriveDate: "10.03.2024",
  },
  {
    id: 6,
    title: "Комната с панорамным видом",
    cost: "150 000",
    image: "/apartment3.jpg",
    address: "Шымкент, Аль-Фараби",
    selectedGender: "Женщины",
    roomCount: 3,
    roommates: 1,
    arriveDate: "05.04.2024",
  },
];

export default function ApartmentsPage() {
  // Static UI value (dropdown closed, no error, no loading)
  const [selectedSort, setSelectedSort] = useState("1");
  const [isMap, setIsMap] = useState(false);

  return (
    <Container>
      <div className={styles.wrapper}>
        <Filter />

        <div className={styles.rightColumn}>
          <div className={styles.sortControls}>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered" size="sm">
                  {sortItems.find((sort) => sort.value === selectedSort)?.label}
                  <Images.ChevronDown size={20} color={"#5c5c5c"} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Выбор города"
                selectionMode="single"
                selectedKeys={selectedSort}
                variant="flat"
                onSelectionChange={(keys) => {
                  if (keys.currentKey) {
                    setSelectedSort(keys.currentKey);
                  }
                }}
              >
                {sortItems.map((sort) => (
                  <DropdownItem key={sort.value} textValue={sort.label}>
                    {sort.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <MyButton
              type="button"
              onClick={() => setIsMap(!isMap)}
              isIconOnly
              variant="bordered"
              size="sm"
            >
              {isMap ? <Images.List /> : <Images.Map />}
            </MyButton>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.cardGrid}>
              {mockAnnouncements.map((announcement) => (
                <Card key={announcement.id} card={announcement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
