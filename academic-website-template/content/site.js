/*
 * Edit this file first. The pages intentionally contain only structure;
 * identity, navigation and example content live here so a fork stays easy to
 * personalize without hunting through seven HTML files.
 */
window.siteConfig = {
  identity: {
    name: "Your Name",
    shortName: "Your Name",
    role: "Researcher · Builder · Writer",
    affiliation: "Independent research studio",
    location: "City, Country",
    tagline: "Turning questions into useful, shareable work.",
    avatar: "images/avatar.jpg",
    avatarHover: "images/self2.jpg",
  },
  navigation: [
    { label: "HOME", href: "index.html", key: "home" },
    { label: "PROJECTS", href: "projects.html", key: "projects" },
    { label: "WORK", href: "work.html", key: "work" },
    { label: "RESEARCH", href: "research.html", key: "research" },
    { label: "BIO", href: "bio.html", key: "bio" },
    { label: "CV", href: "cv.html", key: "cv" },
    { label: "OTHER", href: "other.html", key: "other" },
  ],
  links: {
    cv: "files/cv.pdf",
    email: "mailto:you@example.com",
    github: "#",
    scholar: "#",
  },
  copy: {
    home: {
      core: ["Research and prototyping", "Human-centered technology", "Clear technical communication"],
      background: ["AI and digital culture", "Evidence-led product work", "Research-to-practice translation"],
    },
    bio: {
      intro: "I work across research, design and implementation to make complex ideas easier to test, explain and use.",
      education: ["Graduate study in a technology-related field", "Undergraduate study in the humanities or sciences", "Ongoing independent learning"],
      focus: ["Responsible AI and human-computer interaction", "Tools that support inquiry and creative practice", "Accessible ways to share research"],
    },
    research: [
      {
        title: "Evidence-aware knowledge systems",
        subtitle: "Making fragmented information easier to connect and inspect",
        meta: "Independent study · 2024—present",
        problem: "How can a research tool show where an answer comes from while still helping people explore unfamiliar ideas?",
        approach: ["Model sources, claims and uncertainty as first-class objects", "Use small, inspectable transformations instead of opaque magic", "Design explanations for both specialists and curious readers"],
        status: "Ongoing",
      },
      {
        title: "Careful interfaces for everyday AI",
        subtitle: "Designing support that respects context, agency and attention",
        meta: "Prototype series · 2023—present",
        problem: "What should an AI interface do when the most helpful action is to slow down, ask or hand control back?",
        approach: ["Prefer progressive disclosure over noisy dashboards", "Treat consent and reversibility as interaction primitives", "Evaluate trust through observable behavior, not slogans"],
        status: "Exploratory",
      },
    ],
    projects: [
      { title: "Field Notes", type: "Research notebook", description: "A small static tool for collecting observations, links and next questions.", tags: ["HTML", "CSS", "Vanilla JS"], image: "images/metapher/1.jpg", href: "#" },
      { title: "Signal Garden", type: "Data story", description: "A visual essay that turns a messy dataset into a sequence of understandable decisions.", tags: ["Data", "Storytelling"], image: "images/hipgo/1.jpg", href: "#" },
      { title: "Open Briefs", type: "Writing system", description: "Reusable templates for turning research findings into concise public-facing briefs.", tags: ["Docs", "Open source"], image: "images/projects/ddh-mini-program.png", href: "#" },
    ],
    work: [
      { title: "Product discovery", period: "2021—present", detail: "Translate field observations into prototypes, specs and evaluation plans." },
      { title: "Research communication", period: "2018—present", detail: "Shape technical ideas into talks, articles and teaching materials." },
      { title: "Community practice", period: "Ongoing", detail: "Make room for peer learning through workshops, notes and open resources." },
    ],
    other: {
      cards: [
        { title: "Making in public", subtitle: "Small experiments, shared early", icon: "✳", detail: "A rotating selection of prototypes and visual notes. Swap the images in images/adventurex/ to make this section yours.", images: ["images/adventurex/1.jpg", "images/adventurex/2.jpg", "images/adventurex/3.png", "images/adventurex/4.jpg"] },
        { title: "Workshops and talks", subtitle: "Learning with other people", icon: "◌", detail: "Use this space for events, teaching, volunteering or any context that does not fit a résumé.", images: ["images/sparklab/1.jpg", "images/sparklab/2.jpg"] },
      ],
    },
  },
};
