document.addEventListener("DOMContentLoaded", () => {
  /* === ANIMATION AU SCROLL POUR .reveal === */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  /* === MODALE CV === */
  const btnCv = document.getElementById("btnCv");
  const modal = document.getElementById("cvModal");
  const closeBtn = modal ? modal.querySelector(".modal-close") : null;
  const backdrop = modal ? modal.querySelector(".modal-backdrop") : null;

  if (btnCv && modal) {
    btnCv.addEventListener("click", () => {
      modal.classList.add("show");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  // Fermer avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });

  /* === NAVBAR ACTIVE SECTION === */
  const sectionIds = ["accueil", "presentation", "projets", "contact"];
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    let index = sectionIds.length;

    while (
      --index &&
      window.scrollY + 120 <
        document.getElementById(sectionIds[index]).offsetTop
    ) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // pour initialiser au chargement
});
  /* === COMPÉTENCES INTERACTIVES === */

  const skillsData = {
    "data-ai": {
      icon: "🧠",
      label: "Data Science & IA",
      items: [
        "Python",
        "Pandas & NumPy",
        "Scikit-learn",
        "Deep Learning",
        "NLP",
        "Computer Vision",
        "TensorFlow",
        "PyTorch"
      ]
    },
    "data-eng": {
      icon: "📊",
      label: "Data Engineering",
      items: [
        "PySpark",
        "ETL Pipelines",
        "Data Lake (Bronze / Silver / Gold)",
        "Big Data (Hadoop)",
        "Data Quality"
      ]
    },
    "mlops": {
      icon: "⚙️",
      label: "MLOps / DevOps",
      items: [
        "Docker",
        "Git / GitHub",
        "GitLab CI/CD",
        "Linux",
        "APIs (REST, FastAPI)"
      ]
    },
    "db": {
      icon: "🗄️",
      label: "Bases de données",
      items: [
        "SQL",
        "NoSQL (MongoDB, Elasticsearch)"
      ]
    },
    "viz": {
      icon: "📈",
      label: "Data Visualization",
      items: [
        "Power BI",
        "Tableau",
        "Kibana",
        "Jupyter Notebook"
      ]
    },
    "web": {
      icon: "🌐",
      label: "Développement Web",
      items: [
        "React",
        "JavaScript",
        "Symfony"
      ]
    }
  };

  const skillButtons = document.querySelectorAll(".skill-cat");
  const popup = document.getElementById("skillsPopup");
  const popupIcon = document.getElementById("skillsPopupIcon");
  const popupLabel = document.getElementById("skillsPopupLabel");
  const popupList = document.getElementById("skillsPopupList");
  const popupClose = document.getElementById("skillsPopupClose");

  function openSkillsPopup(key) {
    const data = skillsData[key];
    if (!data) return;

    // Active state sur les boutons
    skillButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.skill-cat[data-skill="${key}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    // Remplir le contenu
    popupIcon.textContent = data.icon;
    popupLabel.textContent = data.label;

    popupList.innerHTML = "";
    data.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      popupList.appendChild(li);
    });

    // Afficher le pop-up
    popup.classList.add("show");
  }

  // Clic sur une catégorie
  skillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-skill");
      // Si on reclique sur la même catégorie, on ferme
      if (btn.classList.contains("active") && popup.classList.contains("show")) {
        btn.classList.remove("active");
        popup.classList.remove("show");
      } else {
        openSkillsPopup(key);
      }
    });
  });

  // Bouton de fermeture
  if (popupClose) {
    popupClose.addEventListener("click", () => {
      popup.classList.remove("show");
      skillButtons.forEach(btn => btn.classList.remove("active"));
    });
  }

