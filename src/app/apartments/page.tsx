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
import { 
  mapStateToFilterRequest, 
  useLazyGetFilteredAnnouncementsQuery
} from "@/store/features/filter/filterApi";
import { setSelectedMapPoints, resetFilter, setCurrentPage, setCurrentOrder } from "@/store/features/filter/filterSlice";
import { Card } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/store/store";

const sortItems = [
  { value: "1", label: "Самые подходящие" },
  { value: "3", label: "По новизне" },
  { value: "2", label: "По возрастанию цены" },
  { value: "4", label: "По убыванию цены" },
];

export default function ApartmentsPage() {
  const [isMap, setIsMap] = useState(false);
  const [hideFilter, setHideFilter] = useState(true);
  const [showListings, setShowListings] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

  const [ getFilteredAnnouncements ] = useLazyGetFilteredAnnouncementsQuery();

  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter);
  const { page, sort } = filterState;
  

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

  const fetchFilterApartments = async (filterData: any, isLoadMore = false) => {
    const requestData = mapStateToFilterRequest(filterData);
      
    getFilteredAnnouncements(requestData).then(({ data }) => {
      const newApartments = data?.data?.announcements as Card[];
      const newPage = data?.data?.page as number;
      dispatch(setCurrentPage(newPage));

      if (newApartments.length === 0) {
        setHasMoreData(false);
      }
      if (isLoadMore) {
        setFilteredApartments([...filteredApartments, ...newApartments]);
      } else {
        setFilteredApartments(newApartments);
        setHasMoreData(true);
      }
    })
  
  };

  useEffect(() => {
    setIsLoading(true)
    fetchFilterApartments(filterState, false);
    setIsLoading(false)
  }, [page, sort]);


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
    dispatch(setCurrentPage(1));
    fetchFilterApartments(filterData);
  };
  
  const handleResetFilter = () => {
    dispatch(resetFilter());
    dispatch(setCurrentPage(1));
    fetchFilterApartments(filterState);
  };

  const handleMapPointsSelected = (points: {x: number, y: number}[]) => {
    dispatch(setSelectedMapPoints(points));
    
    const updatedFilterState = {
      ...filterState,
      selectedMapPoints: points
    };

    fetchFilterApartments({filter: updatedFilterState}, false);
  };
  
  const loadMoreApartments = () => {
    if (isLoading || !hasMoreData) return;
    
    const nextPage = page + 1;
    dispatch(setCurrentPage(nextPage));
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        {(!hideFilter && !isMobile) && (
          <Filter 
            onSubmit={handleFilterSubmit} 
            onResetFilter={handleResetFilter}
          />
        )}

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
                    {sortItems.find((s) => s.value === sort.toString())?.label}
                    <Images.ChevronDown size={20} color={"#5c5c5c"} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Выбор сортировки"
                  selectionMode="single"
                  selectedKeys={sort.toString()}
                  variant="flat"
                  onSelectionChange={(keys) => {
                    if (keys.currentKey) {
                      dispatch(setCurrentPage(1))
                      dispatch(setCurrentOrder(+keys.currentKey))
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
                <>
                <div className={styles.gridContainer}>
                  <div className={styles.cardGrid}>
                    {filteredApartments.map((apartment, index) => (
                      <CardComponent key={apartment.announcementId} card={apartment} 
                      isLast={hasMoreData && index === filteredApartments.length - 1} loadMoreApartments={loadMoreApartments} />
                    ))}
                  </div>
                </div>
                {isLoading && (
                  <div className={styles.loadingMore}>
                    <Spin indicator={antIcon} />
                  </div>
                )}
                
                {!hasMoreData && filteredApartments.length > 0 && (
                  <div className={styles.noMoreData}>
                    <p>Больше объявлений не найдено</p>
                  </div>
                )}
                </>
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
        <Filter 
          onSubmit={handleFilterSubmit} 
          onResetFilter={handleResetFilter}
        />
      </Drawer>
    </Container>
  );
}