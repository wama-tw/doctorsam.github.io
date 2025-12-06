// ==========================
// 共用載入與工具
// ==========================

// 載入全站設定（nav／footer／logo）
async function loadSiteConfig() {
  const res = await fetch('data/site.json');
  if (!res.ok) throw new Error('無法載入 site.json');
  return res.json();
}

// 載入單頁 JSON（首頁／醫師介紹／醫病互動）
async function loadPageJson(pageId) {
  let filename = null;

  if (pageId === 'home') filename = 'home.json';
  else if (pageId === 'doctor') filename = 'doctor.json';
  else if (pageId === 'interaction') filename = 'interaction.json';
  else return null;

  const res = await fetch(`data/${filename}`);
  if (!res.ok) throw new Error(`無法載入 ${filename}`);
  return res.json();
}

// 載入病症說明的分類 index
async function loadDiseaseIndex() {
  const res = await fetch('data/disease/index.json');
  if (!res.ok) throw new Error('無法載入 disease/index.json');
  return res.json();
}

// 載入醫療諮詢頁設定
async function loadConsultPage() {
  const res = await fetch('data/consult.json');
  if (!res.ok) throw new Error('無法載入 consult.json');
  return res.json();
}

// 載入常見問題頁設定
async function loadFaqPage() {
  const res = await fetch('data/faq.json');
  if (!res.ok) throw new Error('無法載入 faq.json');
  return res.json();
}

// Header & Footer
function renderHeaderAndFooter(siteConfig) {
  const site = siteConfig;
  const footer = site.footer;

  const logoEl = document.getElementById('site-logo-text');
  if (logoEl) logoEl.textContent = site.logoText || site.title || '';

  const navList = document.getElementById('nav-list');
  if (navList && Array.isArray(site.nav)) {
    navList.innerHTML = '';
    site.nav.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.label;
      li.appendChild(a);
      navList.appendChild(li);
    });
  }

  const langSwitch = document.getElementById('lang-switch');
  if (langSwitch && Array.isArray(site.languages)) {
    langSwitch.innerHTML = site.languages
      .map((l) => `<a href="${l.url}">${l.label}</a>`)
      .join(' / ');
  }

  if (footer) {
    const contactTitle = document.getElementById('footer-contact-title');
    const contact = document.getElementById('footer-contact');
    const linksTitle = document.getElementById('footer-links-title');
    const links = document.getElementById('footer-links');
    const registerTitle = document.getElementById('footer-register-title');
    const register = document.getElementById('footer-register');
    const copy = document.getElementById('footer-copy');

    if (contactTitle) contactTitle.textContent = footer.contactTitle || '';
    if (contact && footer.contact) {
      const c = footer.contact;
      contact.innerHTML = `
        聯絡信箱：<a href="mailto:${c.email}">${c.email}</a><br />
        聯絡電話：${c.phone}<br />
        <a href="${c.line.url}" target="_blank">${c.line.label}</a> ${
        c.note || ''
      }
      `;
    }

    if (linksTitle) linksTitle.textContent = footer.linksTitle || '';
    if (links && Array.isArray(footer.links)) {
      links.innerHTML = '';
      footer.links.forEach((item) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.target = '_blank';
        a.textContent = item.label;
        li.appendChild(a);
        links.appendChild(li);
      });
    }

    if (registerTitle) registerTitle.textContent = footer.registerTitle || '';
    if (register && Array.isArray(footer.registerItems)) {
      register.innerHTML = '';
      footer.registerItems.forEach((item) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.target = '_blank';
        a.textContent = item.label;
        li.appendChild(a);
        register.appendChild(li);
      });
    }

    if (copy) copy.textContent = footer.copyright || '';
  }
}

// 麵包屑
function renderBreadcrumb(items) {
  const bcEl = document.getElementById('breadcrumb');
  if (!bcEl || !items) return;

  bcEl.innerHTML = items
    .map((item, index) => {
      if (index === items.length - 1) {
        return `<span>${item.label}</span>`;
      }
      return `<a href="${item.url}">${item.label}</a>`;
    })
    .join(' / ');
}

// 通用 section renderer（text / list）
function renderSections(sections, containerEl) {
  if (!containerEl || !Array.isArray(sections)) return;
  containerEl.innerHTML = '';

  sections.forEach((sec) => {
    const secEl = document.createElement('section');
    secEl.className = 'content-section';

    if (sec.title && sec.title.trim() !== '') {
      const h2 = document.createElement('h2');
      h2.textContent = sec.title;
      secEl.appendChild(h2);
    }

    if (sec.type === 'text' && Array.isArray(sec.paragraphs)) {
      sec.paragraphs.forEach((text) => {
        const p = document.createElement('p');
        p.textContent = text;
        secEl.appendChild(p);
      });
    }

    if (sec.type === 'list' && Array.isArray(sec.items)) {
      const ul = document.createElement('ul');
      sec.items.forEach((itemText) => {
        const li = document.createElement('li');
        li.textContent = itemText;
        ul.appendChild(li);
      });
      secEl.appendChild(ul);
    }

    containerEl.appendChild(secEl);
  });
}

// ==========================
// 首頁（home）
// ==========================

function renderHomePage(homeJson) {
  // Hero
  const heroEl = document.querySelector('#home-hero .container');
  if (heroEl && homeJson.hero) {
    heroEl.innerHTML = '';
    if (Array.isArray(homeJson.hero.lines)) {
      homeJson.hero.lines.forEach((text, index) => {
        if (index === 0) {
          const h1 = document.createElement('h1');
          h1.textContent = text;
          heroEl.appendChild(h1);
        } else {
          const p = document.createElement('p');
          p.textContent = text;
          heroEl.appendChild(p);
        }
      });
    }
  }

  // 醫師介紹
  const aboutEl = document.querySelector('#home-about .container');
  if (aboutEl && homeJson.aboutDoctor) {
    aboutEl.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = homeJson.aboutDoctor.title;
    aboutEl.appendChild(h2);

    (homeJson.aboutDoctor.description || []).forEach((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      aboutEl.appendChild(p);
    });

    if (homeJson.aboutDoctor.experienceTitle) {
      const h3 = document.createElement('h3');
      h3.textContent = homeJson.aboutDoctor.experienceTitle;
      aboutEl.appendChild(h3);
    }

    if (Array.isArray(homeJson.aboutDoctor.experience)) {
      const ul = document.createElement('ul');
      homeJson.aboutDoctor.experience.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      aboutEl.appendChild(ul);
    }
  }

  // 研究中心介紹（不再有 VIEW MORE 按鈕）
  const centerEl = document.querySelector('#home-center .container');
  if (centerEl && homeJson.centerIntro) {
    centerEl.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = homeJson.centerIntro.title;
    centerEl.appendChild(h2);

    const pSub = document.createElement('p');
    pSub.textContent = homeJson.centerIntro.subtitle;
    centerEl.appendChild(pSub);

    const statsWrap = document.createElement('div');
    statsWrap.className = 'home-stats';
    (homeJson.centerIntro.stats || []).forEach((s) => {
      const box = document.createElement('div');
      box.className = 'home-stat-box';

      const v = document.createElement('div');
      v.className = 'home-stat-value';
      v.textContent = s.value;

      const l = document.createElement('div');
      l.className = 'home-stat-label';
      l.textContent = s.label;

      box.appendChild(v);
      box.appendChild(l);
      statsWrap.appendChild(box);
    });
    centerEl.appendChild(statsWrap);
  }

  // 病症說明查詢指南 + 醫療諮詢按鈕
  const dEl = document.querySelector('#home-disease-guide .container');
  if (dEl && homeJson.diseaseGuide) {
    dEl.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = homeJson.diseaseGuide.title;
    dEl.appendChild(h2);

    (homeJson.diseaseGuide.description || []).forEach((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      dEl.appendChild(p);
    });

    const grid = document.createElement('div');
    grid.className = 'disease-grid';

    (homeJson.diseaseGuide.items || []).forEach((item) => {
      const card = document.createElement('a');
      card.className = 'disease-card';
      const catId = item.categoryId;
      card.href = catId
        ? `disease.html?category=${encodeURIComponent(catId)}`
        : '#';

      const label = document.createElement('div');
      label.className = 'disease-label';
      label.textContent = item.label;

      const title = document.createElement('div');
      title.className = 'disease-title';
      title.textContent = item.title;

      card.appendChild(label);
      card.appendChild(title);
      grid.appendChild(card);
    });

    dEl.appendChild(grid);

    // 醫療諮詢按鈕
    if (homeJson.diseaseGuide.consultButton) {
      const btnWrap = document.createElement('div');
      btnWrap.style.marginTop = '20px';

      const btn = document.createElement('a');
      btn.href = homeJson.diseaseGuide.consultButton.url || 'consult.html';
      btn.textContent = homeJson.diseaseGuide.consultButton.text || '醫療諮詢';
      btn.className = 'btn-link';

      btnWrap.appendChild(btn);
      dEl.appendChild(btnWrap);
    }
  }

  // 分享文字
  const sEl = document.querySelector('#home-sharing .container');
  if (sEl && homeJson.sharing) {
    sEl.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = homeJson.sharing.title;
    sEl.appendChild(h2);

    (homeJson.sharing.paragraphs || []).forEach((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      sEl.appendChild(p);
    });
  }

  // 醫病互動預覽（卡片直接開相對應文章頁）
  const interEl = document.querySelector('#home-interaction .container');
  if (interEl && homeJson.interactionPreview) {
    interEl.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = homeJson.interactionPreview.title;
    interEl.appendChild(h2);

    if (homeJson.interactionPreview.subtitle) {
      const p = document.createElement('p');
      p.textContent = homeJson.interactionPreview.subtitle;
      interEl.appendChild(p);
    }

    const list = document.createElement('div');
    list.className = 'interaction-cards';

    (homeJson.interactionPreview.cards || []).forEach((cardData) => {
      const section = cardData.section || 'interaction';
      const articleId = cardData.articleId;
      const url = articleId
        ? `article.html?section=${encodeURIComponent(
            section
          )}&id=${encodeURIComponent(articleId)}`
        : '#';

      const card = document.createElement('a');
      card.href = url;
      card.className = 'interaction-card';

      const title = document.createElement('h3');
      title.textContent = cardData.title;

      const date = document.createElement('div');
      date.className = 'interaction-date';
      date.textContent = cardData.date || '';

      const desc = document.createElement('p');
      desc.textContent = cardData.description || '';

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(desc);

      list.appendChild(card);
    });

    interEl.appendChild(list);
  }
}

// ==========================
// 醫師介紹等單純內文頁（doctor）
// ==========================

function renderSimplePage(pageJson) {
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = pageJson.title;

  renderBreadcrumb(pageJson.breadcrumb);

  const contentEl = document.getElementById('page-content');
  renderSections(pageJson.sections, contentEl);
}

// ==========================
// 醫病互動列表頁（interaction）
// ==========================

async function renderInteractionPage(pageJson) {
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = pageJson.title;

  renderBreadcrumb(pageJson.breadcrumb);

  // intro
  const introEl = document.getElementById('page-intro');
  if (introEl && pageJson.intro) {
    introEl.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = pageJson.intro.title;
    introEl.appendChild(h2);

    (pageJson.intro.paragraphs || []).forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      introEl.appendChild(p);
    });
  }

  const listEl = document.getElementById('article-list');
  if (!listEl) return;

  const idxRes = await fetch('data/interactionArticles/index.json');
  const idxJson = await idxRes.json();
  const ids = idxJson.articleIds || [];

  listEl.innerHTML = '';

  for (const id of ids) {
    const artRes = await fetch(`data/interactionArticles/${id}.json`);
    if (!artRes.ok) continue;
    const article = await artRes.json();

    const item = document.createElement('article');
    item.className = 'article-item';

    const link = `article.html?section=interaction&id=${encodeURIComponent(
      article.id
    )}`;

    item.innerHTML = `
      <h2><a href="${link}">${article.title}</a></h2>
      <p class="article-date">${article.date || ''}</p>
      <p class="article-excerpt">${article.excerpt || ''}</p>
      ${article.type === 'youtube' ? `<p class="article-tag">影片</p>` : ''}
    `;
    listEl.appendChild(item);
  }
}

// ==========================
// 病症說明分類頁（disease）
// ==========================

async function renderDiseasePage() {
  const idx = await loadDiseaseIndex();
  const categories = idx.categories || [];
  if (!categories.length) return;

  const params = new URLSearchParams(window.location.search);
  let activeId = params.get('category');
  if (!activeId) {
    activeId = categories[0].id; // 預設第一個分類
  }

  // 左側分類列表
  const listEl = document.getElementById('disease-category-list');
  if (listEl) {
    listEl.innerHTML = '';
    categories.forEach((cat) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `disease.html?category=${encodeURIComponent(cat.id)}`;
      a.textContent = cat.label;
      if (cat.id === activeId) {
        a.classList.add('active');
      }
      li.appendChild(a);
      listEl.appendChild(li);
    });
  }

  const activeCat = categories.find((c) => c.id === activeId) || categories[0];

  const titleEl = document.getElementById('disease-category-title');
  if (titleEl) titleEl.textContent = activeCat.label;

  const descEl = document.getElementById('disease-category-desc');
  if (descEl) descEl.textContent = activeCat.description || '';

  const bc = [
    { label: '首頁', url: 'index.html' },
    { label: '病症說明', url: 'disease.html' },
    {
      label: activeCat.label,
      url: `disease.html?category=${encodeURIComponent(activeCat.id)}`,
    },
  ];
  renderBreadcrumb(bc);

  // 該分類底下文章列表
  const articleListEl = document.getElementById('disease-article-list');
  if (!articleListEl) return;

  articleListEl.innerHTML = '';

  for (const articleId of activeCat.articleIds || []) {
    const res = await fetch(`data/diseaseArticles/${articleId}.json`);
    if (!res.ok) continue;
    const art = await res.json();

    const item = document.createElement('article');
    item.className = 'article-item';

    const link = `article.html?section=disease&id=${encodeURIComponent(
      art.id
    )}`;
    item.innerHTML = `
      <h2><a href="${link}">${art.title}</a></h2>
      <p class="article-date">${art.date || ''}</p>
      <p class="article-excerpt">${art.excerpt || ''}</p>
    `;
    articleListEl.appendChild(item);
  }
}

// ==========================
// 醫療諮詢列表頁（consult）
// ==========================

async function renderConsultPage() {
  const pageJson = await loadConsultPage();
  if (!pageJson) return;

  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = pageJson.title;

  renderBreadcrumb(pageJson.breadcrumb);

  const introEl = document.getElementById('page-intro');
  if (introEl && pageJson.intro) {
    introEl.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = pageJson.intro.title;
    introEl.appendChild(h2);

    (pageJson.intro.paragraphs || []).forEach((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      introEl.appendChild(p);
    });
  }

  const listEl = document.getElementById('consult-article-list');
  if (!listEl) return;

  const idxRes = await fetch('data/consultArticles/index.json');
  const idxJson = await idxRes.json();
  const ids = idxJson.articleIds || [];

  listEl.innerHTML = '';

  for (const id of ids) {
    const res = await fetch(`data/consultArticles/${id}.json`);
    if (!res.ok) continue;
    const art = await res.json();

    const item = document.createElement('article');
    item.className = 'article-item';

    const link = `article.html?section=consult&id=${encodeURIComponent(
      art.id
    )}`;
    item.innerHTML = `
      <h2><a href="${link}">${art.title}</a></h2>
      <p class="article-date">${art.date || ''}</p>
      <p class="article-excerpt">${art.excerpt || ''}</p>
    `;
    listEl.appendChild(item);
  }
}

// ==========================
// 常見問題頁（faq）
// ==========================

async function renderFaqPage() {
  const faqJson = await loadFaqPage();
  const categories = faqJson.categories || [];
  if (!categories.length) return;

  const params = new URLSearchParams(window.location.search);
  let activeId = params.get('category');
  if (!activeId) {
    activeId = categories[0].id;
  }

  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = faqJson.title || '常見問題';

  const activeCat =
    categories.find((c) => c.id === activeId) || categories[0];

  const bcItems = [
    ...(faqJson.breadcrumb || [
      { label: '首頁', url: 'index.html' },
      { label: '常見問題', url: 'faq.html' },
    ]),
    {
      label: activeCat.label,
      url: `faq.html?category=${encodeURIComponent(activeCat.id)}`,
    },
  ];
  renderBreadcrumb(bcItems);

  const catListEl = document.getElementById('faq-category-list');
  if (catListEl) {
    catListEl.innerHTML = '';
    categories.forEach((cat) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `faq.html?category=${encodeURIComponent(cat.id)}`;
      a.textContent = cat.label;
      if (cat.id === activeId) {
        a.classList.add('active');
      }
      li.appendChild(a);
      catListEl.appendChild(li);
    });
  }

  const introEl = document.getElementById('faq-intro');
  if (introEl) {
    introEl.innerHTML = '';
    if (faqJson.intro) {
      if (faqJson.intro.title) {
        const h2 = document.createElement('h2');
        h2.textContent = faqJson.intro.title;
        introEl.appendChild(h2);
      }
      (faqJson.intro.paragraphs || []).forEach((t) => {
        const p = document.createElement('p');
        p.textContent = t;
        introEl.appendChild(p);
      });
    }
  }

  const faqListEl = document.getElementById('faq-list');
  if (!faqListEl) return;

  faqListEl.innerHTML = '';
  (activeCat.items || []).forEach((qa) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'faq-item';

    const qEl = document.createElement('h3');
    qEl.className = 'faq-question';
    qEl.textContent = qa.question;

    const ansEl = document.createElement('div');
    ansEl.className = 'faq-answer';

    (qa.answer || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      ansEl.appendChild(p);
    });

    itemEl.appendChild(qEl);
    itemEl.appendChild(ansEl);
    faqListEl.appendChild(itemEl);
  });
}

// ==========================
// 單篇文章共用頁（article）
// ==========================

async function renderArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const section = params.get('section') || 'interaction';

  const folderMap = {
    interaction: 'interactionArticles',
    disease: 'diseaseArticles',
    consult: 'consultArticles',
  };
  const folder = folderMap[section] || 'interactionArticles';

  if (!id) return;

  const res = await fetch(`data/${folder}/${id}.json`);
  if (!res.ok) {
    const contentEl = document.getElementById('article-content');
    if (contentEl) contentEl.textContent = '找不到這篇文章。';
    return;
  }
  const article = await res.json();

  const titleEl = document.getElementById('article-title');
  const dateEl = document.getElementById('article-date');
  const contentEl = document.getElementById('article-content');
  const youtubeEl = document.getElementById('article-youtube');

  if (titleEl) titleEl.textContent = article.title;
  if (dateEl) dateEl.textContent = article.date || '';

  let breadcrumbItems = [{ label: '首頁', url: 'index.html' }];

  if (section === 'interaction') {
    breadcrumbItems.push({ label: '醫病互動', url: 'interaction.html' });
  } else if (section === 'disease') {
    breadcrumbItems.push({ label: '病症說明', url: 'disease.html' });
  } else if (section === 'consult') {
    breadcrumbItems.push({ label: '醫療諮詢', url: 'consult.html' });
  }

  breadcrumbItems.push({
    label: article.title,
    url: `article.html?section=${encodeURIComponent(
      section
    )}&id=${encodeURIComponent(id)}`,
  });

  renderBreadcrumb(breadcrumbItems);

  renderSections(article.sections, contentEl);

  if (youtubeEl) {
    if (article.type === 'youtube' && article.youtubeId) {
      const src = `https://www.youtube.com/embed/${article.youtubeId}`;
      youtubeEl.innerHTML = `
        <div class="youtube-wrapper">
          <iframe src="${src}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    } else {
      youtubeEl.innerHTML = '';
    }
  }
}

// ==========================
// Sticky header 陰影
// ==========================

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==========================
// 初始化
// ==========================

document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const pageId = body.getAttribute('data-page');

  try {
    const siteConfig = await loadSiteConfig();
    renderHeaderAndFooter(siteConfig);

    if (pageId === 'home') {
      const homeJson = await loadPageJson('home');
      if (homeJson) renderHomePage(homeJson);
    } else if (pageId === 'doctor') {
      const pageJson = await loadPageJson('doctor');
      if (pageJson) renderSimplePage(pageJson);
    } else if (pageId === 'interaction') {
      const pageJson = await loadPageJson('interaction');
      if (pageJson) await renderInteractionPage(pageJson);
    } else if (pageId === 'disease') {
      await renderDiseasePage();
    } else if (pageId === 'consult') {
      await renderConsultPage();
    } else if (pageId === 'faq') {
      await renderFaqPage();
    } else if (pageId === 'article') {
      await renderArticlePage();
    }
  } catch (e) {
    console.error(e);
  }
});
