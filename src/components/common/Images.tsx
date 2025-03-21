"use client";

import {
  MapPin,
  Sun,
  Moon,
  Search,
  LogIn,
  User,
  PlusCircle,
  ChevronDown,
  Instagram,
  Send,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Receipt,
  UsersRound,
  ExternalLink,
  Calendar1,
  Building2,
  VenusAndMars,
  DoorOpen,
  House,
  Scaling,
  Check,
  Phone,
  ChevronUp,
  Plus,
  Minus,
  MapPin as MapPinIcon,
  Filter,
  Columns3,
  X,
  CircleCheckBig,
} from "lucide-react";

const whatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8747 4.09155C15.1106 3.31997 14.2005 2.70819 13.1976 2.29185C12.1947 1.87551 11.1189 1.66295 10.033 1.66655C5.48301 1.66655 1.77467 5.37488 1.77467 9.92488C1.77467 11.3832 2.15801 12.7999 2.87467 14.0499L1.70801 18.3332L6.08301 17.1832C7.29134 17.8415 8.64967 18.1915 10.033 18.1915C14.583 18.1915 18.2913 14.4832 18.2913 9.93322C18.2913 7.72488 17.433 5.64988 15.8747 4.09155ZM10.033 16.7915C8.79967 16.7915 7.59134 16.4582 6.53301 15.8332L6.28301 15.6832L3.68301 16.3665L4.37467 13.8332L4.20801 13.5749C3.52263 12.4808 3.15878 11.2159 3.15801 9.92488C3.15801 6.14155 6.24134 3.05822 10.0247 3.05822C11.858 3.05822 13.583 3.77488 14.8747 5.07488C15.5144 5.71143 16.0213 6.46867 16.366 7.30266C16.7108 8.13664 16.8865 9.03079 16.883 9.93322C16.8997 13.7165 13.8163 16.7915 10.033 16.7915ZM13.7997 11.6582C13.5913 11.5582 12.5747 11.0582 12.3913 10.9832C12.1997 10.9165 12.0663 10.8832 11.9247 11.0832C11.783 11.2915 11.3913 11.7582 11.2747 11.8915C11.158 12.0332 11.033 12.0499 10.8247 11.9415C10.6163 11.8415 9.94967 11.6165 9.16634 10.9165C8.54967 10.3665 8.14134 9.69155 8.01634 9.48322C7.89967 9.27488 7.99967 9.16655 8.10801 9.05822C8.19967 8.96655 8.31634 8.81655 8.41634 8.69988C8.51634 8.58321 8.55801 8.49155 8.62467 8.35821C8.69134 8.21655 8.65801 8.09988 8.60801 7.99988C8.55801 7.89988 8.14134 6.88321 7.97467 6.46655C7.80801 6.06655 7.63301 6.11655 7.50801 6.10821H7.10801C6.96634 6.10821 6.74967 6.15822 6.55801 6.36655C6.37467 6.57488 5.84134 7.07488 5.84134 8.09155C5.84134 9.10821 6.58301 10.0915 6.68301 10.2249C6.78301 10.3665 8.14134 12.4499 10.208 13.3415C10.6997 13.5582 11.083 13.6832 11.383 13.7749C11.8747 13.9332 12.3247 13.9082 12.683 13.8582C13.083 13.7999 13.908 13.3582 14.0747 12.8749C14.2497 12.3915 14.2497 11.9832 14.1913 11.8915C14.133 11.7999 14.008 11.7582 13.7997 11.6582Z"
      fill="#1AA683"
    />
  </svg>
);

const roleOwner = ({ w, h }: { w?: string; h?: string }) => (
  <svg
    width={w || "75"}
    height={h || "75"}
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.4661 30.6292H15.2995C15.0232 30.6292 14.7583 30.5194 14.5629 30.3241C14.3676 30.1287 14.2578 29.8638 14.2578 29.5875V15.0042C14.2578 14.7279 14.3676 14.4629 14.5629 14.2676C14.7583 14.0722 15.0232 13.9625 15.2995 13.9625H19.4661C19.7424 13.9625 20.0074 14.0722 20.2027 14.2676C20.3981 14.4629 20.5078 14.7279 20.5078 15.0042V29.5875C20.5078 29.8638 20.3981 30.1287 20.2027 30.3241C20.0074 30.5194 19.7424 30.6292 19.4661 30.6292Z"
      fill="#A0041E"
    />
    <path d="M10.416 33.3333L37.4993 6.25L64.5827 33.3333V68.75H10.416V33.3333Z" fill="#FFE8B6" />
    <path d="M37.5 33.3333H39.5833V66.6667H37.5V33.3333Z" fill="#FFCC4D" />
    <path
      d="M64.5837 35.4167C64.0312 35.4166 63.5014 35.197 63.1108 34.8063L37.5003 9.19584L11.8899 34.8063C11.6965 34.9997 11.4669 35.1531 11.2141 35.2578C10.9614 35.3625 10.6905 35.4164 10.417 35.4164C10.1435 35.4164 9.87259 35.3625 9.61987 35.2578C9.36714 35.1531 9.13751 34.9997 8.94409 34.8063C8.75066 34.6128 8.59723 34.3832 8.49254 34.1305C8.38786 33.8778 8.33398 33.6069 8.33398 33.3333C8.33398 33.0598 8.38786 32.7889 8.49254 32.5362C8.59723 32.2835 8.75066 32.0538 8.94409 31.8604L36.0274 4.77709C36.4181 4.38652 36.9479 4.16711 37.5003 4.16711C38.0528 4.16711 38.5826 4.38652 38.9733 4.77709L66.0566 31.8604C66.3489 32.1514 66.5481 32.5226 66.6291 32.927C66.71 33.3315 66.6689 33.7508 66.5111 34.1318C66.3533 34.5129 66.0858 34.8384 65.7427 35.0672C65.3995 35.2959 64.9961 35.4176 64.5837 35.4167Z"
      fill="#66757F"
    />
    <path
      d="M37.4999 35.4167C37.0875 35.4176 36.6841 35.2959 36.3409 35.0672C35.9977 34.8384 35.7303 34.5129 35.5725 34.1318C35.4146 33.7508 35.3736 33.3315 35.4545 32.927C35.5354 32.5226 35.7347 32.1514 36.027 31.8604L49.5687 18.3188C49.7621 18.1253 49.9917 17.9719 50.2444 17.8672C50.4972 17.7625 50.768 17.7086 51.0416 17.7086C51.3151 17.7086 51.586 17.7625 51.8387 17.8672C52.0914 17.9719 52.3211 18.1253 52.5145 18.3188C52.7079 18.5122 52.8614 18.7418 52.966 18.9945C53.0707 19.2473 53.1246 19.5181 53.1246 19.7917C53.1246 20.0652 53.0707 20.3361 52.966 20.5888C52.8614 20.8415 52.7079 21.0712 52.5145 21.2646L38.9728 34.8063C38.5822 35.197 38.0524 35.4166 37.4999 35.4167Z"
      fill="#66757F"
    />
    <path d="M20.834 54.1667H29.1673V66.6667H20.834V54.1667Z" fill="#C1694F" />
    <path
      d="M20.834 35.4167H29.1673V43.75H20.834V35.4167ZM46.8757 35.4167H55.209V43.75H46.8757V35.4167ZM46.8757 54.1667H55.209V62.5H46.8757V54.1667Z"
      fill="#55ACEE"
    />
    <path
      d="M69.7923 69.7917C69.7923 70.6205 69.4631 71.4153 68.877 72.0014C68.291 72.5874 67.4961 72.9167 66.6673 72.9167H8.33398C7.50518 72.9167 6.71033 72.5874 6.12428 72.0014C5.53822 71.4153 5.20898 70.6205 5.20898 69.7917C5.20898 68.9629 5.53822 68.168 6.12428 67.582C6.71033 66.9959 7.50518 66.6667 8.33398 66.6667H66.6673C67.4961 66.6667 68.291 66.9959 68.877 67.582C69.4631 68.168 69.7923 68.9629 69.7923 69.7917Z"
      fill="#5C913B"
    />
  </svg>
);

const roleTenant = ({ w, h }: { w?: string; h?: string }) => (
  <svg
    width={w || "75"}
    height={h || "75"}
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M66.7969 8.20312C58.9453 0.351562 46.2891 0.351562 38.5547 8.20312C32.1094 14.6484 31.0547 24.375 35.0391 31.9922L6.44531 60.9375L2.34375 70.7812L4.21875 72.6562L11.6016 71.9531L43.0078 40.0781C50.625 44.2969 60.3516 43.125 66.6797 36.6797C74.6484 28.8281 74.6484 16.0547 66.7969 8.20312ZM61.1719 22.5C58.8281 24.8438 54.9609 24.8438 52.6172 22.5C50.2734 20.1562 50.2734 16.2891 52.6172 13.8281C54.9609 11.4844 58.8281 11.4844 61.1719 13.8281C63.6328 16.1719 63.6328 20.0391 61.1719 22.5Z"
      fill="#FFBD75"
    />
    <path
      d="M18.516 67.3828L20.1566 65.625V63.2812L11.6019 71.9531L16.7582 71.3672L18.516 69.6094V67.3828ZM30.5863 55.0781L32.2269 53.3203V50.9766L21.9144 61.5234H24.2582L25.8988 59.7656H28.2425L30.5863 57.4219V55.0781ZM35.7425 37.0312C36.3285 36.4453 35.9769 36.2109 35.7425 35.8594C35.391 35.5078 35.2738 35.1563 34.6878 35.8594L9.25816 61.5234C8.67222 62.1094 9.02378 62.3438 9.25816 62.6953C9.60972 63.0469 9.72691 63.3984 10.3128 62.6953L35.7425 37.0312ZM39.2582 40.5469C39.8441 39.9609 39.4925 39.7266 39.2582 39.375C38.9066 39.0234 38.7894 38.6719 38.2035 39.375L12.6566 65.0391C12.0707 65.625 12.4222 65.8594 12.6566 66.2109C13.0082 66.5625 13.1253 66.9141 13.7113 66.2109L39.2582 40.5469ZM65.6253 9.375C58.4769 2.22656 46.8753 2.22656 39.7269 9.375C34.3363 14.7656 33.0472 22.7344 35.7425 29.4141C33.2816 23.0859 34.6878 15.7031 39.7269 10.6641C46.5238 3.75 57.6566 3.75 64.4535 10.5469C71.2503 17.4609 71.2503 28.5938 64.4535 35.3906C59.4144 40.4297 52.0316 41.7188 45.8207 39.375C52.5003 42.0703 60.3519 40.7812 65.7425 35.3906C72.7738 28.2422 72.7738 16.5234 65.6253 9.375Z"
      fill="#CC7F2B"
    />
  </svg>
);

const radioNotSelected = ({ w, h }: { w?: string; h?: string }) => (
  <svg
    width={w || "24"}
    height={h || "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11.5" stroke="#EBEBEB" />
  </svg>
);

const radioSelected = ({ w, h }: { w?: string; h?: string }) => (
  <svg
    width={w || "24"}
    height={h || "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11.5" stroke="#1AA683" />
    <ellipse cx="11.9999" cy="12" rx="4" ry="4" fill="#1AA683" />
  </svg>
);

const Images = {
  Map: MapPin,
  Sun: Sun,
  Moon: Moon,
  Search: Search,
  Login: LogIn,
  User: User,
  Plus: PlusCircle,
  ChevronDown: ChevronDown,
  Instagram: Instagram,
  Telegram: Send,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ArrowRight: ArrowRight,
  Money: Receipt,
  People: UsersRound,
  Share: ExternalLink,
  Calendar: Calendar1,
  Apartment: Building2,
  GenderBoth: VenusAndMars,
  Rooms: DoorOpen,
  House: House,
  Area: Scaling,
  Complete: Check,
  Phone: Phone,
  Whatsapp: whatsappIcon,
  ChevronUp: ChevronUp,
  PlusIcon: Plus,
  MinusIcon: Minus,
  MapPinIcon: MapPinIcon,
  Filter: Filter,
  List: Columns3,
  roleOwner: roleOwner,
  roleTenant: roleTenant,
  closeIcon: X,
  radioSelected: radioSelected,
  radioNotSelected: radioNotSelected,
  Finish: CircleCheckBig,
};

export default Images;
