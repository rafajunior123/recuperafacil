function simular() {
    const campoValor = document.getElementById("valorDivida");
    const resultado = document.getElementById("resultado");

    if (!campoValor || !resultado) return;

    const valor = Number(campoValor.value);

    if (!valor || valor <= 0) {
        resultado.innerHTML = "Digite um valor válido para simular.";
        return;
    }

    const entrada = valor * 0.2;
    const parcelas = (valor - entrada) / 4;

    resultado.innerHTML =
        "Entrada: R$ " + entrada.toFixed(2) +
        "<br>4 parcelas de R$ " + parcelas.toFixed(2);
}

const ctx = document.getElementById("graficoRecuperacao");

if (ctx) {
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [{
                label: "Valores Recuperados",
                data: [5000, 8000, 12000, 15000, 20000]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

window.addEventListener("scroll", animarScroll);
window.addEventListener("load", ativarLeituraPorClique);

function animarScroll() {
    /* função reservada para futuras animações */
}

let fonteAtual = 100;

function aumentarFonte() {
    fonteAtual += 10;
    document.documentElement.style.fontSize = fonteAtual + "%";
}

function diminuirFonte() {
    if (fonteAtual > 70) {
        fonteAtual -= 10;
        document.documentElement.style.fontSize = fonteAtual + "%";
    }
}

function alternarContraste() {
    document.body.classList.toggle("alto-contraste");
}

function lerPagina() {
    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não suporta leitura de texto por voz.");
        return;
    }

    const areaPrincipal = document.getElementById("conteudo-principal");
    const texto = areaPrincipal
        ? areaPrincipal.innerText.trim()
        : document.body.innerText.trim();

    if (!texto) {
        alert("Não foi encontrado texto para leitura.");
        return;
    }

    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 1;
    fala.pitch = 1;
    fala.volume = 1;

    const vozes = window.speechSynthesis.getVoices();
    const vozPt = vozes.find(voz => voz.lang.toLowerCase().includes("pt"));

    if (vozPt) {
        fala.voice = vozPt;
    }

    window.speechSynthesis.speak(fala);
}

function lerTextoElemento(texto) {
    if (!("speechSynthesis" in window)) {
        return;
    }

    if (!texto || texto.trim() === "") {
        return;
    }

    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto.trim());
    fala.lang = "pt-BR";
    fala.rate = 1;
    fala.pitch = 1;
    fala.volume = 1;

    const vozes = window.speechSynthesis.getVoices();
    const vozPt = vozes.find(voz => voz.lang.toLowerCase().includes("pt"));

    if (vozPt) {
        fala.voice = vozPt;
    }

    window.speechSynthesis.speak(fala);
}

function ativarLeituraPorClique() {
    const elementos = document.querySelectorAll(".texto-voz");

    elementos.forEach(elemento => {
        elemento.style.cursor = "pointer";
        elemento.setAttribute("tabindex", "0");
        elemento.setAttribute("role", "button");
        elemento.setAttribute("aria-label", "Clique para ouvir este texto");

        elemento.addEventListener("click", () => {
            const texto = elemento.innerText || elemento.textContent;
            lerTextoElemento(texto);
        });

        elemento.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                const texto = elemento.innerText || elemento.textContent;
                lerTextoElemento(texto);
            }
        });
    });
} window.addEventListener("load", () => {
    const intro = document.getElementById("intro");

    if (intro) {
        setTimeout(() => {
            intro.classList.add("sumir");
        }, 3200);

        setTimeout(() => {
            intro.style.display = "none";
        }, 4200);
    }


    const slides = document.querySelectorAll(".carousel-slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }
});