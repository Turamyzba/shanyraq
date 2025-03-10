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

export default function Filter() {
  // Basic Filter States
  const [selectedGender, setSelectedGender] = useState("");
  const genders = [
    { value: "Мужчина", label: "Мужчина" },
    { value: "Женщина", label: "Женщина" },
    { value: "Любой", label: "Любой" },
  ];

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [microDistrict, setMicroDistrict] = useState("");
  const regions = [
    { value: "Весь Казахстан", label: "Весь Казахстан" },
    { value: "Шымкент", label: "Шымкент" },
    { value: "Астана", label: "Астана" },
    { value: "Алматы", label: "Алматы" },
  ];

  // Price Range & Slider
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const handlePriceSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Housemates
  const housematesOptions = ["1", "2", "3", "4", "5+"];
  const [selectedHousemate, setSelectedHousemate] = useState("1");

  // Rooms
  const [rooms, setRooms] = useState(1);
  const incrementRooms = () => setRooms((prev) => Math.min(prev + 1, 10));
  const decrementRooms = () => setRooms((prev) => Math.max(prev - 1, 1));

  // Age Range
  const [ageRange, setAgeRange] = useState([18, 50]);
  const handleAgeSliderChange = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  // Move-in Date & Checkboxes (using Hero UI Calendar & Checkbox)
  let [moveInDate, setMoveInDate] = useState(parseDate("2024-03-07"));

  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);
  //   const toggleToday = () => {
  //     setIsToday((prev) => !prev);
  //     if (!isToday) {
  //       setIsTomorrow(false);
  //       setMoveInDate(new Date().toISOString().split("T")[0]);
  //     } else {
  //       setMoveInDate("");
  //     }
  //   };
  //   const toggleTomorrow = () => {
  //     setIsTomorrow((prev) => !prev);
  //     if (!isTomorrow) {
  //       setIsToday(false);
  //       const tomorrow = new Date();
  //       tomorrow.setDate(tomorrow.getDate() + 1);
  //       setMoveInDate(tomorrow.toISOString().split("T")[0]);
  //     } else {
  //       setMoveInDate("");
  //     }
  //   };

  // More Filters Toggle
  const [moreFilters, setMoreFilters] = useState(false);

  // Additional Filters
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

  // Long Term vs Short Term using Hero UI Tabs
  const [termType, setTermType] = useState("long"); // "long" or "short"

  // Additional Options using Hero UI Checkbox
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [forStudents, setForStudents] = useState(false);
  const [onlyEmptyApartments, setOnlyEmptyApartments] = useState(false);
  const [badHabitsAllowed, setBadHabitsAllowed] = useState(false);

  // Property Type selection (Apartment/House)
  const [propertyType, setPropertyType] = useState("");

  // Additional Switch—for example, auto-update search
  const [autoUpdate, setAutoUpdate] = useState(false);

  // Reset All Filters
  const resetFilters = () => {
    setSelectedGender("");
    setRegion("");
    setDistrict("");
    setMicroDistrict("");
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
    setBadHabitsAllowed(false);
    setPropertyType("");
    setAutoUpdate(false);
  };

  // Dummy Submit & Save Handlers
  const handleSubmit = () => {
    const queryObject = {
      selectedGender,
      region,
      district,
      microDistrict,
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
      badHabitsAllowed: badHabitsAllowed,
      typeOfHousing: propertyType,
      autoUpdate,
    };
    console.log("Filter submitted:", queryObject);
  };

  const saveFilter = () => {
    const queryObject = {
      selectedGender,
      region,
      district,
      microDistrict,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      numberOfPeopleAreYouAccommodating: selectedHousemate,
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
      badHabitsAllowed: badHabitsAllowed,
      typeOfHousing: propertyType,
      autoUpdate,
    };
    // if (sessionStorage.getItem("savedFilter")) {
    //   alert(
    //     "Фильтр уже был сохранен ранее. Перезагрузите страницу или очистите, чтобы сохранить заново."
    //   );
    //   return;
    // }
    // sessionStorage.setItem("savedFilter", JSON.stringify(queryObject));
    addToast({
      title: "Поиск сохранен!",
      description: "Toast displayed successfully",
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

        {/* Gender Section */}
        <div className={styles.section}>
          <MySelect
            options={genders}
            label="Гендер"
            value={selectedGender}
            placeholder="Выберите пол"
            onChange={(option) => setSelectedGender(option)}
          />
        </div>

        {/* Region Section */}
        <div className={styles.section}>
          <MySelect
            options={regions}
            label="Регион"
            value={region}
            placeholder="Выберите регион"
            onChange={(option) => setRegion(option)}
          />
        </div>

        {/* District Section */}
        <div className={styles.section}>
          <MySelect
            options={regions}
            label="Район"
            value={district}
            placeholder="Выберите район"
            onChange={(option) => setDistrict(option)}
          />
        </div>

        {/* Microdistrict Section */}
        <div className={styles.section}>
          <MySelect
            options={regions}
            label="Микрорайон"
            value={microDistrict}
            placeholder="Выберите микрорайон"
            onChange={(option) => setMicroDistrict(option)}
          />
        </div>

        {/* Price Section */}
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

        {/* Housemates Section */}
        <div className={styles.section}>
          <p className={styles.label}>Количество сожителей</p>
          <ul className={styles.housemates}>
            {housematesOptions.map((option) => (
              <li
                key={option}
                className={`${styles.housemateItem} ${
                  selectedHousemate === option ? styles.selected : ""
                }`}
                onClick={() => setSelectedHousemate(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        {/* Rooms Section */}
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

        {/* Age Section */}
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

        {/* Long vs Short Term */}
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

        {/* Move-in Date Section */}
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
              //   onChange={() => toggleToday()}
              aria-label="Сегодня"
            >
              <p className={styles.label}>Сегодня</p>
            </Checkbox>
            <Checkbox
              checked={isTomorrow}
              //   onChange={() => toggleTomorrow()}
              aria-label="Завтра"
            >
              <p className={styles.label}>Завтра</p>
            </Checkbox>
          </div>
        </div>

        {/* More Filters Section */}
        {moreFilters && (
          <>
            {/* Room Size */}
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

            {/* Floor */}
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

            {/* Additional Options */}
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
              {/* Property Type */}
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

              {/* From Owner? */}

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

        {/* More Filters & Save Buttons */}
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

        {/* Submit Button */}
        <MyButton className={styles.submitButton} onClick={handleSubmit}>
          Найти
        </MyButton>
      </div>
    </aside>
  );
}
