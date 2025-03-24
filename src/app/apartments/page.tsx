"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/layouts/Container";
import Filter from "./Filter";
import Card from "@/components/common/Card";
import Images from "@/components/common/Images";
import styles from "./Apartments.module.scss";
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem
} from "@heroui/react";
import { Drawer } from 'antd';
import MyButton from "@/components/ui/MyButton";
import Map from "./Map";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const sortItems = [
  { value: "1", label: "Самые подходящие" },
  { value: "3", label: "По новизне" },
  { value: "4", label: "По убыванию цены" },
  { value: "2", label: "По возрастанию цены" },
];

interface Apartment {
  id: number;
  title: string;
  cost: string;
  image: string;
  address: string;
  selectedGender: string;
  roomCount: number;
  roommates: number;
  arriveDate: string;
  coordinates?: [number, number];
}

export default function ApartmentsPage() {
  const [selectedSort, setSelectedSort] = useState("1");
  const [isMap, setIsMap] = useState(false);
  const [hideFilter, setHideFilter] = useState(true);
  const [showListings, setShowListings] = useState(false);
  const [open, setOpen] = useState(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMapPoints, setSelectedMapPoints] = useState<[number, number][]>([]);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  
  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Update filter visibility based on screen size
  useEffect(() => {
    if (isMobile) {
      setHideFilter(true);
    } else {
      setHideFilter(false);
      onClose()
      // Only reset showListings on desktop
      if (!isMap) {
        setShowListings(false);
      }
    }
  }, [isMobile, isMap]);
  
  // Fetch apartments data
  useEffect(() => {
    const fetchApartments = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: Apartment[] = [
          {
            id: 1,
            title: "Уютная квартира в центре",
            cost: "180 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Алматы, Самал-2",
            selectedGender: "Мужчины",
            roomCount: 2,
            roommates: 1,
            arriveDate: "01.04.2024",
            coordinates: [76.9286 + (Math.random() * 0.05 - 0.025), 43.2383 + (Math.random() * 0.05 - 0.025)]
          },
          {
            id: 2,
            title: "Современная студия",
            cost: "220 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Астана, Байконур",
            selectedGender: "Любой",
            roomCount: 1,
            roommates: 2,
            arriveDate: "10.03.2024",
            coordinates: [76.9286 + (Math.random() * 0.05 - 0.025), 43.2383 + (Math.random() * 0.05 - 0.025)]
          },
          {
            id: 3,
            title: "Комната с панорамным видом",
            cost: "150 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Шымкент, Аль-Фараби",
            selectedGender: "Женщины",
            roomCount: 3,
            roommates: 1,
            arriveDate: "05.04.2024",
            coordinates: [76.9386 + (Math.random() * 0.05 - 0.025), 43.2483 + (Math.random() * 0.05 - 0.025)]
          },
          {
            id: 4,
            title: "Уютная квартира в центре",
            cost: "180 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Алматы, Самал-2",
            selectedGender: "Мужчины",
            roomCount: 2,
            roommates: 1,
            arriveDate: "01.04.2024",
            coordinates: [76.9186 + (Math.random() * 0.05 - 0.025), 43.2283 + (Math.random() * 0.05 - 0.025)]
          },
          {
            id: 5,
            title: "Современная студия",
            cost: "220 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Астана, Байконур",
            selectedGender: "Любой",
            roomCount: 1,
            roommates: 2,
            arriveDate: "10.03.2024",
            coordinates: [76.9486 + (Math.random() * 0.05 - 0.025), 43.2583 + (Math.random() * 0.05 - 0.025)]
          },
          {
            id: 6,
            title: "Комната с панорамным видом",
            cost: "150 000",
            image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
            address: "Шымкент, Аль-Фараби",
            selectedGender: "Женщины",
            roomCount: 3,
            roommates: 1,
            arriveDate: "05.04.2024",
            coordinates: [76.9086 + (Math.random() * 0.05 - 0.025), 43.2183 + (Math.random() * 0.05 - 0.025)]
          },
        ];
        
        const extraApartments: Apartment[] = Array.from({ length: 15 }).map((_, index) => ({
          id: 7 + index,
          title: "Квартира в районе Достык",
          cost: `${150 + Math.floor(Math.random() * 100)} 000`,
          image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
          address: "Алматы, Достык",
          selectedGender: Math.random() > 0.5 ? "Мужчины" : "Женщины",
          roomCount: 1 + Math.floor(Math.random() * 3),
          roommates: 1 + Math.floor(Math.random() * 3),
          arriveDate: "15.04.2024",
          coordinates: [
            76.9486 + (Math.random() * 0.1 - 0.05), 
            43.2283 + (Math.random() * 0.1 - 0.05)
          ]
        }));
        
        const allApartments = [...mockData, ...extraApartments];
        setApartments(allApartments);
        setFilteredApartments(allApartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApartments();
  }, []);

  // Toggle between map and grid view
  const handleIsMap = () => {
    setIsMap(!isMap);
    // Only show listings in map view
    if (!isMap) {
      setShowListings(true);
    } else {
      setShowListings(false);
    }
  };
  
  // Toggle filter visibility and listings on desktop map view
  const toggleFilterAndListings = () => {
    if (isMap && !isMobile) {
      setHideFilter(!hideFilter);
      setShowListings(!showListings);
    }
  };
  
  // Handle filter submission
  const handleFilterSubmit = (filterData: any) => {
    console.log("Filtering with:", filterData);
    
    // Close drawer on mobile when filter is submitted
    if (isMobile) {
      onClose();
    }
    
    setIsLoading(true);
    
    // Simulate filtering with a delay
    setTimeout(() => {
      const filtered = apartments.filter(apt => {
        // Gender filter
        if (filterData.selectedGender && filterData.selectedGender !== "Любой" && apt.selectedGender !== filterData.selectedGender) {
          return false;
        }
        
        // Room count filter
        if (apt.roomCount !== filterData.quantityOfRooms) {
          return false;
        }
        
        // Price range filter
        const price = parseInt(apt.cost.replace(/\s+/g, ''));
        if (price < filterData.minPrice || price > filterData.maxPrice) {
          return false;
        }
        
        return true;
      });
      
      setFilteredApartments(filtered);
      setIsLoading(false);
    }, 1000);
  };

  // Handle map selection points
  const handleMapPointsSelected = (points: [number, number][]) => {
    setSelectedMapPoints(points);
    console.log("Selected map points:", points);
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        {/* Show filter only on desktop or when not hidden */}
        {(!hideFilter && !isMobile) && (<Filter onSubmit={handleFilterSubmit} />)}

        {/* Map listings - only shown when in map view AND showListings is true */}
        {showListings && isMap && hideFilter && !isMobile && (
          <div className={styles.mapListings}>
            <h3>Найдено {filteredApartments.length} объявлений</h3>
            <div className={styles.mapCardsList}>
              {filteredApartments.slice(0, 5).map((apartment) => (
                <Card key={apartment.id} card={apartment} mini={true} />
              ))}
              {filteredApartments.length > 5 && (
                <div className={styles.viewMoreButton}>
                  <Button color="primary" size="sm">
                    Еще {filteredApartments.length - 5} объявлений
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.rightColumn}>
          <div className={styles.topBar}>
            <div className={styles.sortControls}>
              {/* Sort dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered" size="sm">
                    {sortItems.find((sort) => sort.value === selectedSort)?.label}
                    <Images.ChevronDown size={20} color={"#5c5c5c"} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Выбор сортировки"
                  selectionMode="single"
                  selectedKeys={selectedSort}
                  variant="flat"
                  onSelectionChange={(keys) => {
                    if (keys.currentKey) {
                      setSelectedSort(keys.currentKey.toString());
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

              <div className={styles.controlButtons}>
              {(isMobile || isMap) && (
                <MyButton 
                type="button"
                variant="bordered"
                size="sm"
                onClick={() => isMobile ? showDrawer() : setHideFilter(!hideFilter)}
              >
                <Images.Filter color="#5c5c5c" size={18} />
                <span style={{ marginLeft: '8px' }}>Фильтры</span>
              </MyButton>
              )}
                

                {/* Map/List toggle button */}
                <MyButton 
                  type="button" 
                  onClick={handleIsMap}
                  variant="bordered" 
                  size="sm"
                  aria-label={isMap ? "Показать список" : "Показать карту"}
                >
                  {isMap ? (
                    <>
                      <Images.List />
                      <span style={{ marginLeft: '8px' }}>Список</span>
                    </>
                  ) : (
                    <>
                      <Images.Map />
                      <span style={{ marginLeft: '8px' }}>Карта</span>
                    </>
                  )}
                </MyButton>
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          {isLoading ? (
            <div className={styles.loadingScreen}>
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <>
              {/* Grid view */}
              {!isMap ? (
                <div className={styles.gridContainer}>
                  <div className={styles.cardGrid}>
                    {filteredApartments.map((apartment) => (
                      <Card key={apartment.id} card={apartment} />
                    ))}
                  </div>
                </div>
              ) : (
                /* Map view */
                <div className={styles.mapContent}>
                  <Map 
                    update={hideFilter || isMobile} 
                    apartments={filteredApartments} 
                    isLoading={isLoading}
                    onPointsSelected={handleMapPointsSelected}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Filter drawer for mobile */}
      <Drawer 
        title="Basic Drawer"
        placement="bottom"
        closable={false}
        onClose={onClose}
        size="large"
        open={open}
      >
        <Filter onSubmit={handleFilterSubmit} />
      </Drawer>
    </Container>
  );
}