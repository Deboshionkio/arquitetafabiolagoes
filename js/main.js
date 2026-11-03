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

  // 4. Comparador Antes e Depois (Modo Estático Executivo - Transição por Botão)
  const card = document.getElementById('beforeAfterCard');
  const imgAntes = document.getElementById('imgAntes');
  const btnShowAntes = document.getElementById('btnShowAntes');
  const btnShowDepois = document.getElementById('btnShowDepois');
  const btnQuickToggle = document.getElementById('btnQuickToggle');
  const badgeState = document.getElementById('badgeState');
  const badgeStateDot = document.getElementById('badgeStateDot');
  const badgeStateText = document.getElementById('badgeStateText');
  const captionDescription = document.getElementById('captionDescription');

  if (card && imgAntes) {
    let isShowingDepois = false;

    const setView = (showDepois) => {
      isShowingDepois = showDepois;

      if (showDepois) {
        // Revela a foto do DEPOIS (Reforma e Habite-se)
        imgAntes.style.opacity = '0';

        if (btnShowDepois) {
          btnShowDepois.className = "px-3.5 sm:px-4 py-1 text-xs font-bold rounded-full transition-all duration-300 bg-emerald-600 text-white shadow-md shadow-emerald-900/50 cursor-pointer";
        }
        if (btnShowAntes) {
          btnShowAntes.className = "px-3.5 sm:px-4 py-1 text-xs font-semibold rounded-full transition-all duration-300 text-stone-300 hover:text-white cursor-pointer";
        }

        if (badgeState) {
          badgeState.className = "flex items-center gap-1.5 bg-emerald-600/95 text-white border border-emerald-400/40 text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-emerald-900/30 transition-all duration-300";
        }
        if (badgeStateDot) {
          badgeStateDot.className = "w-2 h-2 rounded-full bg-white";
        }
        if (badgeStateText) {
          badgeStateText.textContent = "Depois (Concluído)";
        }
        if (captionDescription) {
          captionDescription.textContent = "Reforma concluída, ampliação legalizada e Habite-se emitido";
        }
      } else {
        // Retorna à foto do ANTES (Original)
        imgAntes.style.opacity = '1';

        if (btnShowAntes) {
          btnShowAntes.className = "px-3.5 sm:px-4 py-1 text-xs font-bold rounded-full transition-all duration-300 bg-[#C5A880] text-stone-950 shadow-md cursor-pointer";
        }
        if (btnShowDepois) {
          btnShowDepois.className = "px-3.5 sm:px-4 py-1 text-xs font-semibold rounded-full transition-all duration-300 text-stone-300 hover:text-white cursor-pointer";
        }

        if (badgeState) {
          badgeState.className = "flex items-center gap-1.5 bg-stone-900/90 text-[#C5A880] border border-[#C5A880]/30 text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-md shadow-lg transition-all duration-300";
        }
        if (badgeStateDot) {
          badgeStateDot.className = "w-2 h-2 rounded-full bg-[#C5A880]";
        }
        if (badgeStateText) {
          badgeStateText.textContent = "Antes (Original)";
        }
        if (captionDescription) {
          captionDescription.textContent = "Imóvel irregular antes da consultoria e projeto de adequação";
        }
      }
    };

    // Ações de clique exclusivas e limpas
    if (btnShowAntes) {
      btnShowAntes.addEventListener('click', (e) => {
        e.stopPropagation();
        setView(false);
      });
    }

    if (btnShowDepois) {
      btnShowDepois.addEventListener('click', (e) => {
        e.stopPropagation();
        setView(true);
      });
    }

    if (btnQuickToggle) {
      btnQuickToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setView(!isShowingDepois);
      });
    }

    // Clique direto no card também alterna de forma rápida
    card.addEventListener('click', () => {
      setView(!isShowingDepois);
    });
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

    const wpFabiolaGreeting = document.getElementById('wpFabiolaGreeting');
    if (wpFabiolaGreeting) {
      const firstName = (orderState.nome && orderState.nome !== 'Visitante' && orderState.nome !== 'Cliente')
        ? orderState.nome.trim().split(' ')[0]
        : 'Visitante';
      wpFabiolaGreeting.innerText = `Oi, ${firstName}!`;
    }

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
  let bairroClearedOnce = false;
  if (bairroInput) {
    bairroInput.addEventListener('focus', () => {
      if (!bairroClearedOnce && bairroInput.value === 'Marco') {
        bairroInput.value = '';
        bairroClearedOnce = true;
      }
    });
    bairroInput.addEventListener('input', (e) => {
      bairroClearedOnce = true;
      orderState.bairro = e.target.value || 'Belém';
      updatePhoneMockup();
    });
  }

  const nameInput = document.getElementById('orderNameInput');
  const nameCta = document.getElementById('orderNameCta');
  let nameClearedOnce = false;

  if (nameInput) {
    nameInput.addEventListener('focus', () => {
      if (!nameClearedOnce && nameInput.value === 'Ana Souza') {
        nameInput.value = '';
        nameClearedOnce = true;
        if (nameCta) nameCta.style.opacity = '0';
        orderState.nome = '';
        updatePhoneMockup();
      } else if (nameCta) {
        nameCta.style.opacity = '0';
      }
    });

    nameInput.addEventListener('input', (e) => {
      nameClearedOnce = true;
      if (nameCta) nameCta.style.opacity = '0';
      orderState.nome = e.target.value.trim() || 'Visitante';
      updatePhoneMockup();
    });

    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim() && !nameClearedOnce) {
        nameInput.value = 'Ana Souza';
        if (nameCta) nameCta.style.opacity = '1';
        orderState.nome = 'Ana Souza';
        updatePhoneMockup();
      }
    });
  }

  updatePhoneMockup();

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
