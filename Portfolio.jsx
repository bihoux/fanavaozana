import { useState, useEffect, useRef } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap";

  // Image paths (served from /public/images/)
const IMG = {
  logo:      "/images/logo.webp",
  heroPhoto: "/images/moi-tech.webp",
  teaching:  "/images/moi-teaching.webp",
  favicon:  "/images/favicon.webp",
  logos: {
    city:  "/images/logos/logo-city.webp",
    edmi:  "/images/logos/logo-edmi.webp",
    eni:   "/images/logos/logo-eni.webp",
    ens:   "/images/logos/logo-ens.webp",
    glore: "/images/logos/logo-glore.webp",
    limad: "/images/logos/logo-limad.webp",
    uf:    "/images/logos/logo-uf.webp",
  },
  certs: {
    pix:        "/images/certs/cert-pix.webp",
    colloque:   "/images/certs/cert-colloque.webp",
    comOrale:   "/images/certs/cert-com-orale.webp",
    auf:        "/images/certs/cert-auf.webp",
    js:         "/images/certs/cert-js.webp",
    leadership: "/images/certs/cert-leadership.webp",
    temps:      "/images/certs/cert-temps.webp",
    carte:      "/images/certs/cert-carte.webp",
  },
};

// SVG icons as strings for JSX rendering
const IconEmail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconWhatsApp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.86L.057 23.492a.75.75 0 0 0 .921.921l5.635-1.476A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.952-1.355l-.355-.211-3.684.966.984-3.595-.232-.371A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>;
const IconGitHub = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const IconLinkedIn = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const IconLocation = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconExternal = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconClose = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconChevL = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconChevR = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

// ─── BILINGUAL CONTENT ──────────────────────────────────────────────────────
const C = {
  fr: {
    nav: ["À propos","Compétences","Projets","Expérience","Enseignement","Formation","Publications","Certifications","Contact"],
    navIds: ["about","skills","projects","experience","teaching","education","publications","certifications","contact"],
    hero: { tag:"// ingénieur IA · doctorant · enseignant · full stack", greeting:"Bonjour, je suis", name:"Miandrisoa Hoby", sur:"RANDRIATSARAFARA", title:"Ingénieur IA & Doctorant en Informatique", sub:"Spécialisé en vision par ordinateur, je transforme des problèmes complexes en solutions intelligentes — alliant recherche avancée, enseignement universitaire et ingénierie logicielle.", cta1:"Voir mes projets", cta2:"Me contacter", location:"Fianarantsoa / Antananarivo", brand:"CapriAI · Bi'hOuX" },
    about: { title:"À propos", text:"Doctorant à l'École Doctorale de Modélisation Informatique (EDMI) de l'Université de Fianarantsoa. Ingénieur en informatique spécialisé en traitement d'images et vision par ordinateur. Enseignant universitaire et développeur full stack, principalement en Java, tout en restant ouvert à d'autres langages et technologies.", recent:"Parcours & activités récentes", items:["Doctorant — EDMI, Université de Fianarantsoa","Master 2 Recherche (ENI) — 2024","Licence professionnelle (ENI) — 2021","Stage majeur : Reconnaissance en temps réel des billets malagasy (GloreIA-LIMAD)"], stats:[{v:"5+",l:"Ans d'expérience"},{v:"3",l:"Langues parlées"},{v:"15+",l:"Technologies"},{v:"2027",l:"Fin de thèse"}], langs:["🇲🇬 Malgache","🇫🇷 Français","🇺🇸 Anglais"], interests:["Voyages","Taekwondo","Basketball","Natation","Lecture","Échecs","Jeux vidéo"], langLabel:"Langues", interestsLabel:"Centres d'intérêt", inActionLabel:"En action" },
    skills: { title:"Compétences", sub:"Compétences techniques et outils fréquemment utilisés", progLang:"Langages de programmation" },
    projects: { title:"Projets & Réalisations", sub:"Sélection de projets académiques, de recherche et professionnels" },
    exp: { title:"Expériences professionnelles" },
    teaching: { title:"Enseignements universitaires", sub:"Activités d'enseignement en tant que doctorant-enseignant et vacataire" },
    edu: { title:"Formations & Diplômes" },
    pub: { title:"Publications", type:"Article scientifique", status:"Manuscrit / version soumise", coAuthors:"Co-auteurs" },
    certs: { title:"Attestations & Certifications", sub:"Documents officiels — cliquez sur une carte pour voir le certificat en grand", viewCert:"Voir le certificat", prev:"Précédent", next:"Suivant" },
    contact: { title:"Contact", sub:"Contactez-moi pour toute information — réponse sous 48 h. Envoi possible aussi via WhatsApp.", name:"Nom", email:"Email", subject:"Sujet", message:"Message", send:"Envoyer", whatsapp:"WhatsApp" },
    footer:"Disponible pour nouvelles collaborations",
    verify:"Vérifier l'authenticité",
  },
  en: {
    nav: ["About","Skills","Projects","Experience","Teaching","Education","Publications","Certifications","Contact"],
    navIds: ["about","skills","projects","experience","teaching","education","publications","certifications","contact"],
    hero: { tag:"// AI engineer · PhD candidate · lecturer · full-stack dev", greeting:"Hello, I'm", name:"Miandrisoa Hoby", sur:"RANDRIATSARAFARA", title:"AI Engineer & PhD Researcher in CS", sub:"Specializing in computer vision, I transform complex problems into intelligent solutions — combining advanced research, university teaching, and software engineering.", cta1:"View my projects", cta2:"Contact me", location:"Fianarantsoa / Antananarivo", brand:"CapriAI · Bi'hOuX" },
    about: { title:"About", text:"PhD candidate at the Doctoral School of Computer Modeling (EDMI), University of Fianarantsoa. Computer science engineer specializing in image processing and computer vision. University lecturer and full-stack developer, primarily in Java, open to other languages and technologies.", recent:"Background & recent activities", items:["PhD candidate — EDMI, University of Fianarantsoa","Master 2 Research (ENI) — 2024","Professional Bachelor's (ENI) — 2021","Major internship: Real-time recognition of Malagasy banknotes (GloreIA-LIMAD)"], stats:[{v:"5+",l:"Years of experience"},{v:"3",l:"Languages spoken"},{v:"15+",l:"Technologies"},{v:"2027",l:"PhD completion"}], langs: ["🇲🇬 Malagasy", "🇫🇷 French", "🇺🇸 English"], interests:["Travel","Taekwondo","Basketball","Swimming","Reading","Chess","Video games"], langLabel:"Languages", interestsLabel:"Interests", inActionLabel:"In action" },
    skills: { title:"Skills", sub:"Technical skills and tools frequently used", progLang:"Programming languages" },
    projects: { title:"Projects & Achievements", sub:"Selection of academic, research, and professional projects" },
    exp: { title:"Professional Experience" },
    teaching: { title:"University Teaching", sub:"Teaching activities as PhD lecturer and visiting lecturer" },
    edu: { title:"Education & Degrees" },
    pub: { title:"Publications", type:"Scientific article", status:"Manuscript / submitted version", coAuthors:"Co-authors" },
    certs: { title:"Certifications & Attestations", sub:"Official documents — click a card to view the full certificate", viewCert:"View certificate", prev:"Previous", next:"Next" },
    contact: { title:"Contact", sub:"Contact me for any information — reply within 48 h. Also reachable via WhatsApp.", name:"Name", email:"Email", subject:"Subject", message:"Message", send:"Send", whatsapp:"WhatsApp" },
    footer:"Open to new collaborations",
    verify:"Verify authenticity",
  },
};

const SKILL_GROUPS = [
  { label:{fr:"IA / Vision par Ordinateur",en:"AI / Computer Vision"}, color:"#00C8FF", items:[{n:"YOLOv8 / Vision par ordinateur",p:90},{n:"Python",p:80},{n:"PyTorch / TensorFlow",p:72},{n:"OpenCV / Mobile AI",p:75}] },
  { label:{fr:"Backend & API",en:"Backend & API"}, color:"#8B5CF6", items:[{n:"Java / Spring Boot",p:87},{n:"Django",p:72},{n:"Laravel / PHP",p:68},{n:"JEE / Hibernate",p:70}] },
  { label:{fr:"Frontend & Web",en:"Frontend & Web"}, color:"#10B981", items:[{n:"React.js",p:75},{n:"JavaScript / HTML / CSS",p:65},{n:"Vue.js / Node.js",p:60},{n:"Figma / Canva",p:70}] },
  { label:{fr:"Bases de données",en:"Databases"}, color:"#F59E0B", items:[{n:"MySQL / PostgreSQL",p:85},{n:"SQL Server / MongoDB",p:78},{n:"Data Warehouse / Jitterbit",p:68},{n:"Power BI",p:70}] },
  { label:{fr:"DevOps & Systèmes",en:"DevOps & Systems"}, color:"#EF4444", items:[{n:"Git / GitHub / GitLab",p:80},{n:"Docker / Kubernetes",p:60},{n:"CI/CD",p:58},{n:"Linux / Windows",p:75}] },
  { label:{fr:"SEO & Méthodes",en:"SEO & Methods"}, color:"#06B6D4", items:[{n:"SEO & Rédaction scientifique",p:83},{n:"Big Data / BI",p:70},{n:"Agile / SCRUM / UML",p:78},{n:"SOLID / Clean Code",p:80}] },
];
const PROG_LANGS = ["Python","Java","C / C++","JavaScript","PHP","HTML / CSS","JSP","VB.NET","C#","R","Assembleur"];

const PROJECTS = [
  { title:{fr:"Reconnaissance en temps réel des billets malagasy",en:"Real-time Recognition of Malagasy Banknotes"}, type:{fr:"Recherche / Thèse",en:"Research / PhD"}, color:"#00C8FF", icon:"🔬", desc:{fr:"Détection et classification en temps réel sur mobile avec YOLOv8 — collecte, entraînement et déploiement Android.",en:"Real-time detection and classification on mobile using YOLOv8 — data collection, training, and Android deployment."}, tags:["Python","YOLOv8","OpenCV","C++","Java","Android Studio"] },
  { title:{fr:"Plateforme nationale PNCTDC",en:"PNCTDC National Platform"}, type:{fr:"Projet gouvernemental",en:"Government project"}, color:"#8B5CF6", icon:"🏛️", desc:{fr:"Collecte, validation et analyse de données citoyennes — React.js, Spring Boot, Keycloak, PostgreSQL.",en:"Citizen data collection, validation and analysis — React.js, Spring Boot, Keycloak, PostgreSQL."}, tags:["React.js","Spring Boot","Keycloak","PostgreSQL","Git"] },
  { title:{fr:"Data Warehouse & Business Intelligence",en:"Data Warehouse & Business Intelligence"}, type:{fr:"Projet scolaire",en:"Academic"}, color:"#10B981", icon:"📊", desc:{fr:"Intégration Jitterbit, modélisation et tableaux de bord Power BI.",en:"Jitterbit data integration, modeling and Power BI dashboards."}, tags:["Jitterbit","Power BI","Data Warehouse","BI"] },
  { title:{fr:"Applications de gestion Java SE",en:"Java SE Management Apps"}, type:{fr:"Stage / Pratique",en:"Internship"}, color:"#F59E0B", icon:"💼", desc:{fr:"Conception et déploiement d'applications de gestion de stock avec Java Swing, JavaFX et MySQL.",en:"Design and deployment of stock management apps using Java Swing, JavaFX and MySQL."}, tags:["Java Swing","JavaFX","MySQL","NetBeans","Launch4j"] },
  { title:{fr:"Projets Web & Divers",en:"Web & Miscellaneous Projects"}, type:{fr:"Académique",en:"Academic"}, color:"#EF4444", icon:"🌐", desc:{fr:"Projets Java (Socket, JEE, Hibernate), Vue.js, Node.js, Django, PHP, C#, VB.NET et R.",en:"Java (Socket, JEE, Hibernate), Vue.js, Node.js, Django, PHP, C#, VB.NET and R projects."}, tags:["Vue.js","Node.js","Django","JEE","Hibernate","C#","R"] },
];

const EXPERIENCES = [
  { title:{fr:"Développeur Full Stack",en:"Full Stack Developer"}, company:"PNCTDC — Projet Gouvernemental", location:"Antananarivo, Madagascar", period:{fr:"Depuis avril 2026",en:"Since April 2026"}, color:"#00C8FF",
    desc:{fr:["Front-end React.js — interfaces, formulaires dynamiques, tableaux de bord","Back-end Spring Boot — API REST, workflows de validation multi-niveaux","Keycloak — authentification SSO et gestion des rôles","Base de données PostgreSQL — modélisation et gestion","Collecte multi-source : formulaires, PDF, audio","Architecture scalable, sécurisée et modulaire — Git"],en:["Frontend React.js — UI, dynamic forms, dashboards","Backend Spring Boot — REST API, multi-level validation workflows","Keycloak integration for SSO authentication and role management","Database modeling and management with PostgreSQL","Multi-source data collection: forms, PDF, audio","Scalable, secure, modular architecture — Git"]},
    tags:["React.js","Spring Boot","Keycloak","PostgreSQL","Git"] },
  { title:{fr:"Chercheur / Auteur",en:"Researcher / Author"}, company:"EDMI / LIMAD / GloreIA", location:"Fianarantsoa, Madagascar", period:{fr:"Depuis 2024",en:"Since 2024"}, color:"#8B5CF6", logos:["edmi","glore","limad"],
    desc:{fr:["Article scientifique : reconnaissance en temps réel des billets malgaches (Ariary)","YOLOv8, Python, Vision par ordinateur, Mobile AI (Java, C++)","Collecte de données, entraînement, déploiement Android"],en:["Scientific article on real-time recognition of Malagasy banknotes (Ariary)","YOLOv8, Python, Computer Vision, Mobile AI (Java, C++)","Data collection, model training, Android deployment"]},
    tags:["YOLOv8","Python","Computer Vision","Android"] },
  { title:{fr:"Développeur Full Stack",en:"Full Stack Developer"}, company:"FIFAMANOR", location:"Antsirabe, Madagascar", period:{fr:"Mars – Mai 2021",en:"March – May 2021"}, color:"#10B981",
    desc:{fr:["Conception et déploiement d'une application de gestion des stocks","Outils : Java Swing, NetBeans, MySQL, Launch4j, InnoSetup"],en:["Design and deployment of a stock management application","Tools: Java Swing, NetBeans, MySQL, Launch4j, InnoSetup"]},
    tags:["Java Swing","MySQL","NetBeans"] },
  { title:{fr:"Stagiaire Développeur",en:"Developer Intern"}, company:"Compagnie d'assurance ARO", location:"Fianarantsoa, Madagascar", period:{fr:"Novembre 2019 – Février 2020",en:"November 2019 – February 2020"}, color:"#F59E0B",
    desc:{fr:["Conception d'une application de gestion des assurances automobiles","Outils : Visual Basic.NET, Visual Studio, SQL Server"],en:["Design of a car insurance management application","Tools: Visual Basic.NET, Visual Studio, SQL Server"]},
    tags:["VB.NET","SQL Server","Visual Studio"] },
];

const TEACHING = [
  { school:"City University Antananarivo", logo:"city", period:{fr:"Décembre 2025 – Présent",en:"December 2025 – Present"}, role:{fr:"Enseignant vacataire — Informatique",en:"Visiting Lecturer — Computer Science"}, color:"#00C8FF",
    courses:[
      { name:{fr:"Développement web avancé avec Java",en:"Advanced Web Development with Java"}, detail:{fr:"Architecture REST, DTO, séparation des couches (Controller/Service/Repository), sécurisation avancée, design patterns (MVC, DAO, Factory, Singleton), principes SOLID.",en:"REST architecture, DTOs, layer separation (Controller/Service/Repository), advanced security, design patterns (MVC, DAO, Factory, Singleton), SOLID principles."} },
      { name:{fr:"Programmer en Java",en:"Programming in Java"}, detail:{fr:"POO : types primitifs, structures de contrôle, tableaux, classes, encapsulation, héritage, polymorphisme, interfaces, exceptions, collections, I/O.",en:"OOP: primitive types, control structures, arrays, classes, encapsulation, inheritance, polymorphism, interfaces, exceptions, collections, I/O."} },
      { name:{fr:"Programmer en C++",en:"Programming in C++"}, detail:{fr:"OOP avancé : constructeurs, destructeurs, héritage, polymorphisme, surcharge d'opérateurs, templates, gestion mémoire, STL, exceptions.",en:"Advanced OOP: constructors, destructors, inheritance, polymorphism, operator overloading, templates, memory management, STL, exceptions."} },
      { name:{fr:"Computer Vision",en:"Computer Vision"}, detail:{fr:"Traitement d'images, détection d'objets, CNN, applications OpenCV et PyTorch/TensorFlow.",en:"Image processing, object detection, CNNs, practical applications with OpenCV and PyTorch/TensorFlow."} },
    ] },
  { school:"École Nationale d'Informatique (ENI)", logo:"eni", period:{fr:"Juin 2025 – Présent",en:"June 2025 – Present"}, role:{fr:"Assistant de recherche et d'enseignement",en:"Research & Teaching Assistant"}, color:"#8B5CF6",
    courses:[
      { name:{fr:"Principes de base du SEO",en:"SEO Fundamentals"}, detail:{fr:"Élaboration du programme, animation des séances, supports pédagogiques et évaluations.",en:"Curriculum development, session delivery, educational materials and evaluations."} },
      { name:{fr:"Rédaction et optimisation SEO avancée",en:"Advanced SEO Writing & Optimization"}, detail:{fr:"Cours magistraux, examens, correction des copies, suivi individuel des étudiants.",en:"Lectures, exams, grading, and individual student follow-up."} },
    ] },
  { school:"École Normale Supérieure (ENS) — UF", logo:"ens", period:{fr:"2025",en:"2025"}, role:{fr:"Appui à l'équipe pédagogique",en:"Support to Teaching Team"}, color:"#10B981",
    courses:[
      { name:{fr:"Évaluation — Bases de Données (BDD)",en:"Assessment — Databases"}, detail:{fr:"Préparation et supervision d'examen, correction, analyse statistique des résultats, recommandations pédagogiques.",en:"Exam preparation and supervision, grading, statistical analysis, pedagogical recommendations."} },
    ] },
];

const EDUCATION = [
  { degree:{fr:"Doctorat en Informatique (en cours)",en:"PhD in Computer Science (ongoing)"}, school:"EDMI — Université de Fianarantsoa", location:"Fianarantsoa, Madagascar", period:"2024 – 2027", color:"#00C8FF", icon:"🎓", logo:"edmi" },
  { degree:{fr:"Master 2 Recherche en Informatique",en:"Master 2 Research in Computer Science"}, school:"École Nationale d'Informatique (ENI)", location:"Fianarantsoa, Madagascar", period:"2022 – 2024", color:"#8B5CF6", icon:"🏛️", logo:"eni" },
  { degree:{fr:"Licence Professionnelle en Informatique",en:"Professional Bachelor's in CS"}, school:"École Nationale d'Informatique (ENI)", location:"Fianarantsoa, Madagascar", period:"2017 – 2021", color:"#10B981", icon:"📚", logo:"eni" },
  { degree:{fr:"Baccalauréat Série D",en:"High School Diploma — Series D"}, school:"Candidat libre", location:"Fianarantsoa, Madagascar", period:"2017", color:"#F59E0B", icon:"📜" },
  { degree:{fr:"Baccalauréat Série C",en:"High School Diploma — Series C"}, school:"Lycée Raherivelo Ramamonjy", location:"Fianarantsoa, Madagascar", period:"2016", color:"#EF4444", icon:"📜" },
];

const PUBLICATIONS = [
  { title:"Reconnaissance en temps réel des billets malagasy (Ariary)", authors:"M. H. Randriatsarafara, V. M. Ratianantitra, T. Mahatody", year:"2025", color:"#00C8FF", tags:["YOLOv8","Computer Vision","Mobile AI","Python","Android"] },
];

const CERTS = [
  { key:"pix",        title:"Certification Pix — Niveau Indépendant 2",                       org:"AUF DR Afrique Australe et Océan Indien — CEF Fianarantsoa",    date:{fr:"14 Novembre 2025",en:"November 14, 2025"},    color:"#7C3AED", icon:"🏆", link:"https://app.pix.fr/verification-certificat", code:"P-TK343K3J" },
  { key:"colloque",   title:{fr:"Colloque international — Enseignement Supérieur et IA",en:"International Colloquium — Higher Education & AI"},                    org:"MESUPRES — Université de Fianarantsoa",             date:{fr:"2025",en:"2025"},                             color:"#1D4ED8", icon:"🌐" },
  { key:"comOrale",   title:{fr:"Communication Orale — Journées de la Recherche",en:"Oral Communication — Research Days"},                                        org:"MESUPRES — Universités d'Antananarivo & Fianarantsoa", date:{fr:"2024",en:"2024"},                           color:"#DC2626", icon:"🎤" },
  { key:"auf",        title:{fr:'Atelier — "Produire, diffuser et valoriser ses travaux de recherche"',en:'Workshop — "Produce, Disseminate & Promote Research Work"'}, org:"Agence Universitaire de la Francophonie (AUF) — CNF Antananarivo", date:{fr:"23 Juin 2023",en:"June 23, 2023"},  color:"#0369A1", icon:"📖" },
  { key:"js",         title:{fr:"Passez au niveau supérieur avec JavaScript",en:"Level Up with JavaScript"},                                                       org:"Orange Digital Center Madagascar",                  date:{fr:"23–26 Sept. 2025",en:"Sept. 23–26, 2025"},   color:"#D97706", icon:"⚡" },
  { key:"leadership", title:{fr:"Développez votre leadership : orienté actions et résultats",en:"Develop Your Leadership: Action & Results-Oriented"},             org:"Orange Digital Center Madagascar",                  date:{fr:"9–11 Sept. 2025",en:"Sept. 9–11, 2025"},     color:"#EA580C", icon:"🚀" },
  { key:"temps",      title:{fr:"Gérez efficacement votre temps",en:"Effective Time Management"},                                                                 org:"Orange Digital Center Madagascar",                  date:{fr:"28–30 Oct. 2025",en:"Oct. 28–30, 2025"},     color:"#059669", icon:"⏱️" },
  { key:"carte",      title:{fr:"Hack ta première carte électronique",en:"Hack Your First Electronic Board"},                                                     org:"Orange Digital Center Madagascar",                  date:{fr:"15–19 Sept. 2025",en:"Sept. 15–19, 2025"},   color:"#7C3AED", icon:"🔌" },
];

// ─── UTILS ──────────────────────────────────────────────────────────────────
function useVisible(threshold=0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}
const tr = (obj, lang) => (!obj || typeof obj === "string" || typeof obj === "number") ? obj : (obj[lang] ?? obj.fr ?? obj.en ?? "");

function Badge({ text, color }) {
  return <span style={{ border:`1px solid ${color}40`, color, background:`${color}12`, padding:"3px 10px", borderRadius:999, fontSize:"0.7rem", fontFamily:"'JetBrains Mono',monospace", fontWeight:500, display:"inline-block", lineHeight:1.6 }}>{text}</span>;
}

function SectionTitle({ title, sub, centered }) {
  return (
    <div style={{ marginBottom:"0.5rem", textAlign:centered?"center":"left" }}>
      <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.5rem,3vw,2.3rem)", lineHeight:1.1, letterSpacing:"-0.02em" }}>{title}</h2>
      <div style={{ marginTop:"0.7rem", height:3, borderRadius:999, background:"linear-gradient(90deg,#00C8FF,#8B5CF6)", width:centered?80:52, marginLeft:centered?"auto":0, marginRight:centered?"auto":0 }} />
      {sub ? <p style={{ marginTop:"0.75rem", color:"var(--muted)", fontSize:"0.88rem", marginBottom:"2rem" }}>{sub}</p> : <div style={{ marginBottom:"2.5rem" }} />}
    </div>
  );
}

function Reveal({ children, delay=0, style={} }) {
  const [ref,v] = useVisible();
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(28px)", transition:`opacity 0.6s ease ${delay}ms,transform 0.6s ease ${delay}ms`, ...style }}>{children}</div>;
}

function InstitutionLogo({ logoKey, size=32, style={} }) {
  if (!IMG.logos[logoKey]) return null;
  return <img src={IMG.logos[logoKey]} alt={logoKey} loading="lazy" style={{ height:size, width:"auto", maxWidth:size*2.5, objectFit:"contain", display:"block", ...style }} />;
}

// ─── LIGHTBOX ───────────────────────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext, lang }) {
  const cert = CERTS[index];
  const lc = C[lang].certs;
  useEffect(() => {
    const fn = (e) => { if(e.key==="Escape") onClose(); if(e.key==="ArrowLeft") onPrev(); if(e.key==="ArrowRight") onNext(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.9)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative", maxWidth:880, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", width:"100%", gap:"1rem" }}>
          <div>
            <div style={{ fontSize:"0.71rem", color:cert.color, fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.3rem" }}>{cert.icon} {index+1} / {CERTS.length}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#fff", lineHeight:1.4 }}>{tr(cert.title,lang)}</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.77rem", marginTop:"0.2rem" }}>{cert.org}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, padding:"8px", cursor:"pointer", color:"#fff", display:"flex", flexShrink:0 }}><IconClose /></button>
        </div>
        <div style={{ width:"100%", borderRadius:16, overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.7)" }}>
          <img src={IMG.certs[cert.key]} alt={tr(cert.title,lang)} style={{ width:"100%", height:"auto", maxHeight:"68vh", objectFit:"contain", display:"block", background:"#fff" }} />
        </div>
        <div style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
          <NavBtn onClick={onPrev}><IconChevL /> {lc.prev}</NavBtn>
          <div style={{ display:"flex", gap:"6px" }}>
            {CERTS.map((_,i) => <div key={i} style={{ width:i===index?20:7, height:7, borderRadius:999, background:i===index?cert.color:"rgba(255,255,255,0.3)", transition:"all 0.3s" }} />)}
          </div>
          <NavBtn onClick={onNext}>{lc.next} <IconChevR /></NavBtn>
        </div>
        {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", color:cert.color, fontSize:"0.79rem", fontWeight:600, textDecoration:"none" }}><IconExternal /> {C[lang].verify} · ID: {cert.code}</a>}
      </div>
    </div>
  );
}

function NavBtn({ children, onClick }) {
  const [h,setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:h?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, padding:"10px 16px", cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.82rem", transition:"background 0.2s" }}>{children}</button>;
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, lang, setLang }) {
  const [sc,setSc] = useState(false);
  const [menu,setMenu] = useState(false);
  const c = C[lang];
  useEffect(()=>{ const fn=()=>setSc(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const go=(id)=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenu(false); };
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:sc?(dark?"rgba(5,11,24,0.94)":"rgba(240,244,255,0.94)"):"transparent", backdropFilter:sc?"blur(20px)":"none", borderBottom:sc?"1px solid var(--brd)":"1px solid transparent", transition:"all 0.3s", padding:"0 clamp(1rem,4vw,2.5rem)", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{ background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0 }}>
          <img src={IMG.logo} alt="CapriAI Bi'hOuX" style={{ height:36, width:"auto", objectFit:"contain", borderRadius:6, transition:"opacity 0.2s" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"} />
        </button>
        <div style={{ display:"flex", gap:"0.85rem", alignItems:"center", flex:1, justifyContent:"center" }} className="desk-nav">
          {c.nav.map((label,i)=>(
            <button key={i} onClick={()=>go(c.navIds[i])} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"var(--muted)", padding:"4px 2px", transition:"color 0.2s", whiteSpace:"nowrap" }} onMouseEnter={e=>e.target.style.color="var(--accent)"} onMouseLeave={e=>e.target.style.color="var(--muted)"}>{label}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"0.4rem", alignItems:"center", flexShrink:0 }}>
          {[{l:lang==="fr"?"EN":"FR",fn:()=>setLang(l=>l==="fr"?"en":"fr")},{l:dark?"☀️":"🌙",fn:()=>setDark(d=>!d)}].map((btn,i)=>(
            <button key={i} onClick={btn.fn} style={{ background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:8, padding:"5px 11px", cursor:"pointer", color:"var(--txt)", fontSize:"0.76rem", fontFamily:"'JetBrains Mono',monospace", transition:"background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="var(--surface2)"} onMouseLeave={e=>e.currentTarget.style.background="var(--surface)"}>{btn.l}</button>
          ))}
          <button className="burger" onClick={()=>setMenu(m=>!m)} style={{ display:"none", background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:8, padding:"6px 10px", cursor:"pointer", color:"var(--txt)", fontSize:"1rem" }}>{menu?"✕":"☰"}</button>
        </div>
      </nav>
      {menu && (
        <div style={{ position:"fixed", top:64, left:0, right:0, zIndex:199, background:dark?"rgba(5,11,24,0.97)":"rgba(240,244,255,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--brd)", padding:"1rem 2rem 1.5rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {c.nav.map((label,i)=><button key={i} onClick={()=>go(c.navIds[i])} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--txt)", fontSize:"0.95rem", textAlign:"left", padding:"0.5rem 0", fontFamily:"'DM Sans',sans-serif", borderBottom:"1px solid var(--brd)" }}>{label}</button>)}
        </div>
      )}
    </>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero({ lang }) {
  const h = C[lang].hero;
  const [in_, setIn] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setIn(true),100); return()=>clearTimeout(t); },[]);
  const a=(d)=>({ opacity:in_?1:0, transform:in_?"translateY(0)":"translateY(22px)", transition:`all 0.7s ease ${d}ms` });

  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"80px clamp(1rem,5vw,4rem) 5rem" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
      <div style={{ position:"absolute", top:"8%", left:"-5%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,200,255,0.10) 0%,transparent 70%)", filter:"blur(70px)", pointerEvents:"none", animation:"b1 9s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"0%", right:"-5%", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 70%)", filter:"blur(90px)", pointerEvents:"none", animation:"b2 11s ease-in-out infinite" }} />
      <div style={{ maxWidth:1160, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 400px", gap:"4rem", alignItems:"center", position:"relative", zIndex:1 }} className="hero-grid">
        <div>
          <div style={{ ...a(80), fontFamily:"'JetBrains Mono',monospace", color:"var(--accent)", fontSize:"0.8rem", marginBottom:"1.6rem", animation:"pulse 3s ease-in-out infinite" }}>{h.tag}</div>
          <h1 style={{ ...a(180), fontFamily:"'Syne',sans-serif", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:"1rem" }}>
            <div style={{ fontSize:"clamp(0.85rem,1.8vw,1.2rem)", color:"var(--muted)", fontWeight:400, marginBottom:"0.4rem" }}>{h.greeting}</div>
            <span style={{ fontSize:"clamp(2.4rem,5vw,4.6rem)", background:"linear-gradient(135deg,#00C8FF 0%,#8B5CF6 45%,#10B981 100%)", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gs 5s linear infinite", display:"block" }}>{h.name}</span>
            <span style={{ fontSize:"clamp(1.1rem,2.5vw,2.1rem)", display:"block", color:"var(--txt)", letterSpacing:"0.06em", marginTop:"0.15rem" }}>{h.sur}</span>
          </h1>
          <div style={{ ...a(300), display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:999, padding:"0.4rem 1.3rem", marginBottom:"1.4rem", fontSize:"0.82rem", color:"var(--accent)", fontFamily:"'JetBrains Mono',monospace" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--accent)", display:"inline-block", animation:"blink 1.8s ease-in-out infinite" }} />{h.title}
          </div>
          <p style={{ ...a(400), fontSize:"clamp(0.9rem,1.5vw,1.01rem)", color:"var(--muted)", lineHeight:1.9, maxWidth:540, marginBottom:"2.5rem" }}>{h.sub}</p>
          <div style={{ ...a(500), display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"2.2rem" }}>
            <HeroBtn primary onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>{h.cta1}</HeroBtn>
            <HeroBtn onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>{h.cta2}</HeroBtn>
          </div>
          <div style={{ ...a(600), display:"flex", gap:"1.4rem", flexWrap:"wrap", alignItems:"center" }}>
            {[
              { Icon:IconLocation, text:h.location, color:"#EF4444" },
              { Icon:IconEmail,    text:"miandriasoahobyr@gmail.com", href:"mailto:miandriasoahobyr@gmail.com", color:"#00C8FF" },
              { Icon:IconGitHub,   text:"github.com/bihoux", href:"https://github.com/bihoux", color:"#8B5CF6" },
              { Icon:IconLinkedIn, text:"LinkedIn", href:"https://linkedin.com/in/hoby-ai-computer-vision", color:"#0EA5E9" },
            ].map((item,i)=>item.href?(
              <a key={i} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.75rem", color:"var(--muted)", textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={e=>e.currentTarget.style.color=item.color} onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}>
                <span style={{ color:item.color, display:"flex" }}><item.Icon /></span>{item.text}
              </a>
            ):(
              <span key={i} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.75rem", color:"var(--muted)" }}>
                <span style={{ color:item.color, display:"flex" }}><item.Icon /></span>{item.text}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.2rem", ...a(250) }}>
          <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ position:"relative" }}>
            <div style={{ position:"absolute", inset:-3, borderRadius:24, background:"linear-gradient(135deg,#00C8FF,#8B5CF6,#10B981)", opacity:hov?0.9:0.55, transition:"opacity 0.4s", filter:"blur(8px)", zIndex:0 }} />
            <div style={{ position:"relative", zIndex:1, borderRadius:22, overflow:"hidden", border:"2px solid transparent", background:"linear-gradient(var(--bg),var(--bg)) padding-box, linear-gradient(135deg,#00C8FF,#8B5CF6,#10B981) border-box", transform:hov?"scale(1.025)":"scale(1)", transition:"transform 0.4s cubic-bezier(.4,0,.2,1)", boxShadow:hov?"0 24px 60px rgba(0,200,255,0.25)":"0 12px 40px rgba(0,0,0,0.4)" }}>
              <img src={IMG.heroPhoto} alt="Miandrisoa Hoby RANDRIATSARAFARA" style={{ width:340, maxWidth:"100%", height:420, objectFit:"cover", objectPosition:"center top", display:"block" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:90, background:"linear-gradient(to top,var(--bg)CC,transparent)", pointerEvents:"none" }} />
            </div>
            <div style={{ position:"absolute", top:12, right:12, zIndex:2, background:"rgba(0,200,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(0,200,255,0.4)", borderRadius:8, padding:"4px 10px", fontSize:"0.67rem", color:"#00C8FF", fontFamily:"'JetBrains Mono',monospace" }}>AI · PhD</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:12, padding:"0.5rem 1rem" }}>
            <img src={IMG.logo} alt="Logo" style={{ height:22, width:"auto", objectFit:"contain" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:"var(--muted)" }}>{h.brand}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBtn({ children, onClick, primary }) {
  const [h,setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ border:primary?"none":"1px solid var(--brd)", background:primary?(h?"linear-gradient(135deg,#00C8FF,#10B981)":"linear-gradient(135deg,#00C8FF,#8B5CF6)"):(h?"var(--surface2)":"transparent"), borderRadius:12, padding:"0.72rem 1.9rem", color:primary?"#fff":(h?"var(--accent)":"var(--txt)"), fontSize:"0.9rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:primary?(h?"0 12px 40px rgba(0,200,255,0.45)":"0 8px 28px rgba(0,200,255,0.25)"):"none", transform:h?"translateY(-2px)":"translateY(0)", transition:"all 0.25s ease" }}>{children}</button>;
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function About({ lang }) {
  const c = C[lang].about;
  return (
    <section id="about" style={{ padding:"7rem clamp(1rem,6vw,4rem)", maxWidth:1160, margin:"0 auto" }}>
      <Reveal><SectionTitle title={c.title} /></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start", marginBottom:"3.5rem" }} className="two-col">
        <Reveal delay={100}>
          <p style={{ fontSize:"0.98rem", lineHeight:1.95, color:"var(--muted)", marginBottom:"1.5rem" }}>{c.text}</p>
          <div style={{ background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:14, padding:"1.2rem", marginBottom:"1.2rem" }}>
            <div style={{ fontSize:"0.72rem", color:"var(--accent)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.7rem" }}>{c.recent}</div>
            {c.items.map((item,i)=><div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem", padding:"0.3rem 0", fontSize:"0.84rem", color:"var(--muted)" }}><span style={{ color:"var(--accent)", flexShrink:0 }}>›</span>{item}</div>)}
          </div>
          <div style={{ marginBottom:"0.8rem" }}>
            <div style={{ fontSize:"0.71rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.5rem" }}>{c.langLabel}</div>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>{c.langs.map((l,i)=><Badge key={i} text={l} color="#00C8FF"/>)}</div>
          </div>
          <div>
            <div style={{ fontSize:"0.71rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.5rem" }}>{c.interestsLabel}</div>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>{c.interests.map((h,i)=><Badge key={i} text={h} color="#8B5CF6"/>)}</div>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          {c.stats.map((s,i)=><Reveal key={i} delay={150+i*80}><StatCard value={s.v} label={s.l}/></Reveal>)}
        </div>
      </div>
      <Reveal delay={120}>
        <div style={{ fontSize:"0.72rem", color:"var(--accent)", fontFamily:"'JetBrains Mono',monospace", marginBottom:"0.75rem" }}>// {c.inActionLabel}</div>
        <TeachingPhotoCard />
      </Reveal>
    </section>
  );
}

function TeachingPhotoCard() {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ position:"relative", borderRadius:20, overflow:"hidden", border:`1px solid ${h?"rgba(0,200,255,0.4)":"var(--brd)"}`, boxShadow:h?"0 20px 60px rgba(0,200,255,0.12)":"0 4px 20px rgba(0,0,0,0.3)", height:340, transition:"border-color 0.3s,box-shadow 0.3s" }}>
      <img src={IMG.teaching} alt="Présentation universitaire MESUPRES 2024"
        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%", display:"block", filter:h?"brightness(1.06)":"brightness(0.90)", transition:"filter 0.4s,transform 0.5s", transform:h?"scale(1.03)":"scale(1)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(5,11,24,0.88) 0%,rgba(5,11,24,0.15) 45%,transparent 100%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem 1.75rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
        <span style={{ background:"rgba(0,200,255,0.18)", backdropFilter:"blur(10px)", border:"1px solid rgba(0,200,255,0.4)", borderRadius:8, padding:"5px 14px", fontSize:"0.72rem", color:"#00C8FF", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>🎤 Communication scientifique · 2024</span>
        <span style={{ fontSize:"0.86rem", color:"rgba(255,255,255,0.88)", fontWeight:500 }}>Journées de la Recherche — MESUPRES, Fianarantsoa</span>
      </div>
      {h && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#00C8FF,#8B5CF6)", pointerEvents:"none" }} />}
    </div>
  );
}

function StatCard({ value, label }) {
  const [h,setH] = useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:"var(--surface)", border:`1px solid ${h?"rgba(0,200,255,0.35)":"var(--brd)"}`, borderRadius:16, padding:"1.75rem 1.5rem", textAlign:"center", transition:"all 0.3s", transform:h?"translateY(-4px)":"translateY(0)" }}><div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2.2rem", color:"var(--accent)", lineHeight:1 }}>{value}</div><div style={{ fontSize:"0.78rem", color:"var(--muted)", marginTop:"0.4rem", lineHeight:1.4 }}>{label}</div></div>;
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────
function Skills({ lang }) {
  const c = C[lang].skills;
  return (
    <section id="skills" style={{ padding:"7rem clamp(1rem,6vw,4rem)", background:"var(--surface)", borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <Reveal><SectionTitle title={c.title} sub={c.sub} /></Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:"1.2rem", marginBottom:"1.2rem" }}>
          {SKILL_GROUPS.map((g,i)=><Reveal key={i} delay={i*60}><SkillCard group={g} lang={lang}/></Reveal>)}
        </div>
        <Reveal delay={200}>
          <div style={{ background:"var(--surface2)", border:"1px solid var(--brd)", borderRadius:16, padding:"1.5rem", borderLeft:"3px solid #F59E0B" }}>
            <div style={{ fontSize:"0.75rem", fontFamily:"'JetBrains Mono',monospace", color:"#F59E0B", marginBottom:"0.8rem" }}>{c.progLang}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>{PROG_LANGS.map((l,i)=><Badge key={i} text={l} color="#F59E0B"/>)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function SkillCard({ group, lang }) {
  const [h,setH] = useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:"var(--surface2)", border:`1px solid ${h?group.color+"50":"var(--brd)"}`, borderRadius:16, padding:"1.5rem", borderLeft:`3px solid ${group.color}`, transform:h?"translateY(-3px)":"translateY(0)", transition:"all 0.25s" }}><div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.86rem", color:group.color, marginBottom:"1rem" }}>{tr(group.label,lang)}</div><div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>{group.items.map((item,i)=><div key={i}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.25rem" }}><span style={{ fontSize:"0.78rem", color:"var(--txt)" }}>{item.n}</span><span style={{ fontSize:"0.69rem", color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>{item.p}%</span></div><div style={{ height:4, background:"var(--brd)", borderRadius:999, overflow:"hidden" }}><SkillBar pct={item.p} color={group.color}/></div></div>)}</div></div>;
}
function SkillBar({ pct, color }) {
  const [ref,v] = useVisible();
  return <div ref={ref} style={{ height:"100%", width:v?`${pct}%`:"0%", background:`linear-gradient(90deg,${color},${color}80)`, borderRadius:999, transition:"width 1.2s cubic-bezier(.4,0,.2,1)" }}/>;
}

// ─── PROJECTS ───────────────────────────────────────────────────────────────
function Projects({ lang }) {
  const c = C[lang].projects;
  return (
    <section id="projects" style={{ padding:"7rem clamp(1rem,6vw,4rem)", maxWidth:1160, margin:"0 auto" }}>
      <Reveal><SectionTitle title={c.title} sub={c.sub}/></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:"1.2rem" }}>
        {PROJECTS.map((p,i)=><Reveal key={i} delay={i*70}><ProjectCard p={p} lang={lang}/></Reveal>)}
      </div>
    </section>
  );
}
function ProjectCard({ p, lang }) {
  const [h,setH] = useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:"var(--surface)", border:`1px solid ${h?p.color+"40":"var(--brd)"}`, borderRadius:16, padding:"1.5rem", borderTop:`3px solid ${p.color}`, transform:h?"translateY(-4px)":"translateY(0)", transition:"all 0.25s", display:"flex", flexDirection:"column", height:"100%" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.75rem" }}><span style={{ fontSize:26 }}>{p.icon}</span><span style={{ background:`${p.color}12`, border:`1px solid ${p.color}30`, color:p.color, padding:"3px 10px", borderRadius:999, fontSize:"0.68rem", fontFamily:"'JetBrains Mono',monospace" }}>{tr(p.type,lang)}</span></div><h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.92rem", color:"var(--txt)", lineHeight:1.4, marginBottom:"0.6rem" }}>{tr(p.title,lang)}</h3><p style={{ fontSize:"0.83rem", color:"var(--muted)", lineHeight:1.75, flex:1, marginBottom:"1rem" }}>{tr(p.desc,lang)}</p><div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>{p.tags.map((t,i)=><Badge key={i} text={t} color={p.color}/>)}</div></div>;
}

// ─── EXPERIENCE ─────────────────────────────────────────────────────────────
function Experience({ lang }) {
  const c = C[lang].exp;
  return (
    <section id="experience" style={{ padding:"7rem clamp(1rem,6vw,4rem)", background:"var(--surface)", borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal><SectionTitle title={c.title}/></Reveal>
        <div style={{ position:"relative", paddingLeft:"2.75rem" }}>
          <div style={{ position:"absolute", left:"0.75rem", top:8, bottom:8, width:2, background:"linear-gradient(to bottom,#00C8FF,#8B5CF6,#10B981,transparent)", borderRadius:1 }} />
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            {EXPERIENCES.map((exp,i)=>(
              <Reveal key={i} delay={i*80}>
                <div style={{ position:"relative" }}>
                  <div style={{ position:"absolute", left:"-2rem", top:"1.5rem", width:12, height:12, borderRadius:"50%", background:exp.color, boxShadow:`0 0 10px ${exp.color}70`, border:"2px solid var(--bg)" }} />
                  <ExpCard exp={exp} lang={lang}/>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ExpCard({ exp, lang }) {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:"var(--surface2)", border:`1px solid ${h?exp.color+"40":"var(--brd)"}`, borderRadius:16, padding:"1.5rem", borderTop:`3px solid ${exp.color}`, transform:h?"translateX(4px)":"translateX(0)", transition:"all 0.25s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.75rem", marginBottom:"1rem" }}>
        <div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.96rem", color:"var(--txt)" }}>{tr(exp.title,lang)}</h3>
          <div style={{ color:exp.color, fontSize:"0.83rem", fontWeight:600, marginTop:"0.15rem" }}>{exp.company}</div>
          <div style={{ color:"var(--muted)", fontSize:"0.74rem", marginTop:"0.1rem", display:"flex", alignItems:"center", gap:"0.3rem" }}><span style={{ color:"#EF4444", display:"flex", transform:"scale(0.8)" }}><IconLocation /></span>{exp.location}</div>
          {exp.logos && <div style={{ display:"flex", gap:"0.6rem", alignItems:"center", marginTop:"0.6rem", flexWrap:"wrap" }}>{exp.logos.map(k=><InstitutionLogo key={k} logoKey={k} size={22} style={{ opacity:0.85 }}/>)}</div>}
        </div>
        <span style={{ background:`${exp.color}12`, border:`1px solid ${exp.color}35`, color:exp.color, padding:"4px 14px", borderRadius:999, fontSize:"0.71rem", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{tr(exp.period,lang)}</span>
      </div>
      <ul style={{ marginBottom:"1rem", listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"0.35rem" }}>
        {tr(exp.desc,lang).map((item,i)=><li key={i} style={{ color:"var(--muted)", fontSize:"0.83rem", lineHeight:1.65, paddingLeft:"0.75rem", borderLeft:`2px solid ${exp.color}40` }}>{item}</li>)}
      </ul>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>{exp.tags.map((t,i)=><Badge key={i} text={t} color={exp.color}/>)}</div>
    </div>
  );
}

// ─── TEACHING ───────────────────────────────────────────────────────────────
function Teaching({ lang }) {
  const c = C[lang].teaching;
  return (
    <section id="teaching" style={{ padding:"7rem clamp(1rem,6vw,4rem)", maxWidth:1160, margin:"0 auto" }}>
      <Reveal><SectionTitle title={c.title} sub={c.sub}/></Reveal>
      <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
        {TEACHING.map((t,i)=><Reveal key={i} delay={i*80}><TeachingCard school={t} lang={lang}/></Reveal>)}
      </div>
    </section>
  );
}
function TeachingCard({ school, lang }) {
  const [open,setOpen] = useState(null);
  return (
    <div style={{ background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:16, overflow:"hidden", borderTop:`3px solid ${school.color}` }}>
      <div style={{ padding:"1.5rem", borderBottom:"1px solid var(--brd)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <InstitutionLogo logoKey={school.logo} size={40} style={{ borderRadius:8, background:school.logo==="city"?"#1E3A6E":"transparent", padding:school.logo==="city"?"4px":"0" }}/>
            <div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.97rem", color:"var(--txt)" }}>{school.school}</h3>
              <div style={{ color:school.color, fontSize:"0.82rem", marginTop:"0.15rem" }}>{tr(school.role,lang)}</div>
            </div>
          </div>
          <span style={{ background:`${school.color}12`, border:`1px solid ${school.color}35`, color:school.color, padding:"4px 14px", borderRadius:999, fontSize:"0.71rem", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{tr(school.period,lang)}</span>
        </div>
      </div>
      <div style={{ padding:"1rem 1.5rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
        {school.courses.map((course,i)=>(
          <div key={i}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", background:open===i?`${school.color}10`:"var(--surface2)", border:`1px solid ${open===i?school.color+"30":"var(--brd)"}`, borderRadius:10, padding:"0.68rem 1rem", cursor:"pointer", color:"var(--txt)", fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", fontWeight:open===i?600:400, transition:"all 0.2s", textAlign:"left" }}>
              <span>📌 {tr(course.name,lang)}</span>
              <span style={{ color:school.color, flexShrink:0, marginLeft:"0.5rem" }}>{open===i?"▲":"▼"}</span>
            </button>
            {open===i && <div style={{ background:`${school.color}08`, border:`1px solid ${school.color}20`, borderTop:"none", borderRadius:"0 0 10px 10px", padding:"0.9rem 1.2rem", fontSize:"0.82rem", color:"var(--muted)", lineHeight:1.8 }}>{tr(course.detail,lang)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EDUCATION ──────────────────────────────────────────────────────────────
function Education({ lang }) {
  const c = C[lang].edu;
  return (
    <section id="education" style={{ padding:"7rem clamp(1rem,6vw,4rem)", background:"var(--surface)", borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
      <div style={{ maxWidth:920, margin:"0 auto" }}>
        <Reveal><SectionTitle title={c.title}/></Reveal>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {EDUCATION.map((edu,i)=><Reveal key={i} delay={i*80}><EduCard edu={edu} lang={lang}/></Reveal>)}
        </div>
      </div>
    </section>
  );
}
function EduCard({ edu, lang }) {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:"var(--surface2)", border:`1px solid ${h?edu.color+"40":"var(--brd)"}`, borderRadius:16, padding:"1.4rem 1.6rem", borderLeft:`3px solid ${edu.color}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem", transform:h?"translateY(-2px)":"translateY(0)", transition:"all 0.25s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
        {edu.logo && <InstitutionLogo logoKey={edu.logo} size={34} style={{ opacity:0.9 }}/>}
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.91rem", color:"var(--txt)", marginBottom:"0.2rem" }}>{edu.icon} {tr(edu.degree,lang)}</div>
          <div style={{ color:edu.color, fontSize:"0.81rem", fontWeight:600 }}>{edu.school}</div>
          <div style={{ color:"var(--muted)", fontSize:"0.73rem", marginTop:"0.1rem" }}>📍 {edu.location}</div>
        </div>
      </div>
      <span style={{ background:`${edu.color}12`, border:`1px solid ${edu.color}35`, color:edu.color, padding:"4px 14px", borderRadius:999, fontSize:"0.75rem", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{edu.period}</span>
    </div>
  );
}

// ─── PUBLICATIONS ────────────────────────────────────────────────────────────
function Publications({ lang }) {
  const c = C[lang].pub;
  return (
    <section id="publications" style={{ padding:"7rem clamp(1rem,6vw,4rem)", maxWidth:1160, margin:"0 auto" }}>
      <Reveal><SectionTitle title={c.title}/></Reveal>
      {PUBLICATIONS.map((p,i)=>(
        <Reveal key={i} delay={i*80}>
          <div style={{ background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:16, padding:"2rem", borderTop:`3px solid ${p.color}` }}>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1rem" }}>
              {[{lbl:`📄 ${c.type}`,col:p.color},{lbl:`⏳ ${c.status}`,col:"#F59E0B"},{lbl:`📅 ${p.year}`,col:p.color}].map((chip,j)=><span key={j} style={{ background:`${chip.col}12`, border:`1px solid ${chip.col}30`, color:chip.col, padding:"3px 12px", borderRadius:999, fontSize:"0.69rem", fontFamily:"'JetBrains Mono',monospace" }}>{chip.lbl}</span>)}
            </div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"var(--txt)", lineHeight:1.4, marginBottom:"0.6rem" }}>{p.title}</h3>
            <div style={{ fontSize:"0.83rem", color:"var(--muted)", marginBottom:"1.2rem" }}><span style={{ color:p.color, fontWeight:600 }}>{c.coAuthors}: </span>{p.authors}</div>
            <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", flexWrap:"wrap" }}>
              <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>{p.tags.map((t,i)=><Badge key={i} text={t} color={p.color}/>)}</div>
              <div style={{ display:"flex", gap:"0.75rem", alignItems:"center" }}>
                <InstitutionLogo logoKey="edmi" size={28}/>
                <InstitutionLogo logoKey="glore" size={36}/>
                <InstitutionLogo logoKey="limad" size={44}/>
                <InstitutionLogo logoKey="uf" size={30}/>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

// ─── CERTIFICATIONS (lightbox) ───────────────────────────────────────────────
function Certifications({ lang }) {
  const c = C[lang].certs;
  const [lb, setLb] = useState(null);
  return (
    <>
      <section id="certifications" style={{ padding:"7rem clamp(1rem,6vw,4rem)", background:"var(--surface)", borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Reveal><SectionTitle title={c.title} sub={c.sub}/></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:"1.1rem" }}>
            {CERTS.map((cert,i)=><Reveal key={cert.key} delay={i*55}><CertCard cert={cert} lang={lang} viewLabel={c.viewCert} onOpen={()=>setLb(i)}/></Reveal>)}
          </div>
        </div>
      </section>
      {lb !== null && <Lightbox index={lb} onClose={()=>setLb(null)} onPrev={()=>setLb(i=>(i-1+CERTS.length)%CERTS.length)} onNext={()=>setLb(i=>(i+1)%CERTS.length)} lang={lang}/>}
    </>
  );
}
function CertCard({ cert, lang, viewLabel, onOpen }) {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onOpen}
      style={{ background:"var(--surface2)", border:`1px solid ${h?cert.color+"50":"var(--brd)"}`, borderRadius:16, overflow:"hidden", borderTop:`3px solid ${cert.color}`, transform:h?"translateY(-5px)":"translateY(0)", transition:"all 0.3s", cursor:"pointer", display:"flex", flexDirection:"column", height:"100%", boxShadow:h?`0 12px 32px ${cert.color}20`:"none" }}>
      <div style={{ position:"relative", height:135, overflow:"hidden", background:"#f8f8f8" }}>
        <img src={IMG.certs[cert.key]} alt={tr(cert.title,lang)} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block", filter:h?"brightness(1.05)":"brightness(0.97)", transition:"transform 0.4s,filter 0.4s", transform:h?"scale(1.04)":"scale(1)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:8, right:10, background:cert.color, borderRadius:8, padding:"3px 8px", fontSize:"0.65rem", color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>{cert.icon}</div>
        {h && <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.35)", pointerEvents:"none" }}><span style={{ background:"rgba(255,255,255,0.92)", color:cert.color, borderRadius:10, padding:"6px 14px", fontSize:"0.75rem", fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>🔍 {viewLabel}</span></div>}
      </div>
      <div style={{ padding:"1rem 1.1rem", display:"flex", flexDirection:"column", flex:1, gap:"0.3rem" }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.81rem", color:"var(--txt)", lineHeight:1.4, flex:1 }}>{tr(cert.title,lang)}</h3>
        <div style={{ color:cert.color, fontSize:"0.74rem", fontWeight:600, marginTop:"0.25rem" }}>{cert.org}</div>
        <div style={{ color:"var(--muted)", fontSize:"0.69rem", fontFamily:"'JetBrains Mono',monospace" }}>{tr(cert.date,lang)}</div>
        {cert.code && <div style={{ color:"var(--muted)", fontSize:"0.67rem", fontFamily:"'JetBrains Mono',monospace" }}>ID: {cert.code}</div>}
        {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", marginTop:"0.5rem", color:cert.color, fontSize:"0.72rem", textDecoration:"none", fontWeight:600 }}><IconExternal /> {C[lang].verify}</a>}
      </div>
    </div>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────
function Contact({ lang }) {
  const c = C[lang].contact;
  const [form,setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent,setSent] = useState(false);
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.location.href = `mailto:miandriasoahobyr@gmail.com?subject=${encodeURIComponent(form.subject||"Contact Portfolio")}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    setSent(true); setTimeout(()=>setSent(false),3000);
  };
  const waUrl = `https://wa.me/261346276386?text=${encodeURIComponent("Bonjour Hoby, je vous contacte depuis votre portfolio.")}`;
  const CONTACTS = [
    { Icon:IconEmail,    label:"Email",    value:"miandriasoahobyr@gmail.com", href:"mailto:miandriasoahobyr@gmail.com",               color:"#00C8FF", bg:"rgba(0,200,255,0.08)" },
    { Icon:IconWhatsApp, label:"WhatsApp", value:"+261 34 62 763 86",          href:waUrl,                                             color:"#10B981", bg:"rgba(16,185,129,0.08)" },
    { Icon:IconGitHub,   label:"GitHub",   value:"github.com/bihoux",          href:"https://github.com/bihoux",                      color:"#8B5CF6", bg:"rgba(139,92,246,0.08)" },
    { Icon:IconLinkedIn, label:"LinkedIn", value:"hoby-ai-computer-vision",    href:"https://linkedin.com/in/hoby-ai-computer-vision", color:"#0EA5E9", bg:"rgba(14,165,233,0.08)" },
    { Icon:IconLocation, label:"Location", value:"Fianarantsoa / Antananarivo, Madagascar", href:null,                               color:"#EF4444", bg:"rgba(239,68,68,0.08)" },
  ];
  return (
    <section id="contact" style={{ padding:"7rem clamp(1rem,6vw,4rem)", maxWidth:1100, margin:"0 auto" }}>
      <Reveal><SectionTitle title={c.title} centered/></Reveal>
      <Reveal delay={80}><p style={{ color:"var(--muted)", textAlign:"center", marginBottom:"3rem", fontSize:"0.94rem" }}>{c.sub}</p></Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }} className="two-col">
        <Reveal delay={100}>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {CONTACTS.map((item,i) => {
              const [h,setH] = useState(false);
              const inner = (
                <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
                  style={{ display:"flex", alignItems:"center", gap:"1rem", background:h?item.bg:"var(--surface)", border:`1px solid ${h?item.color+"50":"var(--brd)"}`, borderRadius:14, padding:"0.9rem 1.2rem", borderLeft:`3px solid ${item.color}`, transform:h?"translateX(5px)":"translateX(0)", transition:"all 0.25s", cursor:item.href?"pointer":"default" }}>
                  <span style={{ color:item.color, display:"flex", alignItems:"center", justifyContent:"center", width:38, height:38, background:`${item.color}15`, borderRadius:10, flexShrink:0, border:`1px solid ${item.color}25` }}><item.Icon /></span>
                  <div>
                    <div style={{ fontSize:"0.71rem", color:item.color, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{item.label}</div>
                    <div style={{ fontSize:"0.82rem", color:"var(--muted)", marginTop:"0.15rem", wordBreak:"break-word" }}>{item.value}</div>
                  </div>
                  {item.href && <span style={{ marginLeft:"auto", color:item.color, opacity:h?1:0.35, transition:"opacity 0.2s", display:"flex" }}><IconExternal /></span>}
                </div>
              );
              return item.href ? <a key={i} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ textDecoration:"none" }}>{inner}</a> : <div key={i}>{inner}</div>;
            })}
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ background:"var(--surface)", border:"1px solid var(--brd)", borderRadius:20, padding:"2rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"0.75rem" }}>
              <Inp placeholder={c.name} value={form.name} onChange={v=>setForm(f=>({...f,name:v}))}/>
              <Inp placeholder={c.email} type="email" value={form.email} onChange={v=>setForm(f=>({...f,email:v}))}/>
            </div>
            <Inp placeholder={c.subject} value={form.subject} onChange={v=>setForm(f=>({...f,subject:v}))} style={{ marginBottom:"0.75rem" }}/>
            <textarea placeholder={c.message} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5}
              style={{ width:"100%", background:"var(--surface2)", border:"1px solid var(--brd)", borderRadius:10, padding:"0.7rem 1rem", color:"var(--txt)", fontSize:"0.86rem", fontFamily:"'DM Sans',sans-serif", resize:"vertical", marginBottom:"0.75rem", outline:"none", lineHeight:1.7 }}/>
            <div style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
              <button onClick={handleSubmit} style={{ flex:1, background:"linear-gradient(135deg,#00C8FF,#8B5CF6)", border:"none", borderRadius:10, padding:"0.72rem 1.5rem", color:"#fff", fontWeight:600, fontSize:"0.87rem", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", opacity:sent?0.8:1, transition:"opacity 0.2s,transform 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                {sent?"✓ Envoyé":<><IconEmail /> {c.send}</>}
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"#10B98115", border:"1px solid #10B98140", borderRadius:10, padding:"0.72rem 1.2rem", color:"#10B981", fontWeight:600, fontSize:"0.86rem", textDecoration:"none", transition:"background 0.2s,transform 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="#10B98125";e.currentTarget.style.transform="translateY(-1px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#10B98115";e.currentTarget.style.transform="translateY(0)";}}>
                <IconWhatsApp /> {c.whatsapp}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Inp({ placeholder, value, onChange, type="text", style={} }) {
  return <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%", background:"var(--surface2)", border:"1px solid var(--brd)", borderRadius:10, padding:"0.68rem 1rem", color:"var(--txt)", fontSize:"0.86rem", fontFamily:"'DM Sans',sans-serif", outline:"none", ...style }}/>;
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ lang }) {
  const SOCIALS = [
    { Icon:IconGitHub,   href:"https://github.com/bihoux",                         label:"GitHub",   color:"#8B5CF6" },
    { Icon:IconLinkedIn, href:"https://linkedin.com/in/hoby-ai-computer-vision",   label:"LinkedIn", color:"#0EA5E9" },
    { Icon:IconWhatsApp, href:`https://wa.me/261346276386`,                        label:"WhatsApp", color:"#10B981" },
    { Icon:IconEmail,    href:"mailto:miandriasoahobyr@gmail.com",                 label:"Email",    color:"#00C8FF" },
  ];
  return (
    <footer style={{ padding:"2rem clamp(1rem,4vw,3rem)", borderTop:"1px solid var(--brd)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1.2rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        <img src={IMG.logo} alt="Logo" style={{ height:28, width:"auto", objectFit:"contain", opacity:0.85 }}/>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.74rem", color:"var(--muted)" }}>© {new Date().getFullYear()} · Miandrisoa Hoby RANDRIATSARAFARA</span>
      </div>
      <span style={{ fontSize:"0.77rem", color:"var(--muted)" }}>✨ {C[lang].footer}</span>
      <div style={{ display:"flex", gap:"0.5rem" }}>
        {SOCIALS.map((s,i)=>{
          const [h,setH] = useState(false);
          return <a key={i} href={s.href} title={s.label} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:38, height:38, background:h?`${s.color}18`:"var(--surface)", border:`1px solid ${h?s.color+"60":"var(--brd)"}`, borderRadius:10, color:h?s.color:"var(--muted)", textDecoration:"none", transition:"all 0.25s", transform:h?"translateY(-2px)":"translateY(0)" }}><s.Icon /></a>;
        })}
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark,setDark] = useState(true);
  const [lang,setLang] = useState("fr");
  useEffect(()=>{ if(!document.getElementById("gf")){ const l=document.createElement("link"); l.id="gf"; l.rel="stylesheet"; l.href=FONT_URL; document.head.appendChild(l); } },[]);
  const vars = dark
    ? { "--bg":"#050B18","--surface":"#0D1526","--surface2":"#121F38","--brd":"#1E2D4A","--txt":"#E2E8F0","--muted":"#64748B","--accent":"#00C8FF","--grid":"rgba(0,200,255,0.025)" }
    : { "--bg":"#F0F4FF","--surface":"#FFFFFF","--surface2":"#F8FAFC","--brd":"#E2E8F0","--txt":"#0F172A","--muted":"#94A3B8","--accent":"#0284C7","--grid":"rgba(2,132,199,0.04)" };
  return (
    <div style={{ ...vars, background:"var(--bg)", color:"var(--txt)", fontFamily:"'DM Sans',sans-serif", minHeight:"100vh", lineHeight:1.6 }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}
        h1,h2,h3,h4{font-family:'Syne',sans-serif}
        input,textarea{transition:border-color .2s}
        input:focus,textarea:focus{border-color:var(--accent)!important;outline:none}
        input::placeholder,textarea::placeholder{color:var(--muted);opacity:.7}
        a{color:inherit}
        @keyframes b1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.04)}}
        @keyframes b2{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(15px) scale(.97)}}
        @keyframes gs{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.1}}
        @media(max-width:1024px){.hero-grid{grid-template-columns:1fr!important;text-align:center}.hero-grid>div:last-child{order:-1;display:flex;flex-direction:column;align-items:center}.hero-grid>div:first-child>div:last-child{justify-content:center}}
        @media(max-width:900px){.desk-nav{display:none!important}.burger{display:flex!important}}
        @media(max-width:680px){.two-col{grid-template-columns:1fr!important}}
        @media(max-width:480px){section{padding-left:1rem!important;padding-right:1rem!important}}
      `}</style>
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang}/>
      <Hero lang={lang}/>
      <About lang={lang}/>
      <Skills lang={lang}/>
      <Projects lang={lang}/>
      <Experience lang={lang}/>
      <Teaching lang={lang}/>
      <Education lang={lang}/>
      <Publications lang={lang}/>
      <Certifications lang={lang}/>
      <Contact lang={lang}/>
      <Footer lang={lang}/>
    </div>
  );
}

