import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Instagram,
  Leaf,
  Menu,
  Search,
  Sprout,
  X,
} from "lucide-react";
import animalsData from "./animals.json";
import { translations, type Language } from "./translations";

type Animal = {
  name: string;
  latin: string;
  habitat: string;
  habitatJa?: string;
  status: string;
  description: string;
  descriptionJa?: string;
  image: string;
  tag: string;
};

const animals: Animal[] = animalsData;

function ConservationStatus({ status }: { status: string }) {
  const isEndangered = status.toLowerCase().includes("endangered");

  return (
    <strong className="conservation-status">
      {isEndangered && <span className="endangered-dot" aria-hidden="true" />}
      {status}
    </strong>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [galleryPage, setGalleryPage] = useState(0);
  const [detailAnimal, setDetailAnimal] = useState<Animal | null>(null);
  const currentAnimal = animals[5];

  const text = translations[language];

  const filteredAnimals = animals.filter((animal) =>
    `${animal.name} ${animal.tag} ${animal.habitat}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filteredAnimals.length / pageSize));

  useEffect(() => {
    setGalleryPage(0);
  }, [query]);

  useEffect(() => {
    setGalleryPage((currentPage) => Math.min(currentPage, totalPages - 1));
  }, [totalPages]);

  const visibleAnimals = filteredAnimals.slice(
    galleryPage * pageSize,
    (galleryPage + 1) * pageSize,
  );

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigateTo = (id: string) => {
    if (detailAnimal) {
      setDetailAnimal(null);
      window.setTimeout(() => scrollTo(id), 0);
      return;
    }

    scrollTo(id);
  };

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lifer home">
          <span className="brand-mark">
            li<span>f</span>er.
          </span>
          <span className="brand-sub">{text.brand}</span>
        </a>

        <button
          className="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="header-actions">
          <button
            className={`language-switch ${language === "ja" ? "is-ja" : ""}`}
            type="button"
            onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            aria-label={
              language === "en"
                ? "Switch language to Japanese"
                : "Switch language to English"
            }
            aria-pressed={language === "ja"}
          >
            <span className="language-switch-track">
              <span className="language-switch-thumb">
                {language === "ja" ? "JP" : "EN"}
              </span>
            </span>
          </button>

          <nav
            className={menuOpen ? "nav nav-open" : "nav"}
            aria-label="Main navigation"
          >
            <button onClick={() => navigateTo("discover")}>
              {text.navDiscover}
            </button>
            <button onClick={() => navigateTo("gallery")}>
              {text.navAlbum}
            </button>
            <button onClick={() => navigateTo("about")}>{text.navAbout}</button>
          </nav>
        </div>
      </header>

      {detailAnimal ? (
        <section className="detail-section page-shell section-pad">
          <button
            className="text-link detail-back"
            type="button"
            onClick={() => {
              setDetailAnimal(null);
              window.setTimeout(() => scrollTo("gallery"), 0);
            }}
          >
            ← {text.backToAlbum}
          </button>
          <div className="daily-card">
            <div className="daily-photo">
              <img
                src={detailAnimal.image}
                alt={detailAnimal.name}
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="daily-content">
              <div className="daily-topline">
                <span>
                  {detailAnimal.tag.toUpperCase()} / {text.fieldGuide}
                </span>
                <span>
                  {text.no}{" "}
                  {String(animals.indexOf(detailAnimal) + 1).padStart(3, "0")}
                </span>
              </div>
              <h3>
                {detailAnimal.name}
                <br />
                <em>{detailAnimal.latin}</em>
              </h3>
              <p className="daily-description">
                {language === "ja"
                  ? (detailAnimal.descriptionJa ?? detailAnimal.description)
                  : detailAnimal.description}
              </p>
              <div className="animal-meta">
                <div>
                  <span>{text.habitat}</span>
                  <strong>
                    {language === "ja"
                      ? (detailAnimal.habitatJa ?? detailAnimal.habitat)
                      : detailAnimal.habitat}
                  </strong>
                </div>
                <div>
                  <span>{text.conservation}</span>
                  <ConservationStatus status={detailAnimal.status} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section
            className="daily-section page-shell section-pad"
            id="discover"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">{text.dailyEyebrow}</p>
                <h2>
                  {text.dailyTitleA}
                  <br />
                  <em>{text.dailyTitleB}</em>
                </h2>
              </div>
            </div>

            <div className="daily-card">
              <div className="daily-photo">
                <img
                  src={currentAnimal.image}
                  alt={currentAnimal.name}
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="photo-chip">
                  <Sprout size={13} /> {text.chip}
                </span>
              </div>
              <div className="daily-content">
                <div className="daily-topline">
                  <span>
                    {currentAnimal.tag.toUpperCase()} / {text.fieldGuide}
                  </span>
                  <span>
                    {text.no}{" "}
                    {String(animals.indexOf(currentAnimal) + 1).padStart(
                      3,
                      "0",
                    )}
                  </span>
                </div>
                <h3>
                  {currentAnimal.name}
                  <br />
                  <em>{currentAnimal.latin}</em>
                </h3>
                <p className="daily-description">
                  {language === "ja"
                    ? (currentAnimal.descriptionJa ?? currentAnimal.description)
                    : currentAnimal.description}
                </p>
                <div className="animal-meta">
                  <div>
                    <span>{text.habitat}</span>
                    <strong>
                      {language === "ja"
                        ? (currentAnimal.habitatJa ?? currentAnimal.habitat)
                        : currentAnimal.habitat}
                    </strong>
                  </div>
                  <div>
                    <span>{text.conservation}</span>
                    <ConservationStatus status={currentAnimal.status} />
                  </div>
                </div>
                <div className="daily-footer">
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => scrollTo("gallery")}
                  >
                    {text.viewAlbum} <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
            <p className="fine-print">{text.finePrint}</p>
          </section>

          <section
            className="gallery-section page-shell section-pad"
            id="gallery"
          >
            <div className="section-heading gallery-heading">
              <div>
                <p className="eyebrow">{text.galleryEyebrow}</p>
                <h2>
                  {text.galleryTitleA}
                  <br />
                  <em>{text.galleryTitleB}</em>
                </h2>
              </div>
              <div className="gallery-tools">
                <label className="search-box">
                  <Search size={15} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={text.searchPlaceholder}
                    aria-label="Search animals"
                  />
                </label>
                <span className="gallery-count">
                  {text.collection} 0{filteredAnimals.length}
                </span>
              </div>
            </div>

            <div className="gallery-strip">
              {filteredAnimals.length > 0 ? (
                <>
                  <div className="gallery-grid">
                    {visibleAnimals.map((animal, index) => (
                      <article className="gallery-card" key={animal.name}>
                        <button
                          className="gallery-image-button"
                          onClick={() => {
                            setDetailAnimal(animal);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          aria-label={`Explore ${animal.name}`}
                        >
                          <img
                            src={animal.image}
                            alt={animal.name}
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="gallery-image-arrow">
                            <ArrowUpRight size={18} />
                          </span>
                        </button>
                        <div className="gallery-card-copy">
                          <div className="gallery-card-meta">
                            <span>{animal.name}</span>
                            <span>0{galleryPage * pageSize + index + 1}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div
                    className="gallery-pagination"
                    aria-label="Album pagination"
                  >
                    <button
                      type="button"
                      className="gallery-page-button"
                      onClick={() => setGalleryPage(0)}
                      disabled={galleryPage === 0}
                      aria-label="First page"
                    >
                      «
                    </button>
                    <button
                      type="button"
                      className="gallery-page-button"
                      onClick={() =>
                        setGalleryPage((page) => Math.max(page - 1, 0))
                      }
                      disabled={galleryPage === 0}
                      aria-label="Previous page"
                    >
                      PREV
                    </button>
                    <span>
                      {galleryPage + 1} / {totalPages}
                    </span>
                    <button
                      type="button"
                      className="gallery-page-button"
                      onClick={() =>
                        setGalleryPage((page) =>
                          Math.min(page + 1, totalPages - 1),
                        )
                      }
                      disabled={galleryPage >= totalPages - 1}
                      aria-label="Next page"
                    >
                      NEXT
                    </button>
                    <button
                      type="button"
                      className="gallery-page-button"
                      onClick={() => setGalleryPage(totalPages - 1)}
                      disabled={galleryPage >= totalPages - 1}
                      aria-label="Last page"
                    >
                      »
                    </button>
                  </div>
                </>
              ) : (
                <p className="empty-state">
                  {text.empty.replace("{query}", query)}
                </p>
              )}
            </div>
          </section>

          <section className="journal-section page-shell" id="about">
            <div className="journal-mark">
              <Leaf size={27} strokeWidth={1} />
            </div>
            <p className="eyebrow">{text.journalEyebrow}</p>
            <h2>
              {text.journalTitleA}
              <br />
              <em>{text.journalTitleB}</em>
            </h2>
            <p className="journal-description">{text.journalDescription}</p>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">
              li<span>f</span>er.
            </span>
            <span className="brand-sub">{text.brand}</span>
          </a>
          <p>{text.footerLead}</p>
        </div>
        <div className="footer-actions">
          <div className="social-links" aria-label="Social links">
            <a
              href="https://www.facebook.com/quanwp/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/quansw_10969/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
          <a className="back-top" href="#top" aria-label="Back to top">
            <span>BACK TO TOP</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>{text.footerBottom1}</span>
          <span>{text.footerBottom2}</span>
          <span>{text.footerBottom3}</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
