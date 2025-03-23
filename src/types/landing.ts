export interface AddressType {
    id: number;
    parentid: number;
    haschild: boolean;
    namerus: string;
    namekaz: string;
    children?: AddressType[];
  }
  
export interface GenderState {
    id: number;
    namerus: string;
    namekaz: string;
    code: string;
}

export interface RommatesState {
    id: number;
    name: string;
}

export interface AddressState {
    regionId: number | null;
    regionName: string;
    districtId: number | null;
    districtName: string;
    microDistrictId: number | null;
    microDistrictName: string;
}

export interface LandingCard {
    announcementId: number;
    image: string;
    title: string;
    address: string;
    arriveDate: string;
    roomCount: string;
    selectedGender: string;
    roommates: number;
    cost: number;
    coordsX: string;
    coordsY: string;
    isArchived: boolean;
    consideringOnlyNPeople: boolean;
}

export const genderOptions: GenderState[] = [
    { id: 1, namerus: "Мужской", namekaz: "Ер", code: "MALE" },
    { id: 2, namerus: "Женский", namekaz: "Әйел", code: "FEMALE" },
    { id: 3, namerus: "Любой", namekaz: "Кез-келген", code: "OTHER" },
];

export const roommateOptions: RommatesState[] = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" },
 ];

 export const appAdvantages = [
   {
     id: 1,
     title: "Удобный поиск соседей",
     description:
       "Наше приложение позволяет быстро найти подходящих соседей, фильтруя по предпочтениям, местоположению и типу жилья, что экономит время и усилия.",
   },
   {
     id: 2,
     title: "Безопасность и проверка данных",
     description:
       "В Shanyraq мы уделяем особое внимание безопасности пользователей. Все аккаунты проходят верификацию, что гарантирует надежность информации и безопасность общения.",
   },
   {
     id: 3,
     title: "Интерактивная карта",
     description:
       "Интерактивная карта позволяет пользователям легко находить комнаты и квартиры в нужных районах города, а также оценивать близость к транспорту, магазинам и другим важным объектам.",
   },
   {
     id: 4,
     title: "Функция мгновенных уведомлений",
     description:
       "Получайте мгновенные уведомления о новых объявлениях, которые соответствуют вашим критериям поиска, чтобы не упустить лучшие варианты.",
   },
   {
     id: 5,
     title: "Отзывы и рейтинги",
     description:
       "Каждый пользователь может оставлять отзывы о своем опыте проживания, что помогает выбрать надежных и комфортных соседей, а также избежать неприятных ситуаций.",
   },
   {
     id: 6,
     title: "Простота в использовании",
     description:
       "Приложение имеет интуитивно понятный интерфейс, который позволяет пользователям легко размещать объявления, просматривать предложения и общаться с потенциальными соседями.",
   },
   {
     id: 7,
     title: "Поддержка разных форматов жилья",
     description:
       "Мы предлагаем не только квартиры, но и комнаты, койко-места, а также совместное проживание в различных типах жилья — от студий до многокомнатных квартир.",
   },
 ];