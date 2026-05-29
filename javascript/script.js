// --- Efeito ao carregar a página ---
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// --- MENU MOBILE ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Fechar menu móvel ao clicar nos links
document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// --- HEADER SCROLL EFFECT ---
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// --- SCROLL REVEAL (ANIMAÇÕES GLOBAIS) ---
ScrollReveal().reveal(
  ".hero-content, .sobre, .section-title, .filter-buttons, .gallery-item, .reserva-box, .mapa, .contato-info",
  {
    delay: 300,
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  }
);

// --- DADOS DO CARDÁPIO OTIMIZADOS ---
const cardapioItems = [
  {
    id: 1,
    categoria: "entrada",
    nome: "Bruschetta Toscana",
    preco: "3.200 Kz",
    desc: "Pão italiano tostado com tomates, manjericão e azeite.",
    img: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 2,
    categoria: "principal",
    nome: "Risoto de Funghi",
    preco: "6.800 Kz",
    desc: "Arroz arbóreo com mix de cogumelos silvestres e parmesão.",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 3,
    categoria: "sobremesa",
    nome: "Petit Gâteau",
    preco: "2.800 Kz",
    desc: "Bolo quente de chocolate com sorvete de baunilha artesanal.",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 4,
    categoria: "principal",
    nome: "Salmão Grelhado",
    preco: "8.500 Kz",
    desc: "Filé de salmão com crosta de ervas e legumes salteados.",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 5,
    categoria: "entrada",
    nome: "Burrata ao Pesto",
    preco: "4.500 Kz",
    desc: "Burrata cremosa servida com pesto de manjericão e torradas.",
    img: "https://images.unsplash.com/photo-1700483540089-63307e6dbca1?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 6,
    categoria: "sobremesa",
    nome: "Tiramisù Clássico",
    preco: "3.000 Kz",
    desc: "Camadas de biscoito embebidas em café e creme mascarpone.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=70",
  },
];

const menuContainer = document.getElementById("menu-container");
const filterBtns = document.querySelectorAll(".filter-btn");

// Renderização e controle de concorrência do ScrollReveal
function displayMenuItems(items) {
  let displayMenu = items.map(function (item) {
    return `
      <article class="menu-card">
        <img src="${item.img}" alt="${item.nome}">
        <div class="menu-info">
          <h3>
            ${item.nome}
            <div class="price">${item.preco}</div>
          </h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `;
  }).join("");

  menuContainer.innerHTML = displayMenu;

  // Reseta instâncias antigas para evitar bugs de cards invisíveis ao filtrar
  ScrollReveal().clean(".menu-card");
  ScrollReveal().reveal(".menu-card", {
    delay: 100,
    distance: "30px",
    origin: "bottom",
    duration: 500,
    interval: 80,
  });
}

// Filtro do Menu Dinâmico
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    const categoria = e.target.dataset.filter;
    if (categoria === "todos") {
      displayMenuItems(cardapioItems);
    } else {
      const menuFiltrado = cardapioItems.filter((item) => item.categoria === categoria);
      displayMenuItems(menuFiltrado);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(cardapioItems);
});

// --- RESERVA VIA WHATSAPP OTIMIZADA E CORRIGIDA ---
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  let zapCliente = document.getElementById('whatsapp').value;
  const dataRaw = document.getElementById('data').value; 
  const hora = document.getElementById('hora').value;
  const pessoas = document.getElementById('pessoas').value;

  // Limpa caracteres especiais introduzidos pelo utilizador apenas para validação
  zapCliente = zapCliente.replace(/\D/g, ''); 

  if (zapCliente.length !== 9) {
    alert("Por favor, introduza um número válido com exatamente 9 dígitos.");
    return;
  }

  // Formata a data de AAAA-MM-DD para DD/MM/AAAA
  const dataFormatada = dataRaw.split('-').reverse().join('/');

  // O número oficial do restaurante (Marginal de Luanda) limpo
  const numeroRestaurante = "244951414234";

  const mensagem = `Olá, gostaria de solicitar uma reserva:%0A%0A*Nome:* ${nome}%0A*Data:* ${dataFormatada}%0A*Hora:* ${hora}%0A*Pessoas:* ${pessoas}%0A*Contacto do Cliente:* ${zapCliente}`;
  const url = `https://wa.me/${numeroRestaurante}?text=${mensagem}`;
  
  window.open(url, '_blank');  
});