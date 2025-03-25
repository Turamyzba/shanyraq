"use client";
import React, { useState, useEffect } from "react";
import styles from "./Filter.module.scss";
import Images from "@/components/common/Images";
import MySelect from "@/components/ui/MySelect";
import MyInput from "@/components/ui/MyInput";
import MySlider from "@/components/ui/MySlider";
import MyCalendar from "@/components/ui/MyCalendar";
import { Tabs, Tab, Checkbox, addToast, Select, useDisclosure } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import MyButton from "@/components/ui/MyButton";
import MyCheckBox from "@/components/ui/MyCheckBox";
import { useLazyGetAddressesQuery } from "@/store/features/landing/landingApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  AddressType,
  genderOptions,
  roommateOptions,
  propertyTypeOptions,
  ownerTypeOptions,
} from "@/types/common";
import {
  setGender,
  setMinPrice,
  setMaxPrice,
  // setRoommates,
  setAddress,
  setRooms,
  setMinAge,
  setMaxAge,
  // setMoveInDate,
  setTermType,
  setIsNotFirstFloor,
  setIsNotLastFloor,
  setMinArea,
  setMaxArea,
  setPetsAllowed,
  setUtilitiesIncluded,
  setForStudents,
  setOnlyEmptyApartments,
  setBadHabitsAllowed,
  setPropertyType,
  setOwnerType,
  resetFilter,
  initialState,
  setMinFloor,
  setMaxFloor,
  setMoveInDate,
  setRoommates,
} from "@/store/features/filter/filterSlice";
import { showToast } from "@/utils/notification";
import SaveFilterModal from "@/components/common/SaveFilterModal";

interface FilterProps {
  onSubmit?: (filterData: any) => void;
  onResetFilter?: () => void;
}

export default function Filter({ onSubmit, onResetFilter }: FilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter);

  const [getAddresses, { isLoading: getAddressIsLoading }] = useLazyGetAddressesQuery();
  const {
    address,
    rooms,
    selectedGender,
    roommates,
    minPrice,
    maxPrice,
    propertyType,
    role,
    minAge,
    maxAge,
    minArea,
    maxArea,
    moveInDate = new Date(),
    termType,
    petsAllowed,
    forStudents,
    isNotFirstFloor,
    isNotLastFloor,
    utilitiesIncluded,
    onlyEmptyApartments,
    badHabitsAllowed,
    minFloor,
    maxFloor,
  } = filterState;

  const [regions, setRegions] = useState<AddressType[]>([]);
  const [districts, setDistricts] = useState<AddressType[]>([]);
  const [microDistricts, setMicroDistricts] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  
  const [localRooms, setLocalRooms] = useState<number>(rooms || 1);

const [isToday, setIsToday] = useState(false);
const [isTomorrow, setIsTomorrow] = useState(false);

useEffect(() => {
  if (typeof rooms === 'number' && rooms > 0) {
    setLocalRooms(rooms);
  } else {
    setLocalRooms(1);
    dispatch(setRooms(1));
  }
}, [rooms, dispatch]);

const incrementRooms = () => {
  const newValue = Math.min(localRooms + 1, 10);
  setLocalRooms(newValue);
  dispatch(setRooms(newValue));
};

const decrementRooms = () => {
  const newValue = Math.max(localRooms - 1, 1);
  setLocalRooms(newValue);
  dispatch(setRooms(newValue));
};

const getCalendarDateValue = (moveInDate: any) => {
  try {
    if (!moveInDate) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return parseDate(`${year}-${month}-${day}`);
    }
    
    if (typeof moveInDate === 'string') {
      if (moveInDate.includes('T')) {
        return parseDate(moveInDate.split('T')[0]);
      }
      return parseDate(moveInDate);
    }
    
    if (moveInDate instanceof Date) {
      const year = moveInDate.getFullYear();
      const month = String(moveInDate.getMonth() + 1).padStart(2, '0');
      const day = String(moveInDate.getDate()).padStart(2, '0');
      return parseDate(`${year}-${month}-${day}`);
    }
    
    if (typeof moveInDate === 'object' && moveInDate !== null) {
      return moveInDate;
    }
  } catch (e) {
    console.error("Error parsing date for calendar:", e);
  }
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return parseDate(`${year}-${month}-${day}`);
};

const handleDateChange = (date: any) => {
  if (!date) return;
  
  try {
    setIsToday(false);
    setIsTomorrow(false);
    
    let dateStr;
    
    if (typeof date.toDate === 'function') {
      const jsDate = date.toDate();
      dateStr = jsDate.toISOString();
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const selectedDate = new Date(jsDate);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate.getTime() === today.getTime()) {
        setIsToday(true);
      } else if (selectedDate.getTime() === tomorrow.getTime()) {
        setIsTomorrow(true);
      }
    } 
    else if (typeof date === 'string') {
      dateStr = new Date(date).toISOString();
    }
    else if (date.toString) {
      dateStr = date.toString();
    }
    else {
      dateStr = new Date().toISOString();
    }
    
    dispatch(setMoveInDate(dateStr));
  } catch (e) {
    console.error("Error handling date change:", e);
  }
};

const handleTodayChange = () => {
  const newIsToday = !isToday;
  setIsToday(newIsToday);
  
  if (newIsToday) {
    setIsTomorrow(false);
    
    const today = new Date();
    dispatch(setMoveInDate(today.toISOString()));
  } else {
  }
};

const handleTomorrowChange = () => {
  const newIsTomorrow = !isTomorrow;
  setIsTomorrow(newIsTomorrow);
  
  if (newIsTomorrow) {
    setIsToday(false);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dispatch(setMoveInDate(tomorrow.toISOString()));
  } else {
  }
};

  const genderSelectOptions = genderOptions.map((gender) => ({
    value: gender.code,
    label: gender.namerus,
  }));

  const fetchRegions = async () => {
    setIsLoading(true);
    getAddresses(1)
      .then(({ data }) => {
        setRegions(data?.data as AddressType[]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDistricts = async (cityId: number) => {
    setIsLoading(true);
    getAddresses(cityId)
      .then(({ data }) => {
        setDistricts(data?.data as AddressType[]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMicroDistricts = async (districtId: number) => {
    getAddresses(districtId).then(({ data }) => {
      setMicroDistricts(data?.data as AddressType[]);
    });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleRegionSelect = async (regionId: string) => {
    const selected = regions.find((region) => region.id.toString() === regionId);
    setDistricts([]);
    setMicroDistricts([]);

    if (selected) {
      dispatch(
        setAddress({
          regionId: selected.id,
          regionName: selected.namerus,
          districtId: null,
          districtName: "",
          microDistrictId: null,
          microDistrictName: "",
        })
      );

      if (selected.haschild) {
        fetchDistricts(selected.id);
      }
    } else {
      dispatch(setAddress(initialState.address));
    }
  };

  const handleDistrictSelect = async (districtId: string) => {
    if (!districts.length) return;

    const selected = districts.find((district) => district.id.toString() === districtId);
    setMicroDistricts([]);

    if (selected) {
      dispatch(
        setAddress({
          ...address,
          districtId: selected.id,
          districtName: selected.namerus,
          microDistrictId: null,
          microDistrictName: "",
        })
      );

      if (selected.haschild) {
        fetchMicroDistricts(selected.id);
      }
    } else {
      dispatch(
        setAddress({
          ...address,
          districtId: null,
          districtName: "",
          microDistrictId: null,
          microDistrictName: "",
        })
      );
    }
  };

  const handleMicroDistrictSelect = (microId: string) => {
    if (!microDistricts.length) return;

    const selected = microDistricts.find((micro) => micro.id.toString() === microId);

    if (selected) {
      dispatch(
        setAddress({
          ...address,
          microDistrictId: selected.id,
          microDistrictName: selected.namerus,
        })
      );
    } else {
      dispatch(
        setAddress({
          ...address,
          microDistrictId: null,
          microDistrictName: "",
        })
      );
    }
  };

  const handlePriceSliderChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setMinPrice(newValue[0]));
      dispatch(setMaxPrice(newValue[1]));
    }
  };

  const handleHousemateSelect = (option: string) => {
    const roommate = roommateOptions.find((r) => r.name === option);
    if (roommate) {
      dispatch(setRoommates(roommate));
    }
  };

  const handleAgeSliderChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setMinAge(newValue[0]));
      dispatch(setMaxAge(newValue[1]));
    }
  };

  const handlePropertyTypeSelect = (typeCode: string) => {
    const selected = propertyTypeOptions.find((type) => type.code === typeCode);
    if (selected) {
      dispatch(setPropertyType(selected.code));
    }
  };

  const handleOwnerTypeSelect = (typeCode: string) => {
    const selected = ownerTypeOptions.find((type) => type.code === typeCode);
    if (selected) {
      dispatch(setOwnerType(selected.code));
    }
  };

  const resetFilters = () => {
    if (onResetFilter) {
      onResetFilter();
    }
    
    setIsToday(false);
    setIsTomorrow(false);
    setMoreFilters(false);
    
    showToast({
      title: "Фильтры сброшены!",
    });
  };


  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ filter: filterState });
    } else {
      addToast({
        title: "Фильтр применен!",
        variant: "flat",
        radius: "sm",
        timeout: 2000,
        color: "success",
      });
    }
  };

  return (
    <aside className={styles.filter}>
      <div className={styles.filterContent}>
        <div className={styles.header}>
          <p>Фильтр</p>
          <button className={styles.resetButton} onClick={resetFilters}>
            Сбросить все
          </button>
        </div>

        <div className={styles.section}>
          <MySelect
            options={genderSelectOptions}
            label="Гендер"
            value={selectedGender?.code || ""}
            placeholder="Выберите пол"
            onChange={(option) => {
              const selected = genderOptions.find((g) => g.code === option);
              dispatch(setGender(selected || null));
            }}
          />
        </div>

        <div className={styles.section}>
          <MySelect
            label="Регион"
            placeholder={isLoading ? "Загрузка..." : "Выберите регион"}
            options={regions.map((region) => ({
              value: region.id.toString(),
              label: region.namerus || "",
            }))}
            value={address?.regionId ? address.regionId.toString() : ""}
            onChange={handleRegionSelect}
            disabled={isLoading}
          />
        </div>

        {districts.length > 0 && (
          <div className={styles.section}>
            <MySelect
              label="Район"
              placeholder={isLoading ? "Загрузка..." : "Выберите район"}
              options={districts.map((district) => ({
                value: district.id.toString(),
                label: district.namerus || "",
              }))}
              value={address?.districtId ? address.districtId.toString() : ""}
              onChange={handleDistrictSelect}
              disabled={isLoading}
            />
          </div>
        )}

        {microDistricts.length > 0 && (
          <div className={styles.section}>
            <MySelect
              label="Микрорайон"
              placeholder={isLoading ? "Загрузка..." : "Выберите микрорайон"}
              options={microDistricts.map((micro) => ({
                value: micro.id.toString(),
                label: micro.namerus,
              }))}
              value={address?.microDistrictId ? address.microDistrictId.toString() : ""}
              onChange={handleMicroDistrictSelect}
              disabled={isLoading}
            />
          </div>
        )}

        <div className={styles.section}>
          <p className={styles.label}>Выберите цену</p>
          <div className={styles.priceInputs}>
            <MyInput
              type="number"
              placeholder="Минимальный"
              value={minPrice ? minPrice.toString() : ""}
              onChange={(e) => dispatch(setMinPrice(+e.target.value))}
            />
            <MyInput
              type="number"
              placeholder="Максимальный"
              value={maxPrice ? maxPrice.toString() : ""}
              onChange={(e) => dispatch(setMaxPrice(+e.target.value))}
            />
          </div>
          <div className={styles.relative}>
            <div className={styles.sliderLabels}>
              <span>0</span>
              <span>500000</span>
            </div>
            <MySlider
              value={[minPrice || 0, maxPrice || 500000]}
              handleSliderChange={handlePriceSliderChange}
              min={0}
              max={500000}
              step={5000}
              className={styles.mySlider}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Количество сожителей</p>
          <ul className={styles.housemates}>
            {roommateOptions.map((option) => (
              <MyButton
                key={option.id}
                isIconOnly
                className={`${styles.housemateItem} ${
                  roommates?.id === option.id ? styles.selected : ""
                }`}
                onClick={() => handleHousemateSelect(option.name)}
              >
                {option.name}
              </MyButton>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Количество комнат</p>
          <div className={styles.roomControls}>
            <MyButton className={styles.roomControlButton} onClick={decrementRooms} isIconOnly>
              <Images.MinusIcon size={12} />
            </MyButton>
            <span className={styles.roomCount}>{localRooms}</span>
            <MyButton className={styles.roomControlButton} onClick={incrementRooms} isIconOnly>
              <Images.PlusIcon size={12} />
            </MyButton>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Возраст</p>
          <div className={styles.relative}>
            <div className={styles.sliderLabels}>
              <span>{minAge || "18"}</span>
              <span>{maxAge || "50"}</span>
            </div>
            <MySlider
              value={[minAge || 18, maxAge || 50]}
              handleSliderChange={handleAgeSliderChange}
              min={18}
              max={50}
              step={1}
              className={styles.mySlider}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Продолжительность</p>
          <Tabs
            selectedKey={termType}
            variant={"light"}
            className={styles.label}
            onSelectionChange={(key) => dispatch(setTermType(key as "long" | "short" | null))}
            size="sm"
            radius="sm"
          >
            <Tab key={null} title="Без разницы" />
            <Tab key="long" title="Долгосрочно" />
            <Tab key="short" title="Краткосрочно" />
          </Tabs>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Дата начала заселения</p>
          <MyCalendar
            aria-label="Дата заселения"
            value={getCalendarDateValue(moveInDate)}
            variant="bordered"
            color={"primary"}
            onChange={handleDateChange}
            size="md"
            radius="sm"
          />
          <div className={styles.checkboxFloorGroup}>
            <Checkbox
              checked={isToday}
              onChange={handleTodayChange}
              aria-label="Сегодня"
            >
              <p className={styles.label}>Сегодня</p>
            </Checkbox>
            <Checkbox
              checked={isTomorrow}
              onChange={handleTomorrowChange}
              aria-label="Завтра"
            >
              <p className={styles.label}>Завтра</p>
            </Checkbox>
          </div>
        </div>

        {moreFilters && (
          <>
            <div className={styles.section}>
              <p className={styles.label}>Площадь комнат</p>
              <div className={styles.priceInputs}>
                <MyInput
                  type="number"
                  placeholder="От"
                  value={minArea?.toString() || ""}
                  onChange={(e) => dispatch(setMinArea(+e.target.value))}
                />
                <MyInput
                  type="number"
                  placeholder="До"
                  value={maxArea?.toString() || ""}
                  onChange={(e) => dispatch(setMaxArea(+e.target.value))}
                />
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.label}>Этаж</p>
              <div className={styles.priceInputs}>
                <MyInput
                  type="number"
                  placeholder="От"
                  value={minFloor?.toString() || ""}
                  onChange={(e) => dispatch(setMinFloor(+e.target.value))}
                />
                <MyInput
                  type="number"
                  placeholder="До"
                  value={maxFloor?.toString() || ""}
                  onChange={(e) => dispatch(setMaxFloor(+e.target.value))}
                />
              </div>
              <div className={styles.checkboxFloorGroup}>
                <Checkbox
                  checked={isNotFirstFloor}
                  onChange={() => dispatch(setIsNotFirstFloor(!isNotFirstFloor))}
                  aria-label="Не первый этаж"
                >
                  <p className={styles.label}>Не первый этаж?</p>
                </Checkbox>
                <Checkbox
                  checked={isNotLastFloor}
                  onChange={() => dispatch(setIsNotLastFloor(!isNotLastFloor))}
                  aria-label="Не последний этаж"
                >
                  <p className={styles.label}>Не последний этаж?</p>
                </Checkbox>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.checkboxGroup}>
                <MyCheckBox
                  checked={petsAllowed}
                  onChange={() => dispatch(setPetsAllowed(!petsAllowed))}
                  label="Разрешено ли с животными?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={utilitiesIncluded}
                  onChange={() => dispatch(setUtilitiesIncluded(!utilitiesIncluded))}
                  label="Включены ли коммунальные услуги?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={forStudents}
                  onChange={() => dispatch(setForStudents(!forStudents))}
                  label="Можно ли студентам?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={onlyEmptyApartments}
                  onChange={() => dispatch(setOnlyEmptyApartments(!onlyEmptyApartments))}
                  label="Только квартиры без жителей?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={badHabitsAllowed}
                  onChange={() => dispatch(setBadHabitsAllowed(!badHabitsAllowed))}
                  label="С вредными привычками"
                  labelClassName={styles.label}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.checkboxFloorGroup}>
                <p className={styles.label}>Тип жилья</p>
                {propertyTypeOptions.map((type) => (
                  <Checkbox
                    key={type.id}
                    checked={propertyType === type.code}
                    onChange={() => handlePropertyTypeSelect(type.code)}
                    aria-label={type.namerus}
                  >
                    <p className={styles.label}>{type.namerus}</p>
                  </Checkbox>
                ))}
              </div>

              <div className={styles.checkboxFloorGroup}>
                <p className={styles.label}>От кого?</p>
                {ownerTypeOptions.map((type) => (
                  <Checkbox
                    key={type.id}
                    checked={role === type.code}
                    onChange={() => handleOwnerTypeSelect(type.code)}
                    aria-label={type.namerus}
                  >
                    <p className={styles.label}>{type.namerus}</p>
                  </Checkbox>
                ))}
              </div>
            </div>
          </>
        )}

        <div className={styles.buttonGroup}>
          <MyButton
            className={styles.moreFiltersButton}
            onClick={() => setMoreFilters((prev) => !prev)}
          >
            <span>{moreFilters ? "Уменьшить фильтр" : "Подробный фильтр"}</span>
            <Images.Filter />
          </MyButton>
          <MyButton className={styles.saveSearchButton} onClick={onOpen}>
            <span>Сохранить поиск</span>
            <Images.Search color="black" />
          </MyButton>
        </div>

        <MyButton className={styles.submitButton} onClick={handleSubmit}>
          Найти
        </MyButton>
      </div>
      <SaveFilterModal isOpen={isOpen} onClose={onClose} />
    </aside>
  );
}
