 // --- MENU MOBILE COM TROCA DE ÍCON ---
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");

      hamburger.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("active");

        if (isActive) {
          // QUANDO ABERTO: Troca as barras por um X do Font Awesome
          hamburger.innerHTML =
            '<i class="fas fa-times" style="font-size: 25px; color: var(--dark-color); display: block; width: 25px; text-align: center;"></i>';
        } else {
          // QUANDO FECHADO: Volta para as 3 barras originais
          hamburger.innerHTML =
            '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        }
      });

      // FECHAR AO CLICAR EM LINKS
      document.querySelectorAll(".nav-menu li a").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          hamburger.innerHTML =
            '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        });
      });

      // --- SCROLL REVEAL ---
      ScrollReveal().reveal(  
        ".hero-content, .sobre, .menu-card, .gallery-item, .reserva-box, .mapa, .contato-info",
        {
          delay: 200,
          distance: "50px",
          origin: "bottom",
          duration: 1000,
        }
      );

      // --- HEADER SCROLL ---
      window.addEventListener("scroll", () => {
        const header = document.getElementById("header");
        header.style.background = window.scrollY > 100 ? "#ffffff" : "#ffffff";
        header.style.padding = window.scrollY > 100 ? "0.5rem 0" : "1rem 0";
      });
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
          img: "https://images.unsplash.com/photo-1700483540089-63307e6dbca1?q=80&w=811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

      // Função para renderizar itens
      function displayMenuItems(items) {
        let displayMenu = items
          .map(function (item) {
            return `<article class="menu-card">
                    <img src="${item.img}" alt="${item.nome}">
                    <div class="menu-info">
                        <h3>${item.nome} <div class="price">${item.preco}</div>
                          </h3>
                        <p>${item.desc}</p>
                        
                    </div>
                </article>`;
          })
          .join("");
        menuContainer.innerHTML = displayMenu;
      }

      // Filtro dinâmico
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // Remover classe ativa
          filterBtns.forEach((b) => b.classList.remove("active"));
          e.target.classList.add("active");

          const categoria = e.target.dataset.filter;
          if (categoria === "todos") {
            displayMenuItems(cardapioItems);
          } else {
            const menuFiltrado = cardapioItems.filter(
              (item) => item.categoria === categoria
            );
            displayMenuItems(menuFiltrado);
          }
        });
      });

      // Carregar itens iniciais
      window.addEventListener("DOMContentLoaded", () => {
        displayMenuItems(cardapioItems);
      });

      //form reservar
      document.getElementById('reservaForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const zap = document.getElementById('whatsapp').value;
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            const pessoas = document.getElementById('pessoas').value;

            const mensagem = `Olá, gostaria de solicitar uma reserva:%0A%0A*Nome:* ${nome}%0A*Data:* ${data}%0A*Hora:* ${hora}%0A*Pessoas:* ${pessoas}%0A*Contato:* ${zap}`;
            const url = `https://wa.me/244951414234?text=${mensagem}`;
            
            window.open(url, '_blank');  
        });