// --- Efeito ao carregar a página ---
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// --- MENU MOBILE COM TROCA DE ÍCONE ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const header = document.getElementById("header");

hamburger.addEventListener("click", () => {
  const isActive = navMenu.classList.toggle("active");

  if (isActive) {
    // QUANDO ABERTO: Substitui as barras pelo X do Font Awesome de forma limpa
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
    // Força o ícone do X a ficar escuro já que o fundo do menu mobile é branco
    hamburger.querySelector('i').style.color = '#1a1a1a';
  } else {
    // QUANDO FECHADO: Reconstrói as barras dinamicamente respeitando o scroll
    rebuildHamburgerBars();
  }
});

// FECHAR AO CLICAR EM LINKS DO MENU
document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      rebuildHamburgerBars();
    }
  });
});

// Função auxiliar para evitar bugs de cores nas barras horizontais nativas
function rebuildHamburgerBars() {
  hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  const bars = hamburger.querySelectorAll(".bar");
  const isScrolled = header.classList.contains("scrolled");
  bars.forEach(bar => {
    bar.style.background = isScrolled ? "#1a1a1a" : "#ffffff";
  });
}

// --- HEADER SCROLL EFFECT (Tratado nativamente via manipulação de classes CSS) ---
window.addEventListener("scroll", () => {
  const bars = hamburger.querySelectorAll(".bar");
  
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    if (!navMenu.classList.contains("active")) {
      bars.forEach(bar => bar.style.background = "#1a1a1a");
    }
  } else {
    header.classList.remove("scrolled");
    if (!navMenu.classList.contains("active")) {
      bars.forEach(bar => bar.style.background = "#ffffff");
    }
  }
});

// --- SCROLL REVEAL (ANIMAÇÕES) ---
ScrollReveal().reveal(
  ".hero-content, .sobre, .section-title, .filter-buttons, .gallery-item, .reserva-box, .mapa, .contato-info",
  {
    delay: 300,
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  }
);

// --- DADOS DO CARDÁPIO ---
const cardapioItems = [
  {
    id: 1,
    categoria: "entrada",
    nome: "Bruschetta Toscana",
    preco: "3.200 Kz",
    desc: "Pão italiano tostado com tomates, manjericão e azeite.",
    img: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    categoria: "principal",
    nome: "Risoto de Funghi",
    preco: "6.800 Kz",
    desc: "Arroz arbóreo com mix de cogumelos silvestres e parmesão.",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    categoria: "sobremesa",
    nome: "Petit Gâteau",
    preco: "2.800 Kz",
    desc: "Bolo quente de chocolate com sorvete de baunilha artesanal.",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    categoria: "principal",
    nome: "Salmão Grelhado",
    preco: "8.500 Kz",
    desc: "Filé de salmão com crosta de ervas e legumes salteados.",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    categoria: "entrada",
    nome: "Burrata ao Pesto",
    preco: "4.500 Kz",
    desc: "Burrata cremosa servida com pesto de manjericão e torradas.",
    img: "https://images.unsplash.com/photo-1700483540089-63307e6dbca1?q=80&w=811&auto=format&fit=crop",
  },
  {
    id: 6,
    categoria: "sobremesa",
    nome: "Tiramisù Clássico",
    preco: "3.000 Kz",
    desc: "Camadas de biscoito embebidas em café e creme mascarpone.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60",
  },
];

const menuContainer = document.getElementById("menu-container");
const filterBtns = document.querySelectorAll(".filter-btn");

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

  // REAPLICAR ANIMAÇÃO DO SCROLL REVEAL NOS CARDS FILTRADOS
  ScrollReveal().reveal(".menu-card", {
    delay: 200,
    distance: "30px",
    origin: "bottom",
    duration: 600,
    interval: 100,
  });
}

// Filtro dinâmico do Menu
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

// Carregar itens iniciais na viewport
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(cardapioItems);
});

// --- ENVIO DO FORMULÁRIO VIA WHATSAPP ---
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const zap = document.getElementById('whatsapp').value;
  const dataRaw = document.getElementById('data').value; 
  const hora = document.getElementById('hora').value;
  const pessoas = document.getElementById('pessoas').value;

  // Converte a string AAAA-MM-DD para DD/MM/AAAA
  const dataFormatada = dataRaw.split('-').reverse().join('/');

  const mensagem = `Olá, gostaria de solicitar uma reserva:%0A%0A*Nome:* ${nome}%0A*Data:* ${dataFormatada}%0A*Hora:* ${hora}%0A*Pessoas:* ${pessoas}%0A*Contato:* ${zap}`;
  const url = `https://wa.me/244951414234?text=${mensagem}`;
  
  window.open(url, '_blank');  
});