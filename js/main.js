/**
 * Fabíola Góes Arquitetura - Script Interativo Principal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // 2. Acordeão de Serviços
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Fecha outros itens
        accordionItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Filtro de Portfólio (Paleta Oficial de Alto Contraste)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  const activeClasses = ['bg-[#141615]', 'text-white', 'border-[#141615]', 'shadow-md'];
  const inactiveClasses = ['bg-white', 'text-[#141615]', 'border-stone-300', 'shadow-sm'];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });
      btn.classList.add(...activeClasses);
      btn.classList.remove(...inactiveClasses);

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 4. Comparador Antes e Depois (Interativo Mobile & Desktop)
  const container = document.getElementById('beforeAfterContainer');
  const overlay = document.getElementById('beforeAfterOverlay');
  const slider = document.getElementById('beforeAfterSlider');
  const btnAntes = document.getElementById('btnSlideAntes');
  const btnDepois = document.getElementById('btnSlideDepois');
  const btnReset = document.getElementById('btnSlideReset');
  const sliderHint = document.getElementById('sliderHint');

  if (container && overlay && slider) {
    let isDragging = false;
    let autoDemoDone = false;
    let animTimeout = null;

    const hideHint = () => {
      if (sliderHint && sliderHint.style.opacity !== '0') {
        sliderHint.style.opacity = '0';
        setTimeout(() => { if (sliderHint) sliderHint.style.display = 'none'; }, 700);
      }
    };

    const setPosition = (percentage, animate = false) => {
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      if (animate) {
        container.classList.add('animating');
        clearTimeout(animTimeout);
        animTimeout = setTimeout(() => {
          container.classList.remove('animating');
        }, 500);
      } else {
        container.classList.remove('animating');
      }

      container.style.setProperty('--ba-pos', `${percentage}%`);
      overlay.style.width = `${percentage}%`;
      slider.style.left = `${percentage}%`;

      hideHint();
    };

    const handlePointerMove = (clientX) => {
      const rect = container.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      setPosition(percentage, false);
    };

    // Suporte a arrasto ou clique em qualquer ponto do container
    const startDrag = (e) => {
      if (e.target.closest('button')) return; // Não interfere nos botões
      isDragging = true;
      slider.classList.add('active');
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handlePointerMove(clientX);
    };

    const stopDrag = () => {
      if (isDragging) {
        isDragging = false;
        slider.classList.remove('active');
      }
    };

    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handlePointerMove(e.clientX);
    });

    container.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX);
      }
    }, { passive: true });

    // Botões de Ação para quem não quer arrastar
    if (btnAntes) {
      btnAntes.addEventListener('click', (e) => {
        e.stopPropagation();
        setPosition(100, true); // Abre 100% da foto de Antes
      });
    }

    if (btnDepois) {
      btnDepois.addEventListener('click', (e) => {
        e.stopPropagation();
        setPosition(0, true); // Abre 100% da foto de Depois
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', (e) => {
        e.stopPropagation();
        setPosition(50, true); // Reseta para comparação 50/50
      });
    }

    // Demonstração visual automática suave ao rolar até o elemento
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !autoDemoDone) {
            autoDemoDone = true;
            setTimeout(() => {
              setPosition(32, true);
              setTimeout(() => {
                setPosition(68, true);
                setTimeout(() => {
                  setPosition(50, true);
                }, 550);
              }, 550);
            }, 700);
            observer.unobserve(container);
          }
        });
      }, { threshold: 0.35 });
      observer.observe(container);
    }
  }

  // 5. Quiz de Regularização
  const quizAnswers = {
    habiteSe: 'Não',
    reforma: 'Sim',
    objetivo: 'Vender',
    bairro: 'Marco'
  };

  const setupQuizButtons = (groupName, key) => {
    const btns = document.querySelectorAll(`[data-quiz-group="${groupName}"]`);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('bg-stone-100', 'text-black', 'font-semibold');
          b.classList.add('bg-stone-800', 'text-stone-300');
        });
        btn.classList.add('bg-stone-100', 'text-black', 'font-semibold');
        btn.classList.remove('bg-stone-800', 'text-stone-300');
        quizAnswers[key] = btn.getAttribute('data-value') || btn.innerText.trim();
        updateQuizResult();
      });
    });
  };

  setupQuizButtons('habite-se', 'habiteSe');
  setupQuizButtons('reforma', 'reforma');
  setupQuizButtons('objetivo', 'objetivo');

  const updateQuizResult = () => {
    const titleEl = document.getElementById('quizVerdictTitle');
    const descEl = document.getElementById('quizVerdictDesc');
    const btnWhatsApp = document.getElementById('quizWhatsAppBtn');

    let title = 'Seu imóvel provavelmente precisa de regularização.';
    let desc = 'Sem habite-se e com ampliação não averbada, a venda costuma travar em cartório e bancos. A Arquiteta Fabíola Góes analisa o seu caso para destravar o processo.';

    if (quizAnswers.habiteSe === 'Sim' && quizAnswers.reforma === 'Não') {
      title = 'Seu imóvel aparenta estar com a documentação em dia!';
      desc = 'Com Habite-se e sem ampliações clandestinas, você está pronto para averbar ou negociar. Caso queira uma certidão ou reforma futura, podemos avaliar.';
    } else if (quizAnswers.habiteSe === 'Não sei') {
      title = 'Recomendamos um Diagnóstico Documental Técnico.';
      desc = 'Muitos imóveis em Belém possuem apenas recibo de compra ou planta antiga sem baixa na Prefeitura. É fundamental checar na SEURB antes de investir em reformas.';
    }

    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;

    // Build WhatsApp URL
    const message = `Olá, Arquiteta Fabíola Góes! Realizei o diagnóstico no seu site:%0A%0A` +
      `• *Possui Habite-se:* ${quizAnswers.habiteSe}%0A` +
      `• *Reforma sem projeto aprovado:* ${quizAnswers.reforma}%0A` +
      `• *Objetivo principal:* ${quizAnswers.objetivo}%0A%0A` +
      `Gostaria de agendar uma consulta para analisar meu imóvel em Belém!`;

    if (btnWhatsApp) {
      btnWhatsApp.href = `https://wa.me/5591982324820?text=${message}`;
    }
  };

  updateQuizResult();

  // 6. Orçamento Guiado
  const orderState = {
    servico: 'Projeto arquitetônico',
    tipo: 'Casa',
    tipoSub: 'Unifamiliar',
    metragem: 180,
    prazo: 'começar em até 3 meses',
    bairro: 'Marco',
    nome: 'Cliente'
  };

  const updatePhoneMockup = () => {
    const previewServico = document.getElementById('wpServico');
    const previewImovel = document.getElementById('wpImovel');
    const previewLocal = document.getElementById('wpLocal');
    const previewPrazo = document.getElementById('wpPrazo');
    const previewNome = document.getElementById('wpNome');
    const finalWhatsAppBtn = document.getElementById('finalOrderWhatsAppBtn');

    if (previewServico) previewServico.innerText = orderState.servico;
    if (previewImovel) previewImovel.innerText = `${orderState.tipo} (${orderState.tipoSub}), ${orderState.metragem} m²`;
    if (previewLocal) previewLocal.innerText = `${orderState.bairro}, Belém`;
    if (previewPrazo) previewPrazo.innerText = orderState.prazo;
    if (previewNome) previewNome.innerText = orderState.nome || 'Visitante';

    const message = `Olá, Fabíola! Vim pelo seu site e montei meu pedido de orçamento:%0A%0A` +
      `• *Serviço:* ${orderState.servico}%0A` +
      `• *Imóvel:* ${orderState.tipo} (${orderState.tipoSub}), ${orderState.metragem} m²%0A` +
      `• *Localização:* ${orderState.bairro}, Belém - PA%0A` +
      `• *Previsão/Prazo:* ${orderState.prazo}%0A` +
      `• *Meu Nome:* ${orderState.nome}%0A%0A` +
      `Poderia me enviar uma proposta ou orientações?`;

    if (finalWhatsAppBtn) {
      finalWhatsAppBtn.href = `https://wa.me/5591982324820?text=${message}`;
    }
  };

  // Buttons tipo de imóvel
  const imovelCards = document.querySelectorAll('.imovel-select-card');
  imovelCards.forEach(card => {
    card.addEventListener('click', () => {
      imovelCards.forEach(c => {
        c.classList.remove('border-stone-900', 'bg-stone-50');
        c.classList.add('border-stone-200', 'bg-white');
      });
      card.classList.add('border-stone-900', 'bg-stone-50');
      card.classList.remove('border-stone-200', 'bg-white');

      orderState.tipo = card.getAttribute('data-tipo') || 'Casa';
      orderState.tipoSub = card.getAttribute('data-sub') || 'Unifamiliar';
      updatePhoneMockup();
    });
  });

  // Slider de metragem
  const areaSlider = document.getElementById('areaSlider');
  const areaDisplay = document.getElementById('areaDisplay');
  if (areaSlider && areaDisplay) {
    areaSlider.addEventListener('input', (e) => {
      orderState.metragem = e.target.value;
      areaDisplay.innerText = `${e.target.value} m²`;
      updatePhoneMockup();
    });
  }

  // Inputs de texto e selects do orçamento
  const serviceSelect = document.getElementById('orderServiceSelect');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
      orderState.servico = e.target.value;
      updatePhoneMockup();
    });
  }

  const prazoSelect = document.getElementById('orderPrazoSelect');
  if (prazoSelect) {
    prazoSelect.addEventListener('change', (e) => {
      orderState.prazo = e.target.value;
      updatePhoneMockup();
    });
  }

  const bairroInput = document.getElementById('orderBairroInput');
  if (bairroInput) {
    bairroInput.addEventListener('input', (e) => {
      orderState.bairro = e.target.value || 'Belém';
      updatePhoneMockup();
    });
  }

  const nameInput = document.getElementById('orderNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      orderState.nome = e.target.value || 'Cliente';
      updatePhoneMockup();
    });
  }

  updatePhoneMockup();

  // 7. Gaveta de Personalização Interativa para a Fabíola (Demo Customizer)
  const toggleCustomizerBtn = document.getElementById('toggleCustomizerBtn');
  const customizerPanel = document.getElementById('customizerPanel');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');

  if (toggleCustomizerBtn && customizerPanel) {
    toggleCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.toggle('closed');
    });
  }

  if (closeCustomizerBtn && customizerPanel) {
    closeCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.add('closed');
    });
  }

  // Seção Toggles
  const toggles = [
    { id: 'toggleHero', target: 'inicio' },
    { id: 'toggleServicos', target: 'servicos' },
    { id: 'toggleProjetos', target: 'projetos' },
    { id: 'toggleQuiz', target: 'regularizacao' },
    { id: 'toggleOrcamento', target: 'orcamento' },
    { id: 'toggleComoFunciona', target: 'comofunciona' },
    { id: 'toggleProfissionais', target: 'profissionais' },
    { id: 'toggleSobre', target: 'sobre' },
    { id: 'toggleContato', target: 'contato' },
  ];

  toggles.forEach(({ id, target }) => {
    const checkbox = document.getElementById(id);
    const section = document.getElementById(target);
    if (checkbox && section) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    }
  });

  // ==============================================================
  // RASTREAMENTO INTELIGENTE DE EVENTOS DE CONVERSÃO (TRÁFEGO PAGO)
  // ==============================================================
  
  // 1. Rastreamento Global de Qualquer Clique em Link de WhatsApp
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (link) {
      const label = link.getAttribute('aria-label') || link.innerText.trim() || 'WhatsApp Global';
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Contact', {
          event_category: 'Engajamento',
          event_label: label,
          channel: 'WhatsApp'
        });
      }
    }
  });

  // 2. Rastreamento de Clique no CTA Principal do Header ("Solicitar Orçamento")
  const headerOrcamentoBtn = document.querySelector('header a[href="#orcamento"]');
  if (headerOrcamentoBtn) {
    headerOrcamentoBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('InitiateCheckout', {
          event_category: 'Navegacao',
          event_label: 'Header_Solicitar_Orcamento'
        });
      }
    });
  }

  // 3. Rastreamento de Envio do Orçamento Guiado
  const orderWpBtn = document.getElementById('finalOrderWhatsAppBtn');
  if (orderWpBtn) {
    orderWpBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Lead', {
          event_category: 'Conversao_Alta',
          event_label: 'Orcamento_Guiado_Enviado',
          servico: currentOrder ? currentOrder.servico : '',
          tipo_imovel: currentOrder ? currentOrder.tipoImovel : '',
          area_m2: currentOrder ? currentOrder.area : '',
          prazo: currentOrder ? currentOrder.prazo : '',
          bairro: currentOrder ? currentOrder.bairro : '',
          value: 1.0,
          currency: 'BRL'
        });
      }
    });
  }

  // 4. Rastreamento de Conclusão do Quiz de Regularização
  const quizWpBtn = document.getElementById('quizWhatsAppBtn');
  if (quizWpBtn) {
    quizWpBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Lead', {
          event_category: 'Conversao_Media',
          event_label: 'Quiz_Regularizacao_Concluido',
          habite_se: quizAnswers ? quizAnswers.habiteSe : '',
          reforma: quizAnswers ? quizAnswers.reforma : '',
          objetivo: quizAnswers ? quizAnswers.objetivo : '',
          value: 1.0,
          currency: 'BRL'
        });
      }
    });
  }

});
