"use client";
import React, { useState } from "react";
import styles from "./Filter.module.scss";
import Images from "@/components/common/Images";
import MySelect from "@/components/ui/MySelect";
import MyInput from "@/components/ui/MyInput";
import MySlider from "@/components/ui/MySlider";
import MyCalendar from "@/components/ui/MyCalendar";
import { Tabs, Tab, Checkbox, addToast } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import MyButton from "@/components/ui/MyButton";
import MyCheckBox from "@/components/ui/MyCheckBox";
import { useMediaQuery } from "react-responsive";

interface AddressNode {
  Id: number;
  ParentId?: number;
  AteTypeId?: number;
  GeonimTypeId?: number;
  NameRus: string;
  NameKaz: string;
  HasChild: boolean;
  AteTypeNameKaz: string;
  AteTypeNameRus: string;
  GeonimTypeNameKaz?: string;
  GeonimTypeNameRus?: string;
  Children: AddressNode[];
}

interface FilterProps {
  onSubmit?: (filterData: any) => void;
}

export default function Filter({ onSubmit }: FilterProps) {
  const [selectedGender, setSelectedGender] = useState("");
  const genders = [
    { value: "Мужчина", label: "Мужчина" },
    { value: "Женщина", label: "Женщина" },
    { value: "Любой", label: "Любой" },
  ];

  const [selectedRegion, setSelectedRegion] = useState<AddressNode | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<AddressNode | null>(null);
  const [selectedMicroDistrict, setSelectedMicroDistrict] = useState<AddressNode | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<AddressNode | null>(null);
  const [regions, setRegions] = useState<AddressNode[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 500000]);
  const handlePriceSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  const housematesOptions = ["1", "2", "3", "4", "5+"];
  const [selectedHousemate, setSelectedHousemate] = useState("1");

  const [rooms, setRooms] = useState(1);
  const incrementRooms = () => setRooms((prev) => Math.min(prev + 1, 10));
  const decrementRooms = () => setRooms((prev) => Math.max(prev - 1, 1));

  const [ageRange, setAgeRange] = useState([18, 50]);
  const handleAgeSliderChange = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  let [moveInDate, setMoveInDate] = useState(parseDate("2024-03-07"));

  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);

  const [moreFilters, setMoreFilters] = useState(false);

  const [roomSize, setRoomSize] = useState(["", "60"]);
  const handleRoomSizeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRoomSize = [...roomSize];
    newRoomSize[index] = e.target.value;
    setRoomSize(newRoomSize);
  };

  const [floors, setFloors] = useState(["", ""]);
  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFloors = [...floors];
    newFloors[index] = e.target.value;
    setFloors(newFloors);
  };
  const [isNotFirstFloor, setIsNotFirstFloor] = useState(false);
  const [isNotLastFloor, setIsNotLastFloor] = useState(false);

  const [termType, setTermType] = useState("long");

  const [petsAllowed, setPetsAllowed] = useState(false);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [forStudents, setForStudents] = useState(false);
  const [onlyEmptyApartments, setOnlyEmptyApartments] = useState(false);
  const [badHabitsAllowed, setBadHabitsAllowed] = useState(false);

  const [propertyType, setPropertyType] = useState("");
  
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  const resetFilters = () => {
    setSelectedGender("");
    setSelectedRegion(null);
    setSelectedDistrict(null);
    setSelectedMicroDistrict(null);
    setSelectedStreet(null);
    setPriceRange([0, 500000]);
    setSelectedHousemate("1");
    setRooms(1);
    setAgeRange([18, 50]);
    setMoveInDate(parseDate("2024-03-07"));
    setIsToday(false);
    setIsTomorrow(false);
    setRoomSize(["", "60"]);
    setFloors(["", ""]);
    setIsNotFirstFloor(false);
    setIsNotLastFloor(false);
    setTermType("long");
    setPetsAllowed(false);
    setUtilitiesIncluded(false);
    setForStudents(false);
    setOnlyEmptyApartments(false);
    setBadHabitsAllowed(false);
    setPropertyType("");
  };

  const handleSubmit = () => {
    const filterData = {
      selectedGender,
      region: selectedRegion?.NameRus,
      district: selectedDistrict?.NameRus,
      microDistrict: selectedMicroDistrict?.NameRus,
      street: selectedStreet?.NameRus,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      numberOfPeopleAreYouAccommodating: parseInt(selectedHousemate),
      quantityOfRooms: rooms,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      arriveDate: moveInDate,
      minArea: roomSize[0] ? parseInt(roomSize[0]) : 0,
      maxArea: roomSize[1] ? parseInt(roomSize[1]) : 500,
      notTheFirstFloor: isNotFirstFloor,
      notTheTopFloor: isNotLastFloor,
      forALongTime: termType === "long",
      arePetsAllowed: petsAllowed,
      isCommunalServiceIncluded: utilitiesIncluded,
      intendedForStudents: forStudents,
      onlyEmptyApartments: onlyEmptyApartments,
      badHabitsAllowed: badHabitsAllowed,
      typeOfHousing: propertyType,
    };
    
    if (onSubmit) {
      onSubmit(filterData);
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

  const saveFilter = () => {
    const filterData = {
      selectedGender,
      region: selectedRegion?.NameRus,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };
    
    addToast({
      title: "Поиск сохранен!",
      variant: "flat",
      radius: "sm",
      timeout: 2000,
      color: "primary",
    });
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
            options={genders}
            label="Гендер"
            value={selectedGender}
            placeholder="Выберите пол"
            onChange={(option) => setSelectedGender(option)}
          />
        </div>

        <div className={styles.section}>
          <MySelect
            label="Регион"
            placeholder={isLoadingRegions ? "Загрузка..." : "Выберите регион"}
            options={regions.map((region) => ({
              value: region.HasChild ? region.Id.toString() : `${region.Id}$`,
              label: region.NameRus || "",
            }))}
            value={selectedRegion?.Id ? selectedRegion.Id.toString() : ""}
            onChange={(optionValue) => {
              const selected = regions.find((region) => region.Id?.toString() === optionValue);
              setSelectedRegion(selected || null);
              setSelectedDistrict(null);
              setSelectedMicroDistrict(null);
            }}
            disabled={isLoadingRegions}
          />
        </div>

        {selectedRegion && selectedRegion.HasChild && (
          <div className={styles.section}>
            <MySelect
              label="Район"
              placeholder="Выберите район"
              options={selectedRegion.Children.map((district) => ({
                value: district.HasChild ? district.Id.toString() : `${district.Id}$`,
                label: district.NameRus || "",
              }))}
              value={selectedDistrict?.Id ? selectedDistrict.Id.toString() : ""}
              onChange={(optionValue) => {
                const selected = selectedRegion.Children.find(
                  (district) => district.Id?.toString() === optionValue
                );
                setSelectedDistrict(selected || null);
                setSelectedMicroDistrict(null);
              }}
            />
          </div>
        )}

        {selectedDistrict && selectedDistrict.HasChild && (
          <div className={styles.section}>
            <MySelect
              label="Микрорайон"
              placeholder="Выберите микрорайон"
              options={selectedDistrict.Children.map((micro) => ({
                value: micro.HasChild ? micro.Id.toString() : `${micro.Id}$`,
                label: micro.NameRus,
              }))}
              value={selectedMicroDistrict?.Id?.toString() || ""}
              onChange={(option) => {
                const selected = selectedDistrict.Children.find(
                  (micro) => micro.Id.toString() === option
                );
                setSelectedMicroDistrict(selected || null);
                setSelectedStreet(null);
              }}
            />
          </div>
        )}

        <div className={styles.section}>
          <p className={styles.label}>Выберите цену</p>
          <div className={styles.priceInputs}>
            <MyInput
              type="number"
              placeholder="Минимальный"
              value={priceRange[0].toString()}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            />
            <MyInput
              type="number"
              placeholder="Максимальный"
              value={priceRange[1].toString()}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            />
          </div>
          <div className={styles.relative}>
            <div className={styles.sliderLabels}>
              <span>0</span>
              <span>500000</span>
            </div>
            <MySlider
              value={priceRange}
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
            {housematesOptions.map((option) => (
              <MyButton
                key={option}
                isIconOnly
                className={`${styles.housemateItem} ${
                  selectedHousemate === option ? styles.selected : ""
                }`}
                onClick={() => setSelectedHousemate(option)}
              >
                {option}
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
            <span className={styles.roomCount}>{rooms}</span>
            <MyButton className={styles.roomControlButton} onClick={incrementRooms} isIconOnly>
              <Images.PlusIcon size={12} />
            </MyButton>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Возраст</p>
          <div className={styles.relative}>
            <div className={styles.sliderLabels}>
              <span>18</span>
              <span>50</span>
            </div>
            <MySlider
              value={ageRange}
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
            onSelectionChange={(key) => setTermType(key as string)}
            size="sm"
            radius="sm"
          >
            <Tab key="long" title="Долгосрочно" />
            <Tab key="short" title="Краткосрочно" />
          </Tabs>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Дата начала заселения</p>
          <MyCalendar
            aria-label="Дата заселения"
            value={moveInDate}
            variant="bordered"
            color={"primary"}
            onChange={(date) => setMoveInDate(date ?? parseDate("2024-03-07"))}
            size="md"
            radius="sm"
          />
          <div className={styles.checkboxFloorGroup}>
            <Checkbox
              checked={isToday}
              onChange={() => {
                setIsToday(!isToday);
                if (!isToday) setIsTomorrow(false);
              }}
              aria-label="Сегодня"
            >
              <p className={styles.label}>Сегодня</p>
            </Checkbox>
            <Checkbox
              checked={isTomorrow}
              onChange={() => {
                setIsTomorrow(!isTomorrow);
                if (!isTomorrow) setIsToday(false);
              }}
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
                  value={roomSize[0]}
                  onChange={(e) => handleRoomSizeChange(e, 0)}
                />
                <MyInput
                  type="number"
                  placeholder="До"
                  value={roomSize[1]}
                  onChange={(e) => handleRoomSizeChange(e, 1)}
                />
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.label}>Этаж</p>
              <div className={styles.priceInputs}>
                <MyInput
                  type="number"
                  placeholder="От"
                  value={floors[0]}
                  onChange={(e) => handleFloorChange(e, 0)}
                />
                <MyInput
                  type="number"
                  placeholder="До"
                  value={floors[1]}
                  onChange={(e) => handleFloorChange(e, 1)}
                />
              </div>
              <div className={styles.checkboxFloorGroup}>
                <Checkbox
                  checked={isNotFirstFloor}
                  onChange={() => setIsNotFirstFloor((prev) => !prev)}
                  aria-label="Не первый этаж"
                >
                  <p className={styles.label}>Не первый этаж?</p>
                </Checkbox>
                <Checkbox
                  checked={isNotLastFloor}
                  onChange={() => setIsNotLastFloor((prev) => !prev)}
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
                  onChange={() => setPetsAllowed((prev) => !prev)}
                  label="Разрешено ли с животными?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={utilitiesIncluded}
                  onChange={() => setUtilitiesIncluded((prev) => !prev)}
                  label="Включены ли коммунальные услуги?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={forStudents}
                  onChange={() => setForStudents((prev) => !prev)}
                  label="Можно ли студентам?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={onlyEmptyApartments}
                  onChange={() => setOnlyEmptyApartments((prev) => !prev)}
                  label="Только квартиры без жителей?"
                  labelClassName={styles.label}
                />

                <MyCheckBox
                  checked={badHabitsAllowed}
                  onChange={() => setBadHabitsAllowed((prev) => !prev)}
                  label="С вредными привычками"
                  labelClassName={styles.label}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.checkboxFloorGroup}>
                <p className={styles.label}>Тип жилья</p>
                <Checkbox
                  checked={propertyType === "Квартира"}
                  onChange={() => setPropertyType("Квартира")}
                  aria-label="Квартира"
                >
                  <p className={styles.label}>Квартира</p>
                </Checkbox>
                <Checkbox
                  checked={propertyType === "Дом"}
                  onChange={() => setPropertyType("Дом")}
                  aria-label="Дом"
                >
                  <p className={styles.label}>Дом</p>
                </Checkbox>
              </div>

              <div className={styles.checkboxFloorGroup}>
                <p className={styles.label}>От кого?</p>
                <Checkbox
                  checked={propertyType === "Квартира"}
                  onChange={() => setPropertyType("Квартира")}
                  aria-label="Квартира"
                >
                  <p className={styles.label}>От хозяев</p>
                </Checkbox>
                <Checkbox
                  checked={propertyType === "Дом"}
                  onChange={() => setPropertyType("Дом")}
                  aria-label="Дом"
                >
                  <p className={styles.label}>От жителей</p>
                </Checkbox>
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
          <MyButton className={styles.saveSearchButton} onClick={saveFilter}>
            <span>Сохранить поиск</span>
            <Images.Search color="black" />
          </MyButton>
        </div>

        <MyButton className={styles.submitButton} onClick={handleSubmit}>
          Найти
        </MyButton>
      </div>
    </aside>
  );
}