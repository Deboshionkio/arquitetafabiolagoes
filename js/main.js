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

  // 4. Comparador Antes e Depois
  const container = document.getElementById('beforeAfterContainer');
  const overlay = document.getElementById('beforeAfterOverlay');
  const slider = document.getElementById('beforeAfterSlider');

  if (container && overlay && slider) {
    let isDragging = false;

    const setPosition = (x) => {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;
      overlay.style.width = `${percentage}%`;
      slider.style.left = `${percentage}%`;
    };

    slider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    // Touch support for mobile
    slider.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
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

  // 7. Gaveta de Personalização Interativa para a Fabíola (Demo Customizer & Mini Page Builder)
  const toggleCustomizerBtn = document.getElementById('toggleCustomizerBtn');
  const customizerPanel = document.getElementById('customizerPanel');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');
  const modulesContainer = document.getElementById('modulesList');
  const defaultOrder = ['inicio', 'servicos', 'projetos', 'regularizacao', 'orcamento', 'comofunciona', 'profissionais', 'sobre', 'contato'];

  if (toggleCustomizerBtn && customizerPanel) {
    toggleCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.toggle('closed');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  if (closeCustomizerBtn && customizerPanel) {
    closeCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.add('closed');
    });
  }

  // Seção Toggles (Visibilidade)
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
        section.style.display = checkbox.checked ? '' : 'none';
      });
    }
  });

  // Reordenação de Seções em Tempo Real (Subir / Descer)
  function updateArrowsState() {
    if (!modulesContainer) return;
    const items = modulesContainer.querySelectorAll('.module-item');
    items.forEach((item, index) => {
      const upBtn = item.querySelector('.btn-move-up');
      const downBtn = item.querySelector('.btn-move-down');
      if (upBtn) upBtn.disabled = (index === 0);
      if (downBtn) downBtn.disabled = (index === items.length - 1);
    });
  }

  function moveModule(item, direction) {
    const targetId = item.getAttribute('data-target');
    const section = document.getElementById(targetId);
    if (!section || !modulesContainer) return;

    if (direction === 'up') {
      const prevItem = item.previousElementSibling;
      if (prevItem) {
        const prevTargetId = prevItem.getAttribute('data-target');
        const prevSection = document.getElementById(prevTargetId);
        if (prevSection && prevSection.parentNode) {
          prevSection.parentNode.insertBefore(section, prevSection);
          modulesContainer.insertBefore(item, prevItem);
        }
      }
    } else if (direction === 'down') {
      const nextItem = item.nextElementSibling;
      if (nextItem) {
        const nextTargetId = nextItem.getAttribute('data-target');
        const nextSection = document.getElementById(nextTargetId);
        if (nextSection && nextSection.parentNode) {
          nextSection.parentNode.insertBefore(section, nextSection.nextSibling);
          modulesContainer.insertBefore(item, nextItem.nextSibling);
        }
      }
    }

    updateArrowsState();
    saveOrder();
  }

  function saveOrder() {
    if (!modulesContainer) return;
    const currentOrder = Array.from(modulesContainer.querySelectorAll('.module-item'))
      .map(item => item.getAttribute('data-target'));
    try {
      localStorage.setItem('fg_sections_order', JSON.stringify(currentOrder));
    } catch (e) {}
  }

  function applyOrder(orderArray) {
    if (!Array.isArray(orderArray) || !orderArray.length || !modulesContainer) return;
    const header = document.querySelector('header');
    if (!header) return;

    let previousNode = document.getElementById('mobileMenu') || header;

    orderArray.forEach(targetId => {
      const section = document.getElementById(targetId);
      const item = modulesContainer.querySelector(`[data-target="${targetId}"]`);
      if (section && section.parentNode) {
        section.parentNode.insertBefore(section, previousNode.nextSibling);
        previousNode = section;
      }
      if (item) {
        modulesContainer.appendChild(item);
      }
    });

    updateArrowsState();
  }

  function loadSavedOrder() {
    try {
      const saved = localStorage.getItem('fg_sections_order');
      if (saved) {
        const order = JSON.parse(saved);
        applyOrder(order);
      } else {
        updateArrowsState();
      }
    } catch (e) {
      updateArrowsState();
    }
  }

  if (modulesContainer) {
    modulesContainer.addEventListener('click', (e) => {
      const upBtn = e.target.closest('.btn-move-up');
      const downBtn = e.target.closest('.btn-move-down');
      if (upBtn && !upBtn.disabled) {
        const item = upBtn.closest('.module-item');
        if (item) moveModule(item, 'up');
      } else if (downBtn && !downBtn.disabled) {
        const item = downBtn.closest('.module-item');
        if (item) moveModule(item, 'down');
      }
    });
  }

  const resetOrderBtn = document.getElementById('resetOrderBtn');
  if (resetOrderBtn) {
    resetOrderBtn.addEventListener('click', () => {
      try { localStorage.removeItem('fg_sections_order'); } catch (e) {}
      applyOrder(defaultOrder);
    });
  }

  loadSavedOrder();

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
