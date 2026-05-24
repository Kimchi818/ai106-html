/**
 * Portfolio website — main entry point
 *
 * Handles year insert, gallery preview modal, and page interactions.
 */

(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  const viewGalleryButton = document.getElementById("view-gallery");
  const galleryGrid = document.querySelector(".gallery-grid");
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const openModal = (imageSrc, altText, captionText) => {
    if (!modal || !modalImage || !modalCaption) return;

    modalImage.src = imageSrc;
    modalImage.alt = altText;
    modalCaption.textContent = captionText || altText;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
  };

  if (viewGalleryButton) {
    viewGalleryButton.addEventListener("click", () => {
      document.getElementById("gallery")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  if (galleryGrid) {
    galleryGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".gallery-card");
      if (!card) return;
      const fullSrc = card.dataset.full;
      const caption = card.dataset.caption || "Photo preview";
      const altText = card.querySelector("img")?.alt || "Photo preview";
      openModal(fullSrc, altText, caption);
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      const target = event.target;
      if (
        (target instanceof HTMLElement && target.dataset.action === "close") ||
        target === modal
      ) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();
