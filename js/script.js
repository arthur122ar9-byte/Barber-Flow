
// =========================
// MODAL DE AGENDAMENTO
// =========================

const bookingModal = document.querySelector("#booking-modal");
const bookingForm = document.querySelector("#booking-form");
const bookingClose = document.querySelector("#booking-close");
const bookingService = document.querySelector("#booking-service");

const bookingButtons = document.querySelectorAll(
    'a[href="#agendamento"]'
);

// Número da barbearia: substitua pelo número real.
// Use DDI + DDD + número, somente dígitos.
const whatsappNumber = "5511917770051";

// Impede a seleção de datas anteriores a hoje.



// Abrir o formulário por qualquer botão de agendamento.
function openBookingModal(service = "") {
    bookingModal.classList.add("active");
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    bookingService.value = service;

    document.querySelector("#client-name").focus();
}

function closeBookingModal() {
    bookingModal.classList.remove("active");
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

bookingButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const service = button.dataset.service || "";

        openBookingModal(service);
    });
});


// Fechar pelo botão X.
bookingClose.addEventListener("click", closeBookingModal);

// Fechar clicando no fundo escuro.
bookingModal.addEventListener("click", (event) => {
    if (event.target === bookingModal) {
        closeBookingModal();
    }
});

// Fechar com a tecla Escape.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" &&
        bookingModal.classList.contains("active")) {
        closeBookingModal();
    }
});



bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#client-name").value.trim();
    const phone = document.querySelector("#client-phone").value.trim();
    const service = bookingService.value;

    if (!name || !phone || !service) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const message =
        `Olá, BarberFlow! Gostaria de solicitar um agendamento.\n\n` +
        `Nome: ${name}\n` +
        `Telefone: ${phone}\n` +
        `Serviço: ${service}\n\n` +
        `Gostaria de combinar um horário. Aguardo o retorno!`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
