  // Mobile hamburger menu toggle (works for both markup patterns)
  const menuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu"); // Dedicated mobile menu container (profil-sekolah.html)
  const headerNav = document.querySelector("header nav"); // Fallback to inline nav (index.html)

  function setAriaExpanded(el, expanded) {
    if (!el) return;
    el.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  // --- ganti fungsi ini di script.js ---
function toggleMobileMenuContainer() {
  if (!mobileMenu) return;

  const willOpen = mobileMenu.classList.contains('hidden') ||
                   mobileMenu.classList.contains('opacity-0') ||
                   mobileMenu.classList.contains('pointer-events-none');

  if (willOpen) {
    mobileMenu.classList.remove('hidden','opacity-0','pointer-events-none');
  } else {
    mobileMenu.classList.add('opacity-0','pointer-events-none');
    // sembunyikan setelah transisi
    setTimeout(()=> mobileMenu.classList.add('hidden'), 150);
  }
  setAriaExpanded(menuBtn, willOpen);
}


  function setHeaderNavOpen(open) {
    if (!headerNav) return;
    const openClasses = [
      "absolute",
      "top-full",
      "left-0",
      "w-full",
      "bg-white",
      "shadow-lg",
      "rounded-b-xl",
      "p-4",
      "flex",
      "flex-col",
      "space-y-2",
      "z-50",
    ];
    headerNav.classList.toggle("hidden", !open);
    openClasses.forEach((c) => headerNav.classList[open ? "add" : "remove"](c));
    setAriaExpanded(menuBtn, open);
  }

  if (menuBtn) {
    // Prefer dedicated mobile menu when present
    if (mobileMenu) {
      // Ensure closed on load
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-controls", "mobile-menu");
      setAriaExpanded(menuBtn, false);
      menuBtn.addEventListener("click", toggleMobileMenuContainer);
    } else if (headerNav) {
      // Fallback: toggle inline nav for pages without a dedicated mobile menu container
      setHeaderNavOpen(false);
      menuBtn.addEventListener("click", () => {
        const willOpen = headerNav.classList.contains("hidden");
        setHeaderNavOpen(willOpen);
      });
    }
  }

  // Mobile dropdown toggles (for pages that include collapsible mobile submenus)
  document.querySelectorAll(".mobile-dropdown > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.parentElement.querySelector(".mobile-dropdown-content");
      if (!content) return;
      content.classList.toggle("hidden");
    });
  });

  // Close menus when resizing to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      if (mobileMenu) mobileMenu.classList.add("hidden");
      if (headerNav) setHeaderNavOpen(false);
      setAriaExpanded(menuBtn, false);
    }
  });