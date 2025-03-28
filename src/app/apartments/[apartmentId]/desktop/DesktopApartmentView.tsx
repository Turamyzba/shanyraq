"use client";

import React, { useState } from "react";
import { Image, Space } from "antd";
import Images from "@/components/common/Images";
import Link from "next/link";
import InterestedPeopleBlock from "./InterestedPeopleBlock";
import Container from "@/components/layouts/Container";
import styles from "./DesktopApartmentView.module.scss";
import {
  LeftOutlined,
  RightOutlined,
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Avatar,
  AvatarGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs, 
  Tab,
  User,
  Chip
} from "@heroui/react";
import { ApartmentDetail } from "@/store/features/apartmentDetails/apartmentDetailsApi";

interface DesktopApartmentViewProps {
  apartment: ApartmentDetail;
}

export default function DesktopApartmentView({ apartment }: DesktopApartmentViewProps) {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("information");
  
  const phoneNumbers = apartment.ownersPhoneNumbers && apartment.ownersPhoneNumbers.length > 0 
    ? (typeof apartment.ownersPhoneNumbers[0] === 'string' && apartment.ownersPhoneNumbers[0].startsWith('[') 
      ? JSON.parse(apartment.ownersPhoneNumbers[0]) 
      : apartment.ownersPhoneNumbers)
    : [];
  
  const primaryPhone = phoneNumbers.length > 0 ? phoneNumbers[0].replace(/\s/g, '') : '';
  
  const photos = apartment.photos?.map((photo: any) => photo.url) || [];
  
  const onDownload = async () => {
    if (photos && photos.length > 0) {
      const url = photos[current];
      const a = document.createElement('a');
      a.href = url;
      a.download = `apartment-photo-${current + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (primaryPhone) {
      window.open(`https://wa.me/${primaryPhone.replace(/[^0-9]/g, '')}`, '_blank');
    }
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
            {photos.length > 0 ? (
              <>
                <div className={styles.mainImage}>
                  <Image
                    src={photos[0]}
                    alt="Main Image"
                    preview={true}
                    height={500}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className={styles.sideImages}>
                  <div className={styles.sideImageGrid}>
                    {photos.slice(1, Math.min(4, photos.length)).map((photo: string, idx: number) => (
                      <Image
                        key={idx}
                        src={photo}
                        alt={`Side Image ${idx}`}
                        preview={true}
                        height={245}
                        width={"100%"}
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                    
                    {photos.length > 4 && (
                      <div 
                        className={styles.moreImagesOverlay}
                        
                      >
                        <Image
                          src={photos[4]}
                          alt="Показать все фото"
                          preview={false}
                          height={245}
                          width={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                        <div className={styles.overlayText}>Показать все фото</div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noImages}>
                <div className={styles.mainImage}>
                  <Image
                    src="/images/placeholder.jpg"
                    alt="No Image Available"
                    preview={false}
                    height={500}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.sideImages}>
                  <div className={styles.sideImageGrid}>
                    {[...Array(4)].map((_, idx) => (
                      <Image
                        key={idx}
                        src="/images/placeholder.jpg"
                        alt="No Image Available"
                        preview={false}
                        height={245}
                        width={"100%"}
                        style={{ objectFit: "cover", opacity: 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Image.PreviewGroup>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.leftColumn}>
            <h1 className={styles.apartmentTitle}>{apartment.title}</h1>

            <div className={styles.badges}>
              <Chip
                size="lg"
                startContent={<Images.Rooms size={18} />}
                variant="flat"
                radius="sm"
                className={styles.badge}
              >
                {apartment.quantityOfRooms} комнат
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.Area size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                {apartment.areaOfTheApartment} м²
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.House size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                {apartment.typeOfHousing === "APARTMENT" ? "Квартира" : "Дом"}
              </Chip>

              <Chip
                size="lg"
                startContent={<Images.People size={18} />}
                variant="bordered"
                radius="sm"
                className={styles.badge}
              >
                До {apartment.numberOfPeopleAreYouAccommodating} человек
              </Chip>
            </div>

            <Tabs
              aria-label="Apartment Details Tabs"
              variant="underlined"
              style={{ padding: 0, marginBottom: "40px" }}
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab key="information" title="Информация" />
              <Tab key="description" title="Описание" />
              <Tab key="qualities" title="Качества" />
            </Tabs>

            {activeTab === "information" && (
              <div className={styles.informationSection} id="information">
                <h2>Информация</h2>
                <div className={styles.infoGrid}>
                  <div className={styles.infoLabel}>Город:</div>
                  <div className={styles.infoValue}>
                    {apartment.regionText}, {apartment.districtText}
                  </div>

                  <div className={styles.infoLabel}>Тип жилья:</div>
                  <div className={styles.infoValue}>
                    {apartment.typeOfHousing === "APARTMENT" ? "Квартира" : "Дом"}
                  </div>

                  <div className={styles.infoLabel}>Сдача в аренду:</div>
                  <div className={styles.infoValue}>
                    {apartment.forALongTime ? "Долгосрочно" : "Краткосрочно"}
                  </div>

                  <div className={styles.infoLabel}>Этаж:</div>
                  <div className={styles.infoValue}>
                    {apartment.numberOfFloor} из {apartment.maxFloorInTheBuilding}
                  </div>

                  <div className={styles.infoLabel}>Площадь:</div>
                  <div className={styles.infoValue}>{apartment.areaOfTheApartment} м²</div>

                  <div className={styles.infoLabel}>Состояние:</div>
                  <div className={styles.infoValue}>
                    {apartment.areBadHabitsAllowed ? "С вредными привычками" : "Без вредных привычек"}
                  </div>

                  <div className={styles.infoLabel}>Людей проживают:</div>
                  <div className={styles.infoValue}>
                    {apartment.howManyPeopleLiveInThisApartment}
                  </div>

                  <div className={styles.infoLabel}>Людей ищут:</div>
                  <div className={styles.infoValue}>
                    {apartment.numberOfPeopleAreYouAccommodating}
                  </div>
                </div>
                <hr />
              </div>
            )}

            {activeTab === "description" && (
              <div className={styles.descriptionSection} id="description">
                <h2>Описание</h2>
                <p>{apartment.apartmentsInfo}</p>
                <hr />
              </div>
            )}

            {activeTab === "qualities" && (
              <div className={styles.qualitiesSection} id="qualitiesSection">
                <h2>Качества</h2>
                {apartment.preferences && apartment.preferences.length > 0 ? (
                  <ul className={styles.qualitiesList}>
                    {apartment.preferences.map((q, idx) => (
                      <li key={idx}>
                        <Images.Complete size={22} /> {q}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Качества не указаны</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.priceBlock}>
              <div className={styles.priceRow}>
                <h2 className={styles.price}>{apartment.cost.toLocaleString()} тг</h2>
                <span className={styles.perMonth}>/ месяц</span>
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.priceDetail}>
                  <span>Депозит:</span>
                  <span>{apartment.deposit.toLocaleString()} тг</span>
                </div>
                <div className={styles.priceDetail}>
                  <span>Коммунальные услуги:</span>
                  <span>
                    {apartment.minAmountOfCommunalService.toLocaleString()} -{" "}
                    {apartment.maxAmountOfCommunalService.toLocaleString()} тг
                  </span>
                </div>
                <div className={styles.priceDetail}>
                  <span>Доступно с:</span>
                  <span>{new Date(apartment.arriveDate).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactBlock}>
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
              
              {/* Show residents if they exist */}
              {apartment.residentsDataResponse && apartment.residentsDataResponse.length > 0 && (
                <div className={styles.residentsSection}>
                  <h4>Проживающие:</h4>
                  <Table removeWrapper aria-label="Group Members Table">
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
                              // onPress={() => handleOpenProfileModal(person)}
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

            <InterestedPeopleBlock 
              apartmentId={apartment.id}
              capacity={apartment.numberOfPeopleAreYouAccommodating}
              groupData={{
                interestedPeopleCount: apartment.groupDataResponse?.reduce(
                  (count, group) => count + (group.groupMembers?.length || 0), 
                  0
                ) || 0,
                interestedGroupCount: apartment.groupDataResponse?.length || 0,
                groups: apartment.groupDataResponse?.map((group: any) => ({
                  id: group.id || 0,
                  name: group.group, 
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
        </div>
      </Container>
    </div>
  );
}

const typeFormat = (s: string) => {
  if(s === "OWNER")
    return "Хозяин"
  else if(s === "RESIDENT")
    return "Житель"
}