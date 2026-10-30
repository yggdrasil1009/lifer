import { useState } from "react";
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

const animals: Animal[] = [
  {
    name: "Crimson sunbird",
    latin: "Aethopyga siparaja",
    habitat: "Forest edges & flowering gardens",
    habitatJa: "花が咲く林縁と庭園",
    status: "Least concern*",
    description:
      "A nectar-feeding bird with a vivid red body and a quick, darting flight through open woodland.",
    descriptionJa: "花が多い林縁で飛び回る、鮮やかな赤い体を持つ蜜食いの鳥。",
    image: "/sunbird_crimson.jpg",
    tag: "Bird",
  },
  {
    name: "Olive-backed sunbird",
    latin: "Cinnyris jugularis",
    habitat: "Gardens & lowland scrub",
    habitatJa: "庭園と低地の雑木林",
    status: "Least concern*",
    description:
      "A tiny bird with a metallic sheen that feeds on nectar and thrives where flowers are abundant.",
    descriptionJa:
      "光沢のある小さな羽を持ち、花が豊富な場所で蜜を食べて暮らす鳥。",
    image: "/sunbird_garden.jpg",
    tag: "Bird",
  },
  {
    name: "Chipmunk",
    latin: "Tamias striatus",
    habitat: "Woodland clearings & hedgerows",
    habitatJa: "森林の空き地と生け垣",
    status: "Least concern*",
    description:
      "A compact ground forager with striped cheeks and a quick instinct for sheltering among roots and stones.",
    descriptionJa:
      "頬に縞模様があり、根や石の間に身を隠す本能がすばやい小さな地上採食動物。",
    image: "/squirrel_chipmunk.jpg",
    tag: "Mammal",
  },
  {
    name: "White wagtail",
    latin: "Motacilla alba",
    habitat: "Riversides & open lawns",
    habitatJa: "川辺と開けた芝生",
    status: "Least concern*",
    description:
      "A lively, tail-bobbing bird that follows water edges and open ground in search of insects.",
    descriptionJa:
      "水辺や広い芝生を歩きながら、尾を上下に振って昆虫を探す活発な鳥。",
    image: "/wagtail_white.jpg",
    tag: "Bird",
  },
  {
    name: "The red squirrel",
    latin: "Sciurus vulgaris",
    habitat: "Woodland canopies",
    habitatJa: "森林の樹冠",
    status: "Least concern*",
    description:
      "A nimble climber with a remarkable sense of balance, built for life among branches.",
    descriptionJa:
      "枝の上での生活に合わせた、驚くほどバランスの良い敏捷な木登り動物。",
    image: "/squirrel-hero.png",
    tag: "Mammal",
  },
  {
    name: "Brown flycatcher",
    latin: "Muscicapa dauurica",
    habitat: "Woodland edges & shaded trails",
    habitatJa: "林縁と日陰の小道",
    status: "Least concern*",
    description:
      "A poised insect hunter that snaps up prey mid-air in quick, flickering bursts.",
    descriptionJa: "空中で小さな獲物を素早く捕らえる、落ち着いた昆虫食の鳥。",
    image: "/flycatcher_brown.jpg",
    tag: "Bird",
  },
  {
    name: "Stripe-throated bulbul",
    latin: "Pycnonotus finlaysoni",
    habitat: "Forest edges & scrubland",
    habitatJa: "林縁と低木地帯",
    status: "Least concern*",
    description:
      "A lively songbird with a warm olive coat and a bright throat stripe that stands out in the morning light.",
    descriptionJa: "明るい喉の縞模様が目立ち、朝の光に映える活発な鳴き鳥。",
    image: "/bulbul_stripethroat.jpg",
    tag: "Bird",
  },
  {
    name: "Plaintive cuckoo",
    latin: "Cacomantis merulinus",
    habitat: "Open woodland & tropical edges",
    habitatJa: "開けた森林と熱帯の境界",
    status: "Least concern*",
    description:
      "A soft, echoing call from the canopy and a patient watcher among the branches, often heard before it is seen.",
    descriptionJa:
      "樹冠から響く静かな声で知られ、枝の間でじっと見守る忍び寄るような鳥。",
    image: "/cuckoo_plaintive.jpg",
    tag: "Bird",
  },
  {
    name: "Paddyfield pipit",
    latin: "Anthus rufulus",
    habitat: "Rice paddies & grassy margins",
    habitatJa: "水田と草地の縁",
    status: "Least concern*",
    description:
      "A small, ground-feeding bird that flicks through open grasslands and wet fields with quick, running steps.",
    descriptionJa:
      "水田や草地を素早く走り回り、開けた場所を移動する小さな地上の鳥。",
    image: "/paddyfield_pipit.jpg",
    tag: "Bird",
  },
  {
    name: "Siberian stonechat",
    latin: "Saxicola maurus",
    habitat: "Open scrub & field edges",
    habitatJa: "開けた低木地帯と畑の縁",
    status: "Least concern*",
    description:
      "A lively, upright songbird that perches on exposed stems and calls from the edge of open country.",
    descriptionJa:
      "露出した茎に止まり、開けた原野の縁で鳴きながら活発に動く鳥。",
    image: "/siberia_stonechat.jpg",
    tag: "Bird",
  },
];

function App() {
  type Language = "en" | "ja";

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState(0);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const currentAnimal = animals[4];

  const strings = {
    en: {
      navDiscover: "DISCOVER",
      navAlbum: "ALBUM",
      navAbout: "ABOUT",
      brand: "WILDLIFE JOURNAL",
      dailyEyebrow: "01 / BEST MOMENT",
      dailyTitleA: "ANIMAL OF",
      dailyTitleB: "THE YEAR.",
      chip: "Light through the leaves",
      fieldGuide: "FIELD GUIDE",
      no: "NO.",
      habitat: "HABITAT",
      conservation: "CONSERVATION",
      viewAlbum: "VIEW ALBUM",
      finePrint:
        "*Conservation labels are illustrative. Verify local species and status before publication.",
      galleryEyebrow: "02 / FROM THE FIELD",
      galleryTitleA: "THE WORLD,",
      galleryTitleB: "AS I FIND IT.",
      searchPlaceholder: "Find a creature...",
      collection: "A SMALL COLLECTION /",
      empty:
        "No field notes found for “{query}”. Try another animal or habitat.",
      journalEyebrow: "03 / THE PHOTOGRAPHER’S JOURNAL",
      journalTitleA: "NOT  JUST  WHAT  I  SAW.",
      journalTitleB: "HOW  IT  MADE  ME  FEEL.",
      journalDescription:
        "A collection of quiet moments, unexpected encounters, and the lessons the natural world leaves behind.",
      footerLead: "A little closer to the living world.",
      footerBottom1: "© 2026 LIFER FIELD JOURNAL",
      footerBottom2: "MADE WITH CURIOSITY & CARE",
      footerBottom3: "TAKE ONLY PHOTOGRAPHS. LEAVE ONLY FOOTPRINTS.",
      languageLabel: "EN",
      languageToggle: "JP",
    },
    ja: {
      navDiscover: "発見",
      navAlbum: "アルバム",
      navAbout: "概要",
      brand: "野生動物ジャーナル",
      dailyEyebrow: "01 / 最高の瞬間",
      dailyTitleA: "今年の",
      dailyTitleB: "動物。",
      chip: "葉を透かす光",
      fieldGuide: "フィールドガイド",
      no: "No.",
      habitat: "生息地",
      conservation: "保全",
      viewAlbum: "アルバムを見る",
      finePrint:
        "*保全ラベルは参考用です。発行前に地域の種とステータスを確認してください。",
      galleryEyebrow: "02 / フィールドでの記録",
      galleryTitleA: "世界を、",
      galleryTitleB: "見つけたまま。",
      searchPlaceholder: "生き物を探す...",
      collection: "小さなコレクション /",
      empty:
        "“{query}”に一致する記録は見つかりませんでした。別の動物や生息地をお試しください。",
      journalEyebrow: "03 / 写真家の手記",
      journalTitleA: "見たものだけではなく、",
      journalTitleB: "それが心に残したもの。",
      journalDescription:
        "静かな瞬間、思いがけない出会い、そして自然が残してくれる教えの集まり。",
      footerLead: "もっと自然に近づくために。",
      footerBottom1: "© 2026 LIFER FIELD JOURNAL",
      footerBottom2: "好奇心と丁寧さから生まれた作品",
      footerBottom3: "写真だけを残し、足跡だけを置く。",
      languageLabel: "JP",
      languageToggle: "EN",
    },
  } as const;

  const text = strings[language];

  const filteredAnimals = animals.filter((animal) =>
    `${animal.name} ${animal.tag} ${animal.habitat}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const visibleAnimals = filteredAnimals;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
            className={`language-switch ${language === "ja" ? "is-vn" : ""}`}
            type="button"
            onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            aria-label="Toggle language"
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
            <button onClick={() => scrollTo("discover")}>
              {text.navDiscover}
            </button>
            <button onClick={() => scrollTo("gallery")}>{text.navAlbum}</button>
            <button onClick={() => scrollTo("about")}>{text.navAbout}</button>
          </nav>
        </div>
      </header>

      <section className="daily-section page-shell section-pad" id="discover">
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
            <img src={currentAnimal.image} alt={currentAnimal.name} />
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
                {text.no} 00{activeAnimal + 1}
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
                <strong>{currentAnimal.status}</strong>
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

      <section className="gallery-section page-shell section-pad" id="gallery">
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
          <div className="gallery-grid">
            {visibleAnimals.map((animal, index) => (
              <article className="gallery-card" key={animal.name}>
                <button
                  className="gallery-image-button"
                  onClick={() => {
                    setActiveAnimal(
                      animals.findIndex((a) => a.name === animal.name),
                    );
                    scrollTo("discover");
                  }}
                  aria-label={`Explore ${animal.name}`}
                >
                  <img src={animal.image} alt={animal.name} />
                  <span className="gallery-image-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </button>
                <div className="gallery-card-copy">
                  <div className="gallery-card-meta">
                    <span>{animal.tag.toUpperCase()}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{animal.name}</h3>
                  <p>{animal.habitat}</p>
                </div>
              </article>
            ))}
            {filteredAnimals.length === 0 && (
              <p className="empty-state">
                {text.empty.replace("{query}", query)}
              </p>
            )}
          </div>
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
