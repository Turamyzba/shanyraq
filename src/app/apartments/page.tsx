"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/layouts/Container";
import Filter from "./Filter";
import CardComponent from "@/components/common/Card";
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
import { mapStateToFilterRequest, useLazyGetFilteredAnnouncementsQuery, useLazyGetAllAnnouncementsQuery } from "@/store/features/filter/filterApi";
import { setSelectedMapPoints } from "@/store/features/filter/filterSlice";
import { Card } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/store/store";

const sortItems = [
  { value: "1", label: "Самые подходящие" },
  { value: "3", label: "По новизне" },
  { value: "4", label: "По убыванию цены" },
  { value: "2", label: "По возрастанию цены" },
];

export default function ApartmentsPage() {
  const [selectedSort, setSelectedSort] = useState("1");
  const [isMap, setIsMap] = useState(false);
  const [hideFilter, setHideFilter] = useState(true);
  const [showListings, setShowListings] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

  const [ getFilteredAnnouncements ] = useLazyGetFilteredAnnouncementsQuery();
  const [ getAllAnnouncements ] = useLazyGetAllAnnouncementsQuery();

  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      setHideFilter(true);
    } else {
      setHideFilter(false);
      onClose();
      if (!isMap) {
        setShowListings(false);
      }
    }
  }, [isMobile, isMap]);

  const fetchFilterApartments = async (filterData: any) => {
    setIsLoading(true);
    
    try {
      // Map the filter state to the API request format
      const requestData = mapStateToFilterRequest(filterData);
      
      // Send the API request
      const result = await getFilteredAnnouncements(requestData);
      
      if (result.data) {
        setFilteredApartments(result.data?.data?.announcements as Card[]);
      } else if (result.error) {
        console.error("API error:", result.error);
      }
    } catch (error) {
      console.error("Error in fetchFilterApartments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllApartments = async () => {
    setIsLoading(true);
    
    try {
      const result = await getAllAnnouncements();
      
      if (result.data) {
        setFilteredApartments(result.data?.data?.announcements as Card[]);
      }
    } catch (error) {
      console.error("Error fetching all apartments:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllApartments();
  }, []);

  const handleIsMap = () => {
    setIsMap(!isMap);
    if (!isMap) {
      setShowListings(true);
    } else {
      setShowListings(false);
    }
  };
  
  const handleFilterSubmit = (filterData: any) => {
    if (isMobile) {
      onClose();
    }
    fetchFilterApartments(filterData);
  };

  const handleMapPointsSelected = (points: {x: number, y: number}[]) => {
    // First update the Redux state
    dispatch(setSelectedMapPoints(points));
    
    // Then prepare filter request with the updated points
    const updatedFilterState = {
      ...filterState,
      selectedMapPoints: points
    };
    
    // Call API with the updated filter state
    fetchFilterApartments({filter: updatedFilterState});
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        {(!hideFilter && !isMobile) && (<Filter onSubmit={handleFilterSubmit} />)}

        {showListings && isMap && hideFilter && !isMobile && (
          <div className={styles.mapListings}>
            <h3>Найдено {filteredApartments.length} объявлений</h3>
            <div className={styles.mapCardsList}>
              {filteredApartments.slice(0, 5).map((apartment) => (
                <CardComponent key={apartment.announcementId} card={apartment} mini={true} />
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

          {isLoading ? (
            <div className={styles.loadingScreen}>
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <>
              {!isMap ? (
                <div className={styles.gridContainer}>
                  <div className={styles.cardGrid}>
                    {filteredApartments.map((apartment) => (
                      <CardComponent key={apartment.announcementId} card={apartment} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.mapContent}>
                  <Map 
                    update={hideFilter || isMobile} 
                    apartments={filteredApartments} 
                    isLoading={false}
                    onPointsSelected={handleMapPointsSelected}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

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