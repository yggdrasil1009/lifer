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
import productsData from "./products.json";
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
  image_thumb: string;
  tag: string;
};

const animals: Animal[] = animalsData;

function animalSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function animalFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length !== 3 || segments[1] !== "detail") return null;

  const [category, , slug] = segments;
  const normalizedSlug = slug.replace(/_/g, "-");

  return (
    animals.find(
      (animal) =>
        animal.tag.toLowerCase() === category &&
        animalSlug(animal.name) === normalizedSlug,
    ) ?? null
  );
}

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
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [detailProduct, setDetailProduct] = useState<
    (typeof productsData)[number] | null
  >(null);
  const [showProducts, setShowProducts] = useState(false);
  const detailAnimal = animalFromPath(pathname);
  const currentAnimal = animals[5];

  const text = translations[language];

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigatePath = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setPathname(path);
  };

  const openAnimal = (animal: Animal) => {
    navigatePath(
      `/${animal.tag.toLowerCase()}/detail/${animalSlug(animal.name)}`,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    const target = document.getElementById(id);

    if ((id === "about" || id === "gallery") && target) {
      window.scrollTo({
        top:
          target.getBoundingClientRect().top +
          window.scrollY,
        behavior: "smooth",
      });
      return;
    }

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigateTo = (id: string) => {
    if (detailProduct) {
      setDetailProduct(null);
      setShowProducts(false);
      window.setTimeout(() => scrollTo(id), 0);
      return;
    }

    if (detailAnimal) {
      navigatePath("/");
      window.setTimeout(() => scrollTo(id), 0);
      return;
    }

    if (showProducts) {
      setShowProducts(false);
      window.setTimeout(() => scrollTo(id), 0);
      return;
    }

    scrollTo(id);
  };

  const openProducts = () => {
    setMenuOpen(false);
    navigatePath("/");
    setDetailProduct(null);
    setShowProducts(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProduct = (product: (typeof productsData)[number]) => {
    setDetailProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="top">
      <header className="site-header">
        <a
          className="brand"
          href="#discover"
          aria-label="Lifer home"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("discover");
          }}
        >
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
            <button onClick={openProducts}>{text.navProduct}</button>
            <button onClick={() => navigateTo("about")}>{text.navAbout}</button>
          </nav>
        </div>
      </header>

      {detailProduct ? (
        <section className="product-detail-section page-shell section-pad">
          <button
            className="text-link detail-back"
            type="button"
            onClick={() => {
              setDetailProduct(null);
              window.setTimeout(() => scrollTo("products"), 0);
            }}
          >
            ← {text.backToProducts}
          </button>
          <div className="product-detail-layout">
            <div className="product-detail-visual">
              <div className="product-detail-image">
                <img
                  src={detailProduct.image}
                  alt={detailProduct.name[language]}
                />
                <div className="product-image-overlay">
                  <div className="product-image-meta">
                    <h2>{detailProduct.name[language]}</h2>
                    <strong>{detailProduct.price}</strong>
                  </div>
                  <button
                    className="product-order-button"
                    type="button"
                    disabled
                  >
                    {text.orderUnavailable}
                  </button>
                </div>
              </div>
            </div>
            <div className="product-detail-copy">
              <p className="eyebrow">{text.productDetailEyebrow}</p>

              <div className="product-info-block">
                <h3>{text.materialLabel}</h3>
                <p>{detailProduct.material[language]}</p>
              </div>
              <div className="product-info-block">
                <h3>{text.feelingLabel}</h3>
                <p>{detailProduct.feeling[language]}</p>
              </div>

              <div className="product-size-guide">
                <h3>{text.sizeGuideLabel}</h3>
                <div className="product-size-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">{text.sizeLabel}</th>
                        <th scope="col">{text.chestLabel}</th>
                        <th scope="col">{text.lengthLabel}</th>
                        <th scope="col">{text.shoulderLabel}</th>
                        <th scope="col">{text.sleeveLabel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailProduct.sizes.map((size) => (
                        <tr key={size.size}>
                          <th scope="row">{size.size}</th>
                          <td>{size.chest}</td>
                          <td>{size.length}</td>
                          <td>{size.shoulder}</td>
                          <td>{size.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="product-measurement-note">
                  {text.measurementNote}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : detailAnimal ? (
        <section className="detail-section page-shell section-pad">
          <button
            className="text-link detail-back"
            type="button"
            onClick={() => {
              navigatePath("/");
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
                loading="eager"
                decoding="async"
                {...{ fetchpriority: "high" }}
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
      ) : showProducts ? (
        <section
          className="products-section page-shell section-pad"
          id="products"
        >
          <div className="section-heading products-heading">
            <div>
              <p className="eyebrow">{text.productEyebrow}</p>
              <h2>
                {text.productTitleA}
                <br />
                <em>{text.productTitleB}</em>
              </h2>
            </div>
            <p className="section-intro">{text.productDescription}</p>
          </div>

          <div className="product-grid">
            {productsData.map((product, index) => (
              <article
                className="product-card"
                key={product.name.en}
                role="button"
                tabIndex={0}
                onClick={() => openProduct(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProduct(product);
                  }
                }}
                aria-label={`${product.name[language]} - ${text.productDetailEyebrow}`}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="product-index">
                    FIELD GOODS / 0{index + 1}
                  </span>
                </div>
                <div className="product-details">
                  <div className="product-name-price">
                    <h3>{product.name[language]}</h3>
                    <strong>{product.price}</strong>
                  </div>
                  <p>{product.description[language]}</p>
                  <span className="product-sizes">{text.productSizes}</span>
                </div>
              </article>
            ))}
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
                  {...{ fetchpriority: "high" }}
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
                          onClick={() => openAnimal(animal)}
                          aria-label={`Explore ${animal.name}`}
                        >
                          <img
                            src={animal.image_thumb}
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
            <img
              className="journal-photo"
              src="/photographer.webp"
              alt="Photographer"
            />
            <p className="journal-description">{text.journalDescription}</p>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-top">
          <a
            className="brand footer-brand"
            href="#discover"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("discover");
            }}
          >
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
              href="https://www.instagram.com/quan_sw10969/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
          <a
            className="back-top"
            href="/"
            aria-label="Back to top"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("discover");
            }}
          >
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
