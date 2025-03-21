"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Dropdown, Input, Slider } from "antd";
import MySlider from "../ui/MySlider";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchBar.module.scss";
import Images from "@/components/common/Images";

interface AddressType {
  id: number;
  parentid: number;
  haschild: boolean;
  atetypenamerus: string;
  atetypenamekaz: string;
  namerus: string;
  namekaz: string;
  children?: AddressType[];
}

interface AddressState {
  regionOrCityName: string;
  districtName: string;
  microDistrictName: string;
}

const SearchBar: React.FC = () => {
  const router = useRouter();
  
  // Use media queries for responsive design
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  
  // Search state
  const [address, setAddress] = useState<AddressState>({
    regionOrCityName: "Весь Казахстан",
    districtName: "",
    microDistrictName: ""
  });
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [gender, setGender] = useState<string>("");
  const [roommates, setRoommates] = useState<string>("");
  
  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Address selection states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [citiesData, setCitiesData] = useState<AddressType[]>([]);
  const [districtsData, setDistrictsData] = useState<AddressType[]>([]);
  const [microDistrictsData, setMicroDistrictsData] = useState<AddressType[]>([]);
  
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Gender options
  const genders = [
    { id: 1, name: "Мужской" },
    { id: 2, name: "Женский" }
  ];

  // Roommates options
  const roommateOptions = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" }
  ];
  
  // Fetch initial cities (top level) on component mount
  useEffect(() => {
    fetchAddressData(1);
  }, []);
  
  // Fetch address data by parent ID
  const fetchAddressData = async (parentId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://192.168.1.230:8080/api/address/get-children/${parentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch address data');
      }
      
      const data: AddressType[] = await response.json();
      
      // Determine what level of data we're fetching
      if (parentId === 1) {
        setCitiesData(data);
      } else if (selectedCityId === parentId) {
        setDistrictsData(data);
      } else if (selectedDistrictId === parentId) {
        setMicroDistrictsData(data);
      }
      
    } catch (error) {
      console.error("Error fetching address data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper for icon sizes
  const getIconSize = () => {
    return isSmallMobile ? 16 : 20;
  };

  // Generate display text for address
  const getAddressDisplay = () => {
    if (address.microDistrictName) return address.microDistrictName;
    if (address.districtName) return address.districtName;
    return address.regionOrCityName;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Handle search button click
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct query params
    const queryParams: Record<string, string> = {
      region: address.regionOrCityName !== "Весь Казахстан" ? address.regionOrCityName : "",
      district: address.districtName || "",
      microDistrict: address.microDistrictName || "",
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      gender: gender || "",
      roommates: roommates || ""
    };

    // Filter out empty keys
    const cleanedParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, v]) => v !== "")
    );

    // Construct query string
    const queryString = new URLSearchParams(cleanedParams).toString();

    // Navigate to search results
    router.push(`/apartments?${queryString}`);
  };

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Address selection handlers
  const handleCitySelect = (city: AddressType) => {
    setAddress(prev => ({
      ...prev,
      regionOrCityName: city.namerus,
      districtName: "",
      microDistrictName: ""
    }));
    setSelectedCityId(city.id);
    setSelectedDistrictId(null);
    setDistrictsData([]);
    setMicroDistrictsData([]);
    
    // Fetch districts if the city has children
    if (city.haschild) {
      fetchAddressData(city.id);
    }
  };

  const handleDistrictSelect = (district: AddressType) => {
    setAddress(prev => ({
      ...prev,
      districtName: district.namerus,
      microDistrictName: ""
    }));
    setSelectedDistrictId(district.id);
    setMicroDistrictsData([]);
    
    // Fetch micro-districts if the district has children
    if (district.haschild) {
      fetchAddressData(district.id);
    }
  };

  const handleMicroDistrictSelect = (microDistrict: AddressType) => {
    setAddress(prev => ({
      ...prev,
      microDistrictName: microDistrict.namerus
    }));
  };

  const handleSelectAllKazakhstan = () => {
    setAddress({
      regionOrCityName: "Весь Казахстан",
      districtName: "",
      microDistrictName: ""
    });
    setSelectedCityId(null);
    setSelectedDistrictId(null);
    setDistrictsData([]);
    setMicroDistrictsData([]);
  };

  // Filter cities by search term
  const filteredCities = searchTerm
    ? citiesData.filter(city => 
        city.namerus.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : citiesData;

  // Dropdown content renderers
  const renderAddressDropdown = () => (
    <div className={styles.addressDropdown}>
      <div className={styles.searchInput}>
        <Input
          placeholder="Поиск по городу"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchOutlined style={{ color: "#B5B7C0" }} />}
        />
      </div>
      
      <div className={styles.addressColumns}>
        {/* Cities Column */}
        <div className={styles.addressColumn}>
          <ul>
            <li 
              className={address.regionOrCityName === "Весь Казахстан" ? styles.activeItem : ""}
              onClick={handleSelectAllKazakhstan}
            >
              Весь Казахстан
            </li>
            {filteredCities.map(city => (
              <li 
                key={city.id}
                className={address.regionOrCityName === city.namerus ? styles.activeItem : ""}
                onClick={() => handleCitySelect(city)}
              >
                {city.namerus}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Districts Column */}
        {districtsData.length > 0 && (
          <div className={styles.addressColumn}>
            <ul>
              <li 
                className={!address.districtName ? styles.activeItem : ""}
                onClick={() => {
                  setAddress(prev => ({
                    ...prev,
                    districtName: "",
                    microDistrictName: ""
                  }));
                  setSelectedDistrictId(null);
                  setMicroDistrictsData([]);
                }}
              >
                Все районы
              </li>
              {districtsData.map(district => (
                <li 
                  key={district.id}
                  className={address.districtName === district.namerus ? styles.activeItem : ""}
                  onClick={() => handleDistrictSelect(district)}
                >
                  {district.namerus}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Micro-Districts Column */}
        {microDistrictsData.length > 0 && (
          <div className={styles.addressColumn}>
            <ul>
              <li 
                className={!address.microDistrictName ? styles.activeItem : ""}
                onClick={() => setAddress(prev => ({...prev, microDistrictName: ""}))}
              >
                Все микрорайоны
              </li>
              {microDistrictsData.map(microDistrict => (
                <li 
                  key={microDistrict.id}
                  className={address.microDistrictName === microDistrict.namerus ? styles.activeItem : ""}
                  onClick={() => handleMicroDistrictSelect(microDistrict)}
                >
                  {microDistrict.namerus}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className={styles.confirmButton}>
        <button onClick={() => setOpenDropdown(null)}>
          Выбрать
        </button>
      </div>
    </div>
  );

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
      
      <div className={styles.confirmButton}>
        <button onClick={() => setOpenDropdown(null)}>
          Применить
        </button>
      </div>
    </div>
  );

  const renderGenderDropdown = () => (
    <div className={styles.genderDropdown}>
      <h3>Выберите пол</h3>
      
      <ul>
        {genders.map(g => (
          <li 
            key={g.id}
            className={gender === g.name ? styles.activeGender : ""}
            onClick={() => {
              setGender(g.name);
              setOpenDropdown(null);
            }}
          >
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderRoommatesDropdown = () => (
    <div className={styles.roommatesDropdown}>
      <h3>Количество сожителей</h3>
      
      <ul className={styles.roommatesList}>
        {roommateOptions.map(r => (
          <li 
            key={r.id}
            className={roommates === r.name ? styles.activeRoommate : ""}
            onClick={() => {
              setRoommates(r.name);
              setOpenDropdown(null);
            }}
          >
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.searchBarWrapper}>
      <form onSubmit={handleSearch} className={styles.searchBarForm}>
        <div className={styles.searchItems}>
          {/* Location Selector */}
          <Dropdown
            open={openDropdown === 'address'}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown('address');
              else if (openDropdown === 'address') setOpenDropdown(null);
            }}
            trigger={['click']}
            dropdownRender={renderAddressDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div 
              className={styles.searchItem}
              onClick={() => toggleDropdown('address')}
            >
              <Images.Map color="black" size={getIconSize()} />
              <p>{getAddressDisplay()}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          {/* Price Range */}
          <Dropdown
            open={openDropdown === 'price'}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown('price');
              else if (openDropdown === 'price') setOpenDropdown(null);
            }}
            trigger={['click']}
            dropdownRender={renderPriceDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div 
              className={styles.searchItem}
              onClick={() => toggleDropdown('price')}
            >
              <Images.Money color="black" size={getIconSize()} />
              <p>{`${formatPrice(priceRange[0])}-${formatPrice(priceRange[1])}`}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          {/* Gender Selector */}
          <Dropdown
            open={openDropdown === 'gender'}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown('gender');
              else if (openDropdown === 'gender') setOpenDropdown(null);
            }}
            trigger={['click']}
            dropdownRender={renderGenderDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div 
              className={styles.searchItem}
              onClick={() => toggleDropdown('gender')}
            >
              <Images.User color="black" size={getIconSize()} />
              <p>{gender || "Выберите пол"}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>

          {/* Roommates Selector */}
          <Dropdown
            open={openDropdown === 'roommates'}
            onOpenChange={(visible) => {
              if (visible) setOpenDropdown('roommates');
              else if (openDropdown === 'roommates') setOpenDropdown(null);
            }}
            trigger={['click']}
            dropdownRender={renderRoommatesDropdown}
            overlayClassName={styles.customDropdown}
          >
            <div 
              className={styles.searchItem}
              onClick={() => toggleDropdown('roommates')}
            >
              <Images.People color="black" size={getIconSize()} />
              <p>{roommates ? `${roommates} человек` : "Количество сожителей"}</p>
              <Images.ChevronDown color="black" size={getIconSize()} />
            </div>
          </Dropdown>
        </div>

        {/* Search Button */}
        <button type="submit" className={styles.searchButton}>
          {isMobile && <span>Поиск</span>}
          <Images.Search size={isSmallMobile ? 16 : 18} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;