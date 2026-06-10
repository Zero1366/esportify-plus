import "../scss/index.scss";
import "../navigation";
const contactForm = document.querySelector("#contactForm");
const toastContainer = document.querySelector("#toastContainer");
function showToast(message) {
    if (!toastContainer) {
        window.alert(message);
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
    if (!contactForm.checkValidity()) {
        showToast("Veuillez remplir correctement le formulaire.");
        return;
    }
    showToast("Message envoyé. Ceci est une démonstration.");
    contactForm.reset();
});
document.body.classList.add("is-ready");
