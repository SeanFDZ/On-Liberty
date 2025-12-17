// On Liberty & Power - Main JavaScript
// Article loading and pagination

const ARTICLES_PER_PAGE = 10;
let currentPage = 1;
let articles = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    await loadArticles();
    renderArticles();
    setupPagination();
  } catch (error) {
    showError('Unable to retrieve essays. Please refresh the page.');
    console.error('Init error:', error);
  }
}

async function loadArticles() {
  const response = await fetch('articles.json');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  // Sort by timestamp, newest first
  articles = (data.articles || []).sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
}

function renderArticles() {
  const main = document.getElementById('main-content');
  
  if (articles.length === 0) {
    main.innerHTML = `
      <div class="empty-state">
        <p>No essays have yet been published.</p>
        <p>Return anon, for new writings shall appear in due course.</p>
      </div>
    `;
    return;
  }
  
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(startIndex, endIndex);
  
  const html = pageArticles.map(article => createArticleCard(article)).join('');
  main.innerHTML = html;
}

function createArticleCard(article) {
  const date = formatDate(article.timestamp);
  const author = article.author || 'Anonymous';
  const hasImage = article.image && article.image.trim() !== '';
  const imageClass = hasImage ? '' : 'no-image';
  
  const imageHtml = hasImage ? `
    <div class="article-image">
      <img src="${escapeHtml(article.image)}" alt="" loading="lazy">
    </div>
  ` : '';
  
  const sourceHtml = article.sourceUrl ? `
    <div class="article-source">
      Occasioned by: <a href="${escapeHtml(article.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(article.source || 'Original Source')}</a>
    </div>
  ` : '';
  
  return `
    <article class="article-card ${imageClass}">
      ${imageHtml}
      <div class="article-content">
        <div class="article-meta">
          <span class="date">${date}</span>
          <span class="author"> • By ${escapeHtml(author)}</span>
        </div>
        <h2 class="article-headline">
          <a href="${escapeHtml(article.detailPage)}">${escapeHtml(article.headline)}</a>
        </h2>
        <p class="article-preview">${escapeHtml(article.preview)}</p>
        ${sourceHtml}
        <a href="${escapeHtml(article.detailPage)}" class="read-more">Continue reading ▸</a>
      </div>
    </article>
  `;
}

function setupPagination() {
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const pagination = document.getElementById('pagination');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageInfo = document.getElementById('page-info');
  
  // Hide pagination if only one page
  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }
  
  pagination.style.display = 'block';
  
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderArticles();
      updatePaginationState();
      scrollToTop();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderArticles();
      updatePaginationState();
      scrollToTop();
    }
  });
  
  updatePaginationState();
}

function updatePaginationState() {
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageInfo = document.getElementById('page-info');
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showError(message) {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
