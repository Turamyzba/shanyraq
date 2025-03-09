"use client";

import React, { useState } from "react";
import Container from "@/components/layouts/Container"; // Adjust path as needed
import styles from "./Apartment.module.scss";

import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import { Chip, Tabs, Tab, Avatar, AvatarGroup, Button } from "@heroui/react";
import Images from "@/components/common/Images";
import Link from "next/link";
import InterestedPeopleBlock from "./InterestedPeopleBlock";

// Mock data for demonstration (UI only)
const mockApartmentData = {
  title: "Алтын ауыл дом 3, кв 15",
  cost: 150000,
  deposit: 50000,
  communalServicesMin: 5000,
  communalServicesMax: 10000,
  arriveDate: "01.04.2025",
  region: "Алматы",
  district: "Алмалинский район",
  typeOfHousing: "Квартира",
  yearOfHousing: 2016,
  numberOfFloor: 3,
  maxFloorInTheBuilding: 9,
  areaOfTheApartment: 50,
  qualityOfTheApartment: "Хорошее",
  howManyPeopleLiveInThisApartment: 1,
  numberOfPeopleAreYouAccommodating: 2,
  apartmentsInfo:
    "Здесь будет подробное описание квартиры. Текст, детали, особенности, условия и прочее. Полностью статический пример без логики, только UI.",
  qualities: [
    "Без вредных привычек",
    "Дружелюбие",
    "Аккуратность",
    "Без вредных привычек",
    "Дружелюбие",
    "Аккуратность",
  ],
  photos: [
    "https://i.pinimg.com/736x/74/75/09/74750988fed58890af4ef128fa3e670e.jpg", // Main image
    "https://i.pinimg.com/736x/2c/da/23/2cda231a0bee4a3a83cab51db9947f8f.jpg",
    "https://i.pinimg.com/736x/69/48/b8/6948b80845e87099a6260cf37e90fff9.jpg",
    "https://i.pinimg.com/736x/fa/c9/2a/fac92a6dfd704fd016fc1ab4d58d419f.jpg",
    "https://i.pinimg.com/736x/8a/0d/cf/8a0dcf8a2a237224252caff7066b24fe.jpg",
    "https://i.pinimg.com/736x/e8/6f/ff/e86fffd5589e829e9ea65e64f22c4c5e.jpg", // 6th image
  ],
  user: {
    firstName: "Азамат",
    lastName: "Айдар",
    profilePhoto: "/images/userSmall.png",
    phone: "+7 777 777 77 77",
    whatsapp: "+7 777 777 77 77",
  },
  interestedPeopleCount: 5,
  interestedGroupCount: 2,
  groups: [
    {
      name: "Группа 1",
      people: [
        {
          firstName: "Айсултан",
          lastName: "User1",
          role: "Хозяин жилья",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        },
        {
          firstName: "Пано",
          lastName: "User2",
          role: "Уже проживает",
          avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        },
        {
          firstName: "Бекош",
          lastName: "User3",
          role: "Уже проживает",
          avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        },
      ],
    },
    {
      name: "Группа 2",
      people: [
        {
          firstName: "Айс",
          lastName: "User4",
          role: "Уже проживает",
          avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
        },
        {
          firstName: "Султан",
          lastName: "User5",
          role: "Уже проживает",
          avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        },
      ],
      maxSize: "7/7",
      isFull: true,
    },
  ],
};

export default function ApartmentPage() {
  const [current, setCurrent] = useState(0);

  const onDownload = async () => {
    // const url: string = mockApartmentData.photos[current];
    // const proxyUrl: string = `/api/download?url=${encodeURIComponent(url)}`;
    // // Redirect the browser to the proxy URL, triggering the download
    // window.location.href = proxyUrl;
  };
  return (
    <div className={styles.apartmentPage}>
      <Container>
        <div className={styles.topSection}>
          <Image.PreviewGroup
            preview={{
              toolbarRender: (
                _,
                {
                  transform: { scale },
                  actions: {
                    onActive,
                    onFlipY,
                    onFlipX,
                    onRotateLeft,
                    onRotateRight,
                    onZoomOut,
                    onZoomIn,
                    onReset,
                  },
                }
              ) => (
                <Space size={12} className={styles.toolbarWrapper}>
                  <LeftOutlined onClick={() => onActive?.(-1)} />
                  <RightOutlined onClick={() => onActive?.(1)} />
                  <DownloadOutlined onClick={onDownload} />
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                  <UndoOutlined onClick={onReset} />
                </Space>
              ),
              onChange: (index) => {
                setCurrent(index);
              },
            }}
          >
            <div className={styles.mainImage}>
              <Image
                src={mockApartmentData.photos[0]}
                alt="Main Image"
                preview={true}
                height={500}
                width={"100%"}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.sideImages}>
              <div className={styles.sideImageGrid}>
                {mockApartmentData.photos.slice(1, 4).map((photo, idx) => (
                  <Image
                    key={photo}
                    src={photo}
                    alt={`Side Image ${idx}`}
                    preview={true}
                    height={245}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                ))}

                {mockApartmentData.photos[5] && (
                  <div className={styles.moreImagesOverlay}>
                    <Image
                      src={mockApartmentData.photos[5]}
                      alt="Показать все фото"
                      preview={true}
                      height={245}
                      width={"100%"}
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.overlayText}>Показать все фото</div>
                  </div>
                )}
              </div>
            </div>
          </Image.PreviewGroup>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.leftColumn}>
            <h1 className={styles.apartmentTitle}>{mockApartmentData.title}</h1>

            <div className={styles.badges}>
              <Chip
                size="lg"
                startContent={<Images.Rooms size={18} />}
                variant="flat"
                radius="sm"
                className={styles.badge}
              >
                {mockApartmentData.numberOfPeopleAreYouAccommodating} комнат
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.Area size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                {mockApartmentData.areaOfTheApartment} м²
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.House size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                {mockApartmentData.typeOfHousing}
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.People size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                До {mockApartmentData.numberOfPeopleAreYouAccommodating} человек
              </Chip>
            </div>

            <Tabs
              aria-label="Tabs variants"
              variant="underlined"
              style={{ padding: 0, marginBottom: "40px" }}
            >
              <Tab title="Описание" />
              <Tab title="Информация" />
              <Tab title="Качества" />
            </Tabs>

            <div className={styles.descriptionSection} id="description">
              <h2>Описание</h2>
              <p>{mockApartmentData.apartmentsInfo}</p>
              <hr />
            </div>

            <div className={styles.informationSection} id="information">
              <h2>Информация</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoLabel}>Город:</div>
                <div className={styles.infoValue}>
                  {mockApartmentData.region}, {mockApartmentData.district}
                </div>

                <div className={styles.infoLabel}>Тип жилья:</div>
                <div className={styles.infoValue}>{mockApartmentData.typeOfHousing}</div>

                <div className={styles.infoLabel}>Год постройки:</div>
                <div className={styles.infoValue}>{mockApartmentData.yearOfHousing}</div>

                <div className={styles.infoLabel}>Этаж:</div>
                <div className={styles.infoValue}>
                  {mockApartmentData.numberOfFloor} из {mockApartmentData.maxFloorInTheBuilding}
                </div>

                <div className={styles.infoLabel}>Площадь:</div>
                <div className={styles.infoValue}>{mockApartmentData.areaOfTheApartment} м²</div>

                <div className={styles.infoLabel}>Состояние:</div>
                <div className={styles.infoValue}>{mockApartmentData.qualityOfTheApartment}</div>

                <div className={styles.infoLabel}>Людей проживают:</div>
                <div className={styles.infoValue}>
                  {mockApartmentData.howManyPeopleLiveInThisApartment}
                </div>

                <div className={styles.infoLabel}>Людей ищут:</div>
                <div className={styles.infoValue}>
                  {mockApartmentData.numberOfPeopleAreYouAccommodating}
                </div>
              </div>
              <hr />
            </div>

            <div className={styles.qualitiesSection} id="qualitiesSection">
              <h2>Качества</h2>
              <ul className={styles.qualitiesList}>
                {mockApartmentData.qualities.map((q, idx) => (
                  <li key={idx}>
                    <Images.Complete size={22} /> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Price, contact info, interested people */}
          <div className={styles.rightColumn}>
            <div className={styles.priceBlock}>
              <div className={styles.priceRow}>
                <h2 className={styles.price}>{mockApartmentData.cost.toLocaleString()} тг</h2>
                <span className={styles.perMonth}>/ месяц</span>
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.priceDetail}>
                  <span>Депозит:</span>
                  <span>{mockApartmentData.deposit.toLocaleString()} тг</span>
                </div>
                <div className={styles.priceDetail}>
                  <span>Коммунальные услуги:</span>
                  <span>
                    {mockApartmentData.communalServicesMin.toLocaleString()} -{" "}
                    {mockApartmentData.communalServicesMax.toLocaleString()} тг
                  </span>
                </div>
                <div className={styles.priceDetail}>
                  <span>Доступно с:</span>
                  <span>{mockApartmentData.arriveDate}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactBlock}>
              <p className={styles.contactInfo}>
                Вы можете связаться с сожителями и обсудить свои вопросы...
              </p>

              <div className={styles.userInfo}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="user"
                  isBordered
                  name={""}
                />
                <div>
                  <p className={styles.userName}>
                    {mockApartmentData.user.firstName} {mockApartmentData.user.lastName}
                  </p>
                  <p className={styles.userRole}>Житель</p>
                </div>

                <Button
                  variant="light"
                  as={Link}
                  target="_blank"
                  href={`tel:${mockApartmentData.user.phone}`}
                  size="sm"
                  startContent={<Images.Phone size={18} color={"#1aa683"} />}
                  className={styles.callButton}
                >
                  Позвонить
                </Button>
                <Button
                  variant="light"
                  as={Link}
                  target="_blank"
                  href={`https://wa.me/${mockApartmentData.user.whatsapp}`}
                  size="sm"
                  startContent={<Images.Whatsapp />}
                  className={styles.callButton}
                >
                  Написать
                </Button>
              </div>
            </div>

            {/* Interested People Section */}
            {/* <div className={styles.interestedPeopleBlock}>
              <div className={styles.interestedHeader}>
                <p className={styles.interestedText}>
                  Заинтересованы в объявлении:
                  <strong className={styles.interestedCount}>
                    {mockApartmentData.interestedPeopleCount} человек
                  </strong>
                </p>
                <a href="#" className={styles.viewGroupsLink}>
                    Количетсво групп: {mockApartmentData.interestedGroupCount}
                </a>
              </div>

            {mockApartmentData.interestedGroupCount < 0 ? (
                <p className={styles.applyPrompt}>
                    Понравилось помещение? <br />
                    Подайте заявку!
                </p>
            ) :
            (<div className={styles.interestedGroups} >
                <div className={styles.interestedPeopleList}>
                <AvatarGroup isBordered max={3} total={10}>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
                </div>
            </div>)
            
            }



              <Button className={styles.applyButton}>Подать заявку</Button>
            </div> */}

            <InterestedPeopleBlock mockApartmentData={mockApartmentData} />
          </div>
        </div>
      </Container>
    </div>
  );
}
