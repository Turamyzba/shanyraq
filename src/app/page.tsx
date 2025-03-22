"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import Images from "../components/common/Images";
import Container from "../components/layouts/Container";
import styles from "./page.module.scss";
import Card from "../components/common/LandingCard";
import CardSkeleton from "../components/common/LandingCardSkeleton";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";

const appAdvantages = [
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

interface GreatDeal {
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

export default function LandingPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [cardData, setCardData] = useState<GreatDeal[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  const [expandedKeys, setExpandedKeys] = useState(new Set(["1"]));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchGreatDeals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://shanyraq-server-production.up.railway.app/api/announcement/great-deals");
      
      if (!response.ok) {
        throw new Error("Failed to fetch great deals");
      }

      const data = await response.json();
      setCardData(data);
    } catch (err: any) {
      console.log(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchGreatDeals();
  }, []);

  const handlePrev = () => {
    if (scrollRef.current) {
      const scrollAmount = isSmallMobile ? -300 : isMobile ? -320 : -350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const scrollAmount = isSmallMobile ? 300 : isMobile ? 320 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <div className={styles.landing}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Найди идеального сожителя!</h1>
            <p className={styles.heroSubtitleText}>Маркетплейс для тех, кто ищет комфортное жилье и надежного соседа.</p>
            <SearchBar />
          </div>
        </div>

        {/* Offers Section */}
        <div className={styles.offers}>
          <div className={styles.offersHeader}>
            <h2>Выгодные предложения</h2>
            <div className={styles.navButtons}>
              <Button className={styles.navButton} onPress={handlePrev}>
                <Images.ChevronLeft size={isSmallMobile ? 16 : 20} />
              </Button>
              <Button className={styles.navButton} onPress={handleNext}>
                <Images.ChevronRight size={isSmallMobile ? 16 : 20} />
              </Button>
            </div>
          </div>

          <div className={styles.offersList} ref={scrollRef}>
            {isLoading 
              ? Array(4).fill(0).map((_, index) => (
                  <div className="card-wrapper" key={`skeleton-${index}`}>
                    <CardSkeleton />
                  </div>
                ))
              : cardData.map((card, index) => (
                  <div className="card-wrapper" key={card.announcementId}>
                    <Card key={card.announcementId} card={card} isLast={index === cardData.length - 1} />
                  </div>
                ))
            }
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBar}></div>
            <h1>Начните сдавать комнату сами!</h1>
            <p>На нашем сайте вы можете выставлять свои объявления</p>
            <Button 
              className={styles.ctaButton}
              onPress={() => router.push('/my-announcements/create-announcements')}
            >
              Подать объявление
              <Images.ArrowRight size={isSmallMobile ? 16 : 20} />
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefits}>
          <h2>Наши преимущества</h2>
          <div className={styles.benefitsContent}>
            <div className={styles.accordionWrapper}>
              <Accordion 
                selectionMode="multiple" 
                selectedKeys={expandedKeys}
                onSelectionChange={(keys) => setExpandedKeys(keys as Set<string>)}
              >
                {appAdvantages.map((advantage) => (
                  <AccordionItem
                    key={advantage.id.toString()}
                    aria-label={advantage.title}
                    title={<span className={styles.advantageTitle}>{advantage.title}</span>}
                  >
                    <p className={styles.advantageDescription}>{advantage.description}</p>
                    <a href="#" className={styles.advantageLink}>
                      Узнать больше
                    </a>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className={styles.benefitImage}>
              <img src="/benefit.png" alt="benefit" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}