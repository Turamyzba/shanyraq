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
  MinusIcon,
} from "lucide-react";

const whatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8747 4.09155C15.1106 3.31997 14.2005 2.70819 13.1976 2.29185C12.1947 1.87551 11.1189 1.66295 10.033 1.66655C5.48301 1.66655 1.77467 5.37488 1.77467 9.92488C1.77467 11.3832 2.15801 12.7999 2.87467 14.0499L1.70801 18.3332L6.08301 17.1832C7.29134 17.8415 8.64967 18.1915 10.033 18.1915C14.583 18.1915 18.2913 14.4832 18.2913 9.93322C18.2913 7.72488 17.433 5.64988 15.8747 4.09155ZM10.033 16.7915C8.79967 16.7915 7.59134 16.4582 6.53301 15.8332L6.28301 15.6832L3.68301 16.3665L4.37467 13.8332L4.20801 13.5749C3.52263 12.4808 3.15878 11.2159 3.15801 9.92488C3.15801 6.14155 6.24134 3.05822 10.0247 3.05822C11.858 3.05822 13.583 3.77488 14.8747 5.07488C15.5144 5.71143 16.0213 6.46867 16.366 7.30266C16.7108 8.13664 16.8865 9.03079 16.883 9.93322C16.8997 13.7165 13.8163 16.7915 10.033 16.7915ZM13.7997 11.6582C13.5913 11.5582 12.5747 11.0582 12.3913 10.9832C12.1997 10.9165 12.0663 10.8832 11.9247 11.0832C11.783 11.2915 11.3913 11.7582 11.2747 11.8915C11.158 12.0332 11.033 12.0499 10.8247 11.9415C10.6163 11.8415 9.94967 11.6165 9.16634 10.9165C8.54967 10.3665 8.14134 9.69155 8.01634 9.48322C7.89967 9.27488 7.99967 9.16655 8.10801 9.05822C8.19967 8.96655 8.31634 8.81655 8.41634 8.69988C8.51634 8.58321 8.55801 8.49155 8.62467 8.35821C8.69134 8.21655 8.65801 8.09988 8.60801 7.99988C8.55801 7.89988 8.14134 6.88321 7.97467 6.46655C7.80801 6.06655 7.63301 6.11655 7.50801 6.10821H7.10801C6.96634 6.10821 6.74967 6.15822 6.55801 6.36655C6.37467 6.57488 5.84134 7.07488 5.84134 8.09155C5.84134 9.10821 6.58301 10.0915 6.68301 10.2249C6.78301 10.3665 8.14134 12.4499 10.208 13.3415C10.6997 13.5582 11.083 13.6832 11.383 13.7749C11.8747 13.9332 12.3247 13.9082 12.683 13.8582C13.083 13.7999 13.908 13.3582 14.0747 12.8749C14.2497 12.3915 14.2497 11.9832 14.1913 11.8915C14.133 11.7999 14.008 11.7582 13.7997 11.6582Z"
      fill="#1AA683"
    />
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
};

export default Images;
