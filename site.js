document.documentElement.classList.remove("no-js");

const body = document.body;
const drawer = document.getElementById("site-drawer");
const drawerToggles = Array.from(document.querySelectorAll("[data-drawer-toggle]"));
const drawerClosers = Array.from(document.querySelectorAll("[data-drawer-close]"));
const currentPage = body.dataset.page;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageRevealSelector = [
  ".page-topbar",
  ".page-shell > .page-intro",
  ".home-shell > .home-stage-hero",
  ".about-hero > .photo-panel",
  ".about-hero > .about-intro",
  ".page-intro-grid > .page-intro",
  ".page-intro-grid > .intro-aside > .micro-card",
  ".section-stack > .section-heading",
  ".section-stack > .card-grid > *",
  ".page-shell > .belt-panel",
  ".page-shell > .contact-card-based",
  ".page-shell > .story-grid > *",
  ".page-shell > .card-grid > *",
  ".page-shell > .contact-grid > *",
  ".page-shell > .contact-feature",
  ".page-shell > .resume-card",
].join(", ");
const pageRevealTargets = Array.from(document.querySelectorAll(pageRevealSelector));
const scrollRevealTargets = Array.from(document.querySelectorAll("[data-scroll-reveal]"));
const homeHero = document.querySelector(".home-stage-hero");
const skillGroupCards = Array.from(document.querySelectorAll(".skills-page [data-skill-group]"));
const contactGroupItems = Array.from(document.querySelectorAll(".contact-page [data-contact-group]"));
const intro = document.querySelector("[data-intro]");
let introTimerId = null;
let revealTimerId = null;
let scrollRevealObserver = null;
let skillGroupObserver = null;
let contactGroupObserver = null;
let homeHeroMotionTicking = false;

pageRevealTargets.forEach((element, index) => {
  element.classList.add("page-reveal-target");
  element.style.setProperty("--reveal-index", String(Math.min(index, 12)));
});

scrollRevealTargets.forEach((element, index) => {
  element.classList.add("scroll-reveal-target");
  element.style.setProperty("--scroll-reveal-index", String(index % 6));
});

const skillPillOrigins = [
  [-18, 20],
  [18, 18],
  [-22, -10],
  [22, -14],
  [-10, 16],
  [12, -18],
  [-20, 8],
  [20, 8],
  [0, 18],
];

skillGroupCards.forEach((card, cardIndex) => {
  card.style.setProperty("--skill-group-index", String(cardIndex % 5));

  Array.from(card.querySelectorAll(".skill-pill")).forEach((pill, pillIndex) => {
    const [originX, originY] = skillPillOrigins[pillIndex % skillPillOrigins.length];

    pill.style.setProperty("--pill-index", String(pillIndex));
    pill.style.setProperty("--pill-origin-x", `${originX}px`);
    pill.style.setProperty("--pill-origin-y", `${originY}px`);
  });
});

const contactItemOrigins = [
  [-18, 18],
  [18, 18],
  [-14, 16],
  [14, 16],
];

contactGroupItems.forEach((item, itemIndex) => {
  const [originX, originY] = contactItemOrigins[itemIndex % contactItemOrigins.length];

  item.style.setProperty("--contact-index", String(itemIndex));
  item.style.setProperty("--contact-origin-x", `${originX}px`);
  item.style.setProperty("--contact-origin-y", `${originY}px`);
});

function schedulePageReveal({ restart = false, delay = 70 } = {}) {
  if (prefersReducedMotion) {
    body.classList.add("page-ready");
    return;
  }

  window.clearTimeout(revealTimerId);

  if (restart) {
    body.classList.remove("page-ready");
    void body.offsetWidth;
  }

  revealTimerId = window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      body.classList.add("page-ready");
    });
  }, delay);
}

function initializeScrollReveals() {
  if (!scrollRevealTargets.length) {
    return;
  }

  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    scrollRevealTargets.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  scrollRevealTargets.forEach((element) => {
    element.classList.remove("is-visible");
  });

  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        scrollRevealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  scrollRevealTargets.forEach((element) => {
    scrollRevealObserver.observe(element);
  });
}

function initializeSkillGroups() {
  if (!skillGroupCards.length) {
    return;
  }

  if (skillGroupObserver) {
    skillGroupObserver.disconnect();
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    body.classList.remove("skills-enhanced");
    skillGroupCards.forEach((card) => {
      card.classList.add("is-grouped");
    });
    return;
  }

  body.classList.add("skills-enhanced");
  skillGroupCards.forEach((card) => {
    card.classList.remove("is-grouped");
  });

  skillGroupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-grouped");
        skillGroupObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.32,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  skillGroupCards.forEach((card) => {
    skillGroupObserver.observe(card);
  });
}

function initializeContactGroups() {
  if (!contactGroupItems.length) {
    return;
  }

  if (contactGroupObserver) {
    contactGroupObserver.disconnect();
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    body.classList.remove("contact-enhanced");
    contactGroupItems.forEach((item) => {
      item.classList.add("is-grouped");
    });
    return;
  }

  body.classList.add("contact-enhanced");
  contactGroupItems.forEach((item) => {
    item.classList.remove("is-grouped");
  });

  contactGroupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-grouped");
        contactGroupObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  contactGroupItems.forEach((item) => {
    contactGroupObserver.observe(item);
  });
}

function updateHomeHeroMotion() {
  if (!homeHero || prefersReducedMotion) {
    return;
  }

  const rect = homeHero.getBoundingClientRect();
  const distance = Math.max(homeHero.offsetHeight - window.innerHeight * 0.48, 1);
  const progress = Math.min(Math.max(-rect.top / distance, 0), 1);

  homeHero.style.setProperty("--hero-progress", progress.toFixed(3));
}

function requestHomeHeroMotionUpdate() {
  if (homeHeroMotionTicking) {
    return;
  }

  homeHeroMotionTicking = true;
  window.requestAnimationFrame(() => {
    homeHeroMotionTicking = false;
    updateHomeHeroMotion();
  });
}

function setDrawerState(isOpen) {
  body.classList.toggle("drawer-open", isOpen);

  if (drawer) {
    drawer.setAttribute("aria-hidden", String(!isOpen));
  }

  drawerToggles.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

drawerToggles.forEach((button) => {
  button.addEventListener("click", () => {
    setDrawerState(true);
  });
});

drawerClosers.forEach((button) => {
  button.addEventListener("click", () => {
    setDrawerState(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawerState(false);
  }
});

document.querySelectorAll("[data-nav]").forEach((link) => {
  const isActive = link.dataset.nav === currentPage;

  if (isActive) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

window.addEventListener("pageshow", (event) => {
  initializeScrollReveals();
  initializeSkillGroups();
  initializeContactGroups();
  requestHomeHeroMotionUpdate();

  if (intro) {
    const introSeen = sessionStorage.getItem("alice-site-intro-seen-v2") === "true";

    if (prefersReducedMotion || introSeen) {
      window.clearTimeout(introTimerId);
      intro.classList.add("is-finished");
      body.classList.add("intro-complete");
      schedulePageReveal({ restart: event.persisted });
      return;
    }

    window.clearTimeout(introTimerId);
    body.classList.remove("page-ready");
    intro.classList.remove("is-finished");
    body.classList.remove("intro-complete");
    introTimerId = window.setTimeout(() => {
      intro.classList.add("is-finished");
      body.classList.add("intro-complete");
      sessionStorage.setItem("alice-site-intro-seen-v2", "true");
      schedulePageReveal();
    }, 3400);
  } else {
    schedulePageReveal({ restart: event.persisted });
  }
});

window.addEventListener("pagehide", () => {
  window.clearTimeout(introTimerId);
  window.clearTimeout(revealTimerId);

  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
  }

  if (skillGroupObserver) {
    skillGroupObserver.disconnect();
  }

  if (contactGroupObserver) {
    contactGroupObserver.disconnect();
  }
});

if (intro && prefersReducedMotion) {
    intro.classList.add("is-finished");
    body.classList.add("intro-complete");
}

if (homeHero && !prefersReducedMotion) {
  window.addEventListener("scroll", requestHomeHeroMotionUpdate, { passive: true });
  window.addEventListener("resize", requestHomeHeroMotionUpdate);
}
