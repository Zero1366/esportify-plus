import "../scss/index.scss";
import "../navigation";

const contactForm = document.querySelector<HTMLFormElement>("#contactForm");
const toastContainer = document.querySelector<HTMLElement>("#toastContainer");

function showToast(message: string): void {
  if (!toastContainer) {
    alert(message);
    return;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3000);
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  showToast("Message envoyé. Ceci est une démonstration.");

  contactForm.reset();
});

document.body.classList.add("is-ready");