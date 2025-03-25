"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import Images from "../components/common/Images";
import Container from "../components/layouts/Container";
import styles from "./page.module.scss";
import LandingCard from "../components/common/LandingCard";
import CardSkeleton from "../components/common/LandingCardSkeleton";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import { useLazyGetGreatDealsQuery } from "@/store/features/landing/landingApi";
import { Card } from "@/types/common";
import { appAdvantages } from "@/types/landing";

export default function LandingPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  const router = useRouter();
  const [getGreatDeals] = useLazyGetGreatDealsQuery();

  const [greatDeals, setGreatDeals] = useState<Card[]>([]);
  const [expandedKeys, setExpandedKeys] = useState(new Set(["1"]));
  const [isLoading, setIsLoading] = useState(false);

  const fetchGreatDeals = () => {
    setIsLoading(true);
    getGreatDeals().then(({ data }) => {
      setGreatDeals(data?.data as Card[]);
    }).finally(() => {
      setIsLoading(false);
    })
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
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Найди идеального сожителя!</h1>
            <p className={styles.heroSubtitleText}>
              Маркетплейс для тех, кто ищет комфортное жилье и надежного соседа.
            </p>
            <SearchBar />
          </div>
        </div>

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
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className="card-wrapper" key={`skeleton-${index}`}>
                      <CardSkeleton />
                    </div>
                  ))
              : greatDeals.map((card, index) => (
                  <div className="card-wrapper" key={card.announcementId}>
                    <LandingCard
                      key={card.announcementId}
                      card={card}
                      isLast={index === greatDeals.length - 1}
                    />
                  </div>
                ))}
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBar}></div>
            <h1>Начните сдавать комнату сами!</h1>
            <p>На нашем сайте вы можете выставлять свои объявления</p>
            <Button
              className={styles.ctaButton}
              onPress={() => router.push("/my-announcements/create-announcements")}
            >
              Подать объявление
              <Images.ArrowRight size={isSmallMobile ? 16 : 20} />
            </Button>
          </div>
        </div>

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
