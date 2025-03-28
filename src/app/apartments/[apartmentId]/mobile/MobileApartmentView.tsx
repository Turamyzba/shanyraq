"use client";

import React, { useState, useRef } from "react";
import { Image, Carousel, Divider } from "antd";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { Chip, Avatar, Button, User } from "@heroui/react";
import Images from "@/components/common/Images";
import Link from "next/link";
import Container from "@/components/layouts/Container";
import styles from "./MobileApartmentView.module.scss";
import MobileInterestedPeopleBlock, { MobileInterestedPeopleBlockHandle } from "./MobileInterestedPeopleBlock";
import { ApartmentDetail } from "@/store/features/apartmentDetails/apartmentDetailsApi";

interface MobileApartmentViewProps {
  apartment: ApartmentDetail;
}

const typeFormat = (s: string) => {
  if (s === "OWNER")
    return "Хозяин";
  else if (s === "RESIDENT")
    return "Житель";
  return s;
};

export default function MobileApartmentView({ apartment }: MobileApartmentViewProps) {
  const [activeTab, setActiveTab] = useState("description");
  
  const interestedPeopleBlockRef = useRef<MobileInterestedPeopleBlockHandle>(null);
  
  const phoneNumbers = apartment.ownersPhoneNumbers && apartment.ownersPhoneNumbers.length > 0 
    ? (typeof apartment.ownersPhoneNumbers[0] === 'string' && apartment.ownersPhoneNumbers[0].startsWith('[') 
      ? JSON.parse(apartment.ownersPhoneNumbers[0]) 
      : apartment.ownersPhoneNumbers)
    : [];
  
  const primaryPhone = phoneNumbers.length > 0 ? phoneNumbers[0].replace(/\s/g, '') : '';
  
  const photos = apartment.photos?.map((photo: any) => photo.url) || [];
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (primaryPhone) {
      window.open(`https://wa.me/${primaryPhone.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  return (
    <div className={styles.mobileApartmentPage}>
      <div className={styles.carousel}>
        <Image.PreviewGroup>
          <Carousel autoplay={false} dots={{ className: styles.carouselDots }}>
            {photos.length > 0 ? (
              photos.map((photo: string, index: number) => (
                <div key={index} className={styles.carouselItem}>
                  <div className={styles.imageCounter}>{index + 1}/{photos.length}</div>
                  <Image
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    preview={true}
                    width="100%"
                    height={300}
                    style={{ objectFit: "cover" }}
                    className={styles.carouselImage}
                  />
                </div>
              ))
            ) : (
              <div className={styles.carouselItem}>
                <Image
                  src="/images/placeholder.jpg"
                  alt="No Image Available"
                  preview={false}
                  width="100%"
                  height={300}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </Carousel>
        </Image.PreviewGroup>
      </div>

      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>{apartment.title}</h1>
          <div className={styles.priceTag}>
            <span className={styles.price}>{apartment.cost.toLocaleString()} тг</span>
            <span className={styles.perMonth}>/ месяц</span>
          </div>
          <div className={styles.locationInfo}>
            <Images.Map size={16} color="#777" />
            <span>
              {apartment.regionText}
              {apartment.districtText ? `, ${apartment.districtText}` : ''}
              {apartment.microDistrictText ? `, ${apartment.microDistrictText}` : ''}
              {apartment.address ? `, ${apartment.address}` : ''}
            </span>
          </div>
        </div>

        <div className={styles.badges}>
          <Chip
            size="sm"
            startContent={<Images.Rooms size={16} />}
            variant="flat"
            radius="sm"
            className={styles.badge}
          >
            {apartment.quantityOfRooms} комнат
          </Chip>

          <Chip
            size="sm"
            startContent={<Images.Area size={16} />}
            variant="flat"
            radius="sm"
            className={styles.badge}
          >
            {apartment.areaOfTheApartment} м²
          </Chip>

          <Chip
            size="sm"
            startContent={<Images.House size={16} />}
            variant="flat"
            radius="sm"
            className={styles.badge}
          >
            {apartment.typeOfHousing === "APARTMENT" ? "Квартира" : "Дом"}
          </Chip>

          <Chip
            size="sm"
            startContent={<Images.People size={16} />}
            variant="flat"
            radius="sm"
            className={styles.badge}
          >
            {apartment.numberOfPeopleAreYouAccommodating} чел.
          </Chip>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsWrapper}>
            <button 
              className={`${styles.tabButton} ${activeTab === "description" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Описание
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === "info" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Информация
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === "qualities" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("qualities")}
            >
              Качества
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <div className={styles.descriptionSection}>
                <p>{apartment.apartmentsInfo}</p>
                
                {/* Financial details included in description tab */}
                <div className={styles.priceDetails}>
                  <h3>Финансовые детали</h3>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Депозит:</span>
                    <span className={styles.infoValue}>{apartment.deposit.toLocaleString()} тг</span>
                  </div>
                  <Divider className={styles.divider} />
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Коммунальные услуги:</span>
                    <span className={styles.infoValue}>
                      {apartment.minAmountOfCommunalService.toLocaleString()} - 
                      {apartment.maxAmountOfCommunalService.toLocaleString()} тг
                    </span>
                  </div>
                  <Divider className={styles.divider} />
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Доступно с:</span>
                    <span className={styles.infoValue}>{new Date(apartment.arriveDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className={styles.informationSection}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Город:</span>
                  <span className={styles.infoValue}>
                    {apartment.regionText}, {apartment.districtText}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Тип жилья:</span>
                  <span className={styles.infoValue}>
                    {apartment.typeOfHousing === "APARTMENT" ? "Квартира" : "Дом"}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Сдача в аренду:</span>
                  <span className={styles.infoValue}>
                    {apartment.forALongTime ? "Долгосрочно" : "Краткосрочно"}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Этаж:</span>
                  <span className={styles.infoValue}>
                    {apartment.numberOfFloor} из {apartment.maxFloorInTheBuilding}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Площадь:</span>
                  <span className={styles.infoValue}>{apartment.areaOfTheApartment} м²</span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Состояние:</span>
                  <span className={styles.infoValue}>
                    {apartment.areBadHabitsAllowed ? "С вредными привычками" : "Без вредных привычек"}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Людей проживают:</span>
                  <span className={styles.infoValue}>
                    {apartment.howManyPeopleLiveInThisApartment}
                  </span>
                </div>
                <Divider className={styles.divider} />

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Людей ищут:</span>
                  <span className={styles.infoValue}>
                    {apartment.numberOfPeopleAreYouAccommodating}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "qualities" && (
              <div className={styles.qualitiesSection}>
                {apartment.preferences && apartment.preferences.length > 0 ? (
                  <ul className={styles.qualitiesList}>
                    {apartment.preferences.map((q: string, idx: number) => (
                      <li key={idx} className={styles.qualityItem}>
                        <Images.Complete size={18} color="#1aa683" /> <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noQualitiesMessage}>Качества не указаны</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.contactCard}>
          <p className={styles.contactInfo}>
            Вы можете связаться с сожителями и обсудить свои вопросы...
          </p>

          <div className={styles.userInfo}>
            <div className={styles.userDetail}>
              <Avatar
                src={apartment.user.profilePhoto || undefined}
                alt="user"
                isBordered
                name={apartment.user.firstName}
                size="md"
              />
              <p className={styles.userName}>
                {apartment.user.firstName}
              </p>
            </div>
            <div className={styles.contactButtons}>
              {primaryPhone && (
                <Button
                  variant="light"
                  as={Link}
                  target="_blank"
                  href={`tel:${primaryPhone}`}
                  size="sm"
                  startContent={<Images.Phone size={18} color={"#1aa683"} />}
                  className={styles.callButton}
                >
                  Позвонить
                </Button>
              )}
              
              {primaryPhone && (
                <Button
                  variant="light"
                  size="sm"
                  startContent={<Images.Whatsapp />}
                  className={styles.callButton}
                  onClick={handleWhatsAppClick}
                >
                  Написать
                </Button>
              )}
            </div>
          </div>
          
          {apartment.residentsDataResponse && apartment.residentsDataResponse.length > 0 && (
            <div className={styles.residentsSection}>
              <h4>Проживающие:</h4>
              <Table aria-label="Residents Table">
                <TableHeader>
                  <TableColumn>Имя</TableColumn>
                  <TableColumn>Роль</TableColumn>
                  <TableColumn align={"end"}>{""}</TableColumn>
                </TableHeader>
                <TableBody>
                  {apartment.residentsDataResponse.map((resident, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <User
                          avatarProps={{
                            src: resident.profilePhoto,
                          }}
                          name={resident.name}
                        >
                          {resident.name}
                        </User>
                      </TableCell>
                      <TableCell>{typeFormat(resident.residentType)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          // onPress={() => handleOpenProfileModal(resident)}
                        >
                          Анкета
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className={styles.interestedPeopleWrapper}>
          <h3 className={styles.sectionTitle}>Заинтересованы в объявлении</h3>
          <MobileInterestedPeopleBlock 
            ref={interestedPeopleBlockRef}
            apartmentId={apartment.id}
            capacity={apartment.numberOfPeopleAreYouAccommodating}
            groupData={{
              interestedPeopleCount: apartment.groupDataResponse?.reduce(
                (count: number, group: any) => count + (group.groupMembers?.length || 0), 
                0
              ) || 0,
              interestedGroupCount: apartment.groupDataResponse?.length || 0,
              groups: apartment.groupDataResponse?.map((group: any) => ({
                id: group.id || 0,
                name: group.group || "Группа", 
                freeSlots: group.freeSlots,
                people: group.groupMembers.map((member: any) => ({
                  id: member.id,
                  firstName: member.name.split(' ')[0] || "",
                  lastName: member.name.split(' ')[1] || "",
                  role: member.me ? "Вы" : "Участник группы",
                  avatar: member.profilePhoto,
                })),
              })) || [],
            }}
          />
        </div>
      </Container>
    </div>
  );
}