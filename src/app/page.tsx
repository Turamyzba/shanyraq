"use client";

import Link from "next/link";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import Images from "../components/common/Images";
import Container from "../components/layouts/Container";
import styles from "./page.module.scss";

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

export default function LandingPage() {
  return (
    <Container>
      <div className={styles.landing}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Найди идеального сожителя!</h1>
            <p>Маркетплейс для тех, кто ищет комфортное жилье и надежного соседа.</p>
            <div className={styles.searchBar}>
              <div className={styles.searchItem}>
                <Images.Map color="black" size={20} />
                <p>Астана</p>
                <Images.ChevronDown color="black" size={20} />
              </div>
              <div className={styles.searchItem}>
                <Images.Money color="black" size={20} />
                <p>150 000-200 000</p>
                <Images.ChevronDown color="black" size={20} />
              </div>
              <div className={styles.searchItem}>
                <Images.User color="black" size={20} />
                <p>Мужчины</p>
                <Images.ChevronDown color="black" size={20} />
              </div>
              <div className={styles.searchItem}>
                <Images.People color="black" size={20} />
                <p>3 жителей</p>
                <Images.ChevronDown color="black" size={20} />
              </div>
              <Button className={styles.searchButton}>
                <Images.Search size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Offers Section */}
        <div className={styles.offers}>
          <div className={styles.offersHeader}>
            <h2>Выгодные предложения</h2>
            <div className={styles.navButtons}>
              <Button className={styles.navButton}>
                <Images.ChevronLeft />
              </Button>
              <Button className={styles.navButton}>
                <Images.ChevronRight />
              </Button>
            </div>
          </div>

          <div className={styles.offersList}>
            <div className={styles.cardPlaceholder}></div>
            <div className={styles.cardPlaceholder}></div>
            <div className={styles.cardPlaceholder}></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBar}></div>
            <h1>Начните сдавать комнату сами!</h1>
            <p>На нашем сайте вы можете выставлять свои объявления</p>
            <Button className={styles.ctaButton}>
              Подать объявление
              <Images.ArrowRight />
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefits}>
          <h2>Наши преимущества</h2>
          <div className={styles.benefitsContent}>
            <Accordion selectionMode="multiple" >
              {appAdvantages.map((advantage) => (
                <AccordionItem
                  key={advantage.id}
                  aria-label={advantage.title}
                  title={
                    <span className={styles.advantageTitle}>
                      {advantage.title}
                    </span>
                  }
                >
                  <p className={styles.advantageDescription}>{advantage.description}</p>
                  <a href="#" className={styles.advantageLink}>
                    Узнать больше
                  </a>
                </AccordionItem>
              ))}
            </Accordion>
            <div className={styles.benefitImage}>
              <img src="/benefit.png" alt="benefit" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
