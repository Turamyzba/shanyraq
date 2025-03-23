"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Dropdown, Input } from "antd";
import MySlider from "../ui/MySlider";
import styles from "./SearchBar.module.scss";
import Images from "@/components/common/Images";
import MySelect from "@/components/ui/MySelect";
import MyButton from "../ui/MyButton";
import { Button } from "@heroui/react";
import { getAddresses, AddressType, AddressState, GenderState, RommatesState } from "@/lib/api/filterService";

const SearchBar: React.FC = () => {
  const router = useRouter();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  const [address, setAddress] = useState<AddressState>({
    regionId: null,
    regionName: "Весь Казахстан",
    districtId: null,
    districtName: "",
    microDistrictId: null,
    microDistrictName: "",
  });

  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [gender, setGender] = useState<GenderState>();
  const [roommates, setRoommates] = useState<RommatesState>();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [citiesData, setCitiesData] = useState<AddressType[]>([]);
  const [districtsData, setDistrictsData] = useState<AddressType[]>([]);
  const [microDistrictsData, setMicroDistrictsData] = useState<AddressType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mobileRegion, setMobileRegion] = useState<AddressType | null>(null);
  const [mobileDistrict, setMobileDistrict] = useState<AddressType | null>(null);
  const [mobileMicroDistrict, setMobileMicroDistrict] = useState<AddressType | null>(null);

  const genders = [
    { id: 1, name: "Мужской", code: "MALE" },
    { id: 2, name: "Женский", code: "FEMALE" },
    { id: 3, name: "Любой", code: "OTHER" },
  ];

  const roommateOptions = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" },
  ];

  // --------------------------------------
  // Fetch Functions
  // --------------------------------------
  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const data = await getAddresses(1);
      setCitiesData(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDistricts = async (cityId: number) => {
    try {
      setIsLoading(true);
      const data = await getAddresses(cityId);
      setDistrictsData(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMicroDistricts = async (districtId: number) => {
    try {
      setIsLoading(true);
      const data = await getAddresses(districtId);
      setMicroDistrictsData(data);
    } catch (error) {
      console.error("Error fetching microDistricts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const getIconSize = () => {
    return isSmallMobile ? 16 : 20;
  };

  const getAddressDisplay = () => {
    if (address.microDistrictName) return address.microDistrictName;
    if (address.districtName) return address.districtName;
    return address.regionName;
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams: Record<string, string> = {};

    // region, district, microDistrict (IDs)
    if (address.regionId && address.regionId > 0) {
      queryParams.region = address.regionId.toString();
    }
    if (address.districtId && address.districtId > 0) {
      queryParams.district = address.districtId.toString();
    }
    if (address.microDistrictId && address.microDistrictId > 0) {
      queryParams.microDistrict = address.microDistrictId.toString();
    }

    // Price range
    queryParams.minPrice = priceRange[0].toString();
    queryParams.maxPrice = priceRange[1].toString();

    // gender => selectedGender
    if (gender) {
      queryParams.selectedGender = gender.code;
    }

    // numberOfPeopleAreYouAccommodating
    if (roommates) {
      queryParams.numberOfPeopleAreYouAccommodating = roommates.id.toString();
    }

    console.log(queryParams);

    // Filter out empty keys
    // const queryString = new URLSearchParams(queryParams).toString();

    // // Navigate to /apartments?...
    // router.push(`/apartments?${queryString}`);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleCitySelect = (city: AddressType) => {
    setMobileRegion(null);
    setMobileDistrict(null);
    setMobileMicroDistrict(null);
    setDistrictsData([]);
    setMicroDistrictsData([]);

    setAddress((prev) => ({
      ...prev,
      regionId: city.id,
      regionName: city.namerus,
      districtId: null,
      districtName: "",
      microDistrictId: null,
      microDistrictName: "",
    }));

    if (city.haschild) {
      fetchDistricts(city.id);
    }
  };

  const handleDistrictSelect = (district: AddressType) => {
    setMicroDistrictsData([]);
    setMobileDistrict(null);
    setMobileMicroDistrict(null);

    setAddress((prev) => ({
      ...prev,
      districtId: district.id,
      districtName: district.namerus,
      microDistrictId: null,
      microDistrictName: "",
    }));

    if (district.haschild) {
      fetchMicroDistricts(district.id);
    }
  };

  const handleMicroDistrictSelect = (microDistrict: AddressType) => {
    setMobileMicroDistrict(null);
    setAddress((prev) => ({
      ...prev,
      microDistrictId: microDistrict.id,
      microDistrictName: microDistrict.namerus,
    }));
  };

  const handleSelectAllKazakhstan = () => {
    setAddress({
      regionId: null,
      regionName: "Весь Казахстан",
      districtId: null,
      districtName: "",
      microDistrictId: null,
      microDistrictName: "",
    });

    setDistrictsData([]);
    setMicroDistrictsData([]);
  };

  const renderPriceDropdown = () => (
    <div className={styles.priceDropdown}>
      <h3>Выберите цену</h3>

      <div className={styles.priceInputs}>
        <Input
          placeholder="Минимальный"
          value={formatPrice(priceRange[0])}
          onChange={(e) => {
            const value = e.target.value === "" ? 0 : parseInt(e.target.value.replace(/\D/g, ""));
            if (!isNaN(value)) {
              setPriceRange([value, priceRange[1]]);
            }
          }}
        />
        <Input
          placeholder="Максимальный"
          value={formatPrice(priceRange[1])}
          onChange={(e) => {
            const value = e.target.value === "" ? 0 : parseInt(e.target.value.replace(/\D/g, ""));
            if (!isNaN(value)) {
              setPriceRange([priceRange[0], value]);
            }
          }}
        />
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.sliderLabels}>
          <span>0</span>
          <span>500 000</span>
        </div>
        <MySlider
          min={0}
          max={500000}
          step={5000}
          value={priceRange}
          handleSliderChange={(event: any, newValue: number | number[]) => {
            setPriceRange(newValue as number[]);
          }}
          className={styles.priceSlider}
        />
      </div>

      <div className={styles.actionContent}>
        <Button className={styles.confirmButton} onPress={() => setOpenDropdown(null)}>
          Применить
        </Button>
      </div>
    </div>
  );

  const renderGenderDropdown = () => (
    <div className={styles.genderDropdown}>
      <h3>Выберите пол</h3>

      <ul>
        {genders.map((g) => (
          <Button
            key={g.id}
            className={`${styles.genderItem} ${gender?.code === g.code ? styles.activeGender : ""}`}
            onPress={() => {
              setGender(g);
              setOpenDropdown(null);
            }}
          >
            {g.name}
          </Button>
        ))}
      </ul>
    </div>
  );

  const renderRoommatesDropdown = () => (
    <div className={styles.roommatesDropdown}>
      <h3>Количество сожителей</h3>

      <ul className={styles.roommatesList}>
        {roommateOptions.map((r) => (
          <li
            key={r.id}
            className={roommates?.id === r.id ? styles.activeRoommate : ""}
            onClick={() => {
              setRoommates(r);
              setOpenDropdown(null);
            }}
          >
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );

  function handleMobileRegionChange(value: string) {
    const nextRegion = citiesData.find((r) => r.id.toString() === value) || null;
    setMobileRegion(nextRegion);
    setMobileDistrict(null);
    setMobileMicroDistrict(null);

    setDistrictsData([]);
    setMicroDistrictsData([]);

    if (nextRegion) {
      setAddress((prev) => ({
        ...prev,
        regionId: nextRegion.id,
        regionName: nextRegion.namerus,
        districtId: null,
        districtName: "",
        microDistrictId: null,
        microDistrictName: "",
      }));

      if (nextRegion.haschild) {
        fetchDistricts(nextRegion.id);
      }
    } else {
      setAddress((prev) => ({
        ...prev,
        regionId: null,
        regionName: "Весь Казахстан",
        districtId: null,
        districtName: "",
        microDistrictId: null,
        microDistrictName: "",
      }));
    }
  }

  function handleMobileDistrictChange(value: string) {
    const nextDist = districtsData.find((d) => d.id.toString() === value) || null;
    setMobileDistrict(nextDist);
    setMobileMicroDistrict(null);

    if (nextDist) {
      setAddress((prev) => ({
        ...prev,
        districtId: nextDist.id,
        districtName: nextDist.namerus,
        microDistrictId: null,
        microDistrictName: "",
      }));

      if (nextDist.haschild) {
        fetchMicroDistricts(nextDist.id);
      } else {
        setMicroDistrictsData([]);
      }
    } else {
      setAddress((prev) => ({
        ...prev,
        districtId: null,
        districtName: "",
        microDistrictId: null,
        microDistrictName: "",
      }));
      setMicroDistrictsData([]);
    }
  }

  function handleMobileMicroDistrictChange(value: string) {
    const nextMicro = microDistrictsData.find((m) => m.id.toString() === value) || null;
    setMobileMicroDistrict(nextMicro);

    if (nextMicro) {
      setAddress((prev) => ({
        ...prev,
        microDistrictId: nextMicro.id,
        microDistrictName: nextMicro.namerus,
      }));
    } else {
      setAddress((prev) => ({
        ...prev,
        microDistrictId: null,
        microDistrictName: "",
      }));
    }
  }

  function renderAddressDropdown() {
    if (!isMobile) {
      return (
        <div className={styles.addressDropdown}>
          <div className={styles.addressColumns}>
            <div className={styles.addressColumn}>
              <ul>
                <Button
                  className={`${styles.addressColumnItem} ${
                    address.regionName === "Весь Казахстан" ? styles.activeItem : ""
                  }`}
                  onPress={handleSelectAllKazakhstan}
                >
                  Весь Казахстан
                </Button>
                {citiesData.map((city) => (
                  <Button
                    key={city.id}
                    className={`${styles.addressColumnItem} ${
                      address.regionId === city.id ? styles.activeItem : ""
                    }`}
                    onPress={() => handleCitySelect(city)}
                  >
                    {city.namerus}
                  </Button>
                ))}
              </ul>
            </div>

            {districtsData.length > 0 && (
              <div className={styles.addressColumn}>
                <ul>
                  <Button
                    className={`${styles.addressColumnItem} ${
                      !address.districtId ? styles.activeItem : ""
                    }`}
                    onPress={() => {
                      setAddress((prev) => ({
                        ...prev,
                        districtId: null,
                        districtName: "",
                        microDistrictId: null,
                        microDistrictName: "",
                      }));
                      setMicroDistrictsData([]);
                    }}
                  >
                    Все районы
                  </Button>
                  {districtsData.map((dist) => (
                    <Button
                      key={dist.id}
                      className={`${styles.addressColumnItem} ${
                        address.districtId === dist.id ? styles.activeItem : ""
                      }`}
                      onPress={() => handleDistrictSelect(dist)}
                    >
                      {dist.namerus}
                    </Button>
                  ))}
                </ul>
              </div>
            )}

            {microDistrictsData.length > 0 && (
              <div className={styles.addressColumn}>
                <ul>
                  <Button
                    className={`${styles.addressColumnItem} ${
                      !address.microDistrictId ? styles.activeItem : ""
                    }`}
                    onPress={() =>
                      setAddress((prev) => ({
                        ...prev,
                        microDistrictId: null,
                        microDistrictName: "",
                      }))
                    }
                  >
                    Все микрорайоны
                  </Button>
                  {microDistrictsData.map((micro) => (
                    <Button
                      key={micro.id}
                      className={`${styles.addressColumnItem} ${
                        address.microDistrictId === micro.id ? styles.activeItem : ""
                      }`}
                      onPress={() => handleMicroDistrictSelect(micro)}
                    >
                      {micro.namerus}
                    </Button>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <MyButton className={styles.confirmButton} onClick={() => setOpenDropdown(null)}>
            Выбрать
          </MyButton>
        </div>
      );
    } else {
      return (
        <div className={styles.mobileAddressDropdown}>
          <div className={styles.mobileAddressContainer}>
            <div className={styles.section}>
              <MySelect
                label="Регион"
                placeholder="Выберите регион"
                options={citiesData.map((r) => ({
                  value: r.id.toString(),
                  label: r.namerus,
                }))}
                value={mobileRegion?.id ? mobileRegion.id.toString() : ""}
                onChange={handleMobileRegionChange}
              />
            </div>

            {mobileRegion?.haschild && (
              <div className={styles.section}>
                <MySelect
                  label="Район"
                  placeholder="Выберите район"
                  options={districtsData.map((dist) => ({
                    value: dist.id.toString(),
                    label: dist.namerus,
                  }))}
                  value={mobileDistrict?.id ? mobileDistrict.id.toString() : ""}
                  onChange={handleMobileDistrictChange}
                />
              </div>
            )}

            {mobileDistrict?.haschild && (
              <div className={styles.section}>
                <MySelect
                  label="Микрорайон"
                  placeholder="Выберите микрорайон"
                  options={microDistrictsData.map((m) => ({
                    value: m.id.toString(),
                    label: m.namerus,
                  }))}
                  value={mobileMicroDistrict?.id ? mobileMicroDistrict.id.toString() : ""}
                  onChange={handleMobileMicroDistrictChange}
                />
              </div>
            )}
          </div>

          <MyButton className={styles.confirmButton} onClick={() => setOpenDropdown(null)}>
            Выбрать
          </MyButton>
        </div>
      );
    }
  }

  return (
    <div className={styles.searchBarWrapper}>
      <form onSubmit={handleSearch} className={styles.searchBarForm}>
        <div className={styles.searchItems}>
          <Dropdown
            open={openDropdown === "address"}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown("address");
              else if (openDropdown === "address") setOpenDropdown(null);
            }}
            trigger={["click"]}
            dropdownRender={renderAddressDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div className={styles.searchItem} onClick={() => toggleDropdown("address")}>
              <Images.Map color="black" size={getIconSize()} />
              <p>{getAddressDisplay()}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          <Dropdown
            open={openDropdown === "price"}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown("price");
              else if (openDropdown === "price") setOpenDropdown(null);
            }}
            trigger={["click"]}
            dropdownRender={renderPriceDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div className={styles.searchItem} onClick={() => toggleDropdown("price")}>
              <Images.Money color="black" size={getIconSize()} />
              <p>{`${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          <Dropdown
            open={openDropdown === "gender"}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown("gender");
              else if (openDropdown === "gender") setOpenDropdown(null);
            }}
            trigger={["click"]}
            dropdownRender={renderGenderDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div className={styles.searchItem} onClick={() => toggleDropdown("gender")}>
              <Images.User color="black" size={getIconSize()} />
              <p>{gender?.name || "Выберите пол"}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          <Dropdown
            open={openDropdown === "roommates"}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown("roommates");
              else if (openDropdown === "roommates") setOpenDropdown(null);
            }}
            trigger={["click"]}
            dropdownRender={renderRoommatesDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div className={styles.searchItem} onClick={() => toggleDropdown("roommates")}>
              <Images.People color="black" size={getIconSize()} />
              <p>{roommates ? `${roommates.name} человек` : "Количество сожителей"}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>
        </div>

        <Button isIconOnly type="submit" className={styles.searchButton}>
          {isMobile && <span>Поиск</span>}
          <Images.Search size={isSmallMobile ? 16 : 18} />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
