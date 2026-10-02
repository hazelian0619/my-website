(() => {
  const pdfViewers = [
    {
      pdfUrl: 'files/academic/AI%20%26Chinese%20Liberal%20Arts%20Women.pdf',
      containerId: 'pdf-container-ai-women',
      thumbnailsId: 'pdf-thumbnails-ai-women',
      fallbackId: 'pdf-fallback-ai-women',
      hoverPreviewId: 'pdf-hover-preview-ai-women',
      hoverImgId: 'hover-preview-img-ai-women',
      hoverTitleId: 'hover-preview-title-ai-women',
    },
    {
      pdfUrl: 'files/academic/Graphcloud.pdf',
      containerId: 'pdf-container-graphcloud',
      thumbnailsId: 'pdf-thumbnails-graphcloud',
      fallbackId: 'pdf-fallback-graphcloud',
      hoverPreviewId: 'pdf-hover-preview-graphcloud',
      hoverImgId: 'hover-preview-img-graphcloud',
      hoverTitleId: 'hover-preview-title-graphcloud',
    },
    {
      pdfUrl: 'files/academic/TBC-DDH.pdf',
      containerId: 'pdf-container-hipgo-research',
      thumbnailsId: 'pdf-thumbnails-hipgo-research',
      fallbackId: 'pdf-fallback-hipgo-research',
      hoverPreviewId: 'pdf-hover-preview-hipgo-research',
      hoverImgId: 'hover-preview-img-hipgo-research',
      hoverTitleId: 'hover-preview-title-hipgo-research',
    },
    {
      pdfUrl: 'files/academic/HipGO.pdf',
      containerId: 'pdf-container-tbc-ddh',
      thumbnailsId: 'pdf-thumbnails-tbc-ddh',
      fallbackId: 'pdf-fallback-tbc-ddh',
      hoverPreviewId: 'pdf-hover-preview-tbc-ddh',
      hoverImgId: 'hover-preview-img-tbc-ddh',
      hoverTitleId: 'hover-preview-title-tbc-ddh',
    },
    {
      pdfUrl: 'metapher-as-ciphertext.pdf',
      containerId: 'pdf-container',
      thumbnailsId: 'pdf-thumbnails',
      fallbackId: 'pdf-fallback',
      hoverPreviewId: 'pdf-hover-preview',
      hoverImgId: 'hover-preview-img',
      hoverTitleId: 'hover-preview-title',
    },
    {
      pdfUrl: 'files/academic/Chinese-in-Third-World.pdf',
      containerId: 'pdf-container-cultural',
      thumbnailsId: 'pdf-thumbnails-cultural',
      fallbackId: 'pdf-fallback-cultural',
      hoverPreviewId: null,
      hoverImgId: null,
      hoverTitleId: null,
    },
    // Retain the original BookDone mapping; this page has no matching PDF.js thumbnail target.
    {
      pdfUrl: 'files/academic/0908Bookdone.pdf',
      containerId: '',
      thumbnailsId: 'pdf-thumbnails-bookdone',
      fallbackId: 'pdf-fallback-bookdone',
      hoverPreviewId: '',
      hoverImgId: '',
      hoverTitleId: '',
    },
  ];

  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cardsByViewer = new Map();

  function setState(card, state) {
    if (card) card.dataset.researchPdfState = state;
  }

  function showFallback(fallbackElement) {
    if (fallbackElement) fallbackElement.classList.remove('hidden');
  }

  function setupPdfViewer(options, card) {
    const thumbnailList = document.getElementById(options.thumbnailsId);
    const loadingElement = document.querySelector(`#${options.containerId} .text-sm`);
    const fallbackElement = document.getElementById(options.fallbackId);
    const hoverPreview = options.hoverPreviewId
      ? document.getElementById(options.hoverPreviewId)
      : null;
    const hoverPreviewImg = options.hoverImgId
      ? document.getElementById(options.hoverImgId)
      : null;
    const hoverPreviewTitle = options.hoverTitleId
      ? document.getElementById(options.hoverTitleId)
      : null;
    let hoverRequestId = 0;

    // Fixed-position hover panels use viewport coordinates, so keep them out of
    // transformed preview cards that would otherwise become their containing block.
    if (hoverPreview && hoverPreview.parentElement !== document.body) {
      document.body.appendChild(hoverPreview);
    }

    function handleError(error) {
      console.error(`Error loading PDF (${options.pdfUrl}):`, error);
      if (loadingElement) {
        loadingElement.innerHTML = '<div class="text-red-500">Could not load PDF preview</div>';
      }
      showFallback(fallbackElement);
      setState(card, 'error');
    }

    if (!thumbnailList || !window.pdfjsLib) {
      handleError(new Error('The PDF preview or PDF.js library is unavailable.'));
      return;
    }

    setState(card, 'loading');
    window.pdfjsLib.getDocument({
      url: options.pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    }).promise.then((pdf) => {
      if (loadingElement) loadingElement.remove();

      let pagesRendered = 0;
      let hasPageError = false;
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
        pdf.getPage(pageNum).then((page) => {
          const originalViewport = page.getViewport({ scale: 1 });
          const availableWidth = Math.max(1, Math.min(230, thumbnailList.clientWidth - 16));
          const viewport = page.getViewport({ scale: availableWidth / originalViewport.width });

          const thumbContainer = document.createElement('div');
          thumbContainer.className = 'relative max-w-full rounded-lg border border-gray-200 hover:border-emerald-500 transition-all duration-300 hover:shadow-md cursor-pointer bg-white overflow-hidden transform hover:scale-105 transition-transform duration-300';
          thumbContainer.style.width = `${availableWidth}px`;
          thumbContainer.dataset.page = String(pageNum);
          thumbContainer.setAttribute('role', 'link');
          thumbContainer.tabIndex = 0;
          thumbContainer.setAttribute('aria-label', `Open page ${pageNum} of the PDF`);

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = 'mx-auto max-w-full';

          const pageLabel = document.createElement('div');
          pageLabel.className = 'absolute bottom-1 right-2 bg-white/80 text-xs px-2 py-0.5 rounded-full text-emerald-700 font-light';
          pageLabel.textContent = `Page ${pageNum}`;

          thumbContainer.append(canvas, pageLabel);
          thumbnailList.appendChild(thumbContainer);

          const openPage = () => window.open(`${options.pdfUrl}#page=${pageNum}`, '_blank', 'noopener');
          thumbContainer.addEventListener('click', openPage);
          thumbContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openPage();
            }
          });

          if (fineHover.matches && hoverPreview && hoverPreviewImg && hoverPreviewTitle) {
            thumbContainer.addEventListener('pointerenter', (event) => {
              if (event.pointerType !== 'mouse' || !fineHover.matches) return;
              const requestId = ++hoverRequestId;
              pdf.getPage(pageNum).then((previewPage) => {
                const previewViewport = previewPage.getViewport({ scale: 1.5 });
                const previewCanvas = document.createElement('canvas');
                const previewContext = previewCanvas.getContext('2d');
                previewCanvas.width = previewViewport.width;
                previewCanvas.height = previewViewport.height;

                previewPage.render({
                  canvasContext: previewContext,
                  viewport: previewViewport,
                  intent: 'display',
                  renderInteractiveForms: false,
                }).promise.then(() => {
                  if (requestId !== hoverRequestId || !thumbContainer.matches(':hover')) return;
                  hoverPreviewImg.src = previewCanvas.toDataURL('image/jpeg', 0.95);
                  hoverPreviewTitle.textContent = `Page ${pageNum} Preview`;

                  const rect = thumbContainer.getBoundingClientRect();
                  const margin = 16;
                  const gap = 16;
                  const spaceRight = window.innerWidth - rect.right - margin - gap;
                  const spaceLeft = rect.left - margin - gap;
                  const placeRight = spaceRight >= spaceLeft;
                  const previewWidth = Math.max(0, Math.min(500, placeRight ? spaceRight : spaceLeft));
                  hoverPreview.style.width = `${previewWidth}px`;
                  hoverPreview.classList.remove('hidden');
                  const previewHeight = hoverPreview.getBoundingClientRect().height;
                  const previewLeft = placeRight ? rect.right + gap : rect.left - gap - previewWidth;
                  hoverPreview.style.left = `${Math.max(margin, Math.min(previewLeft, window.innerWidth - previewWidth - margin))}px`;
                  hoverPreview.style.top = `${Math.max(16, Math.min(rect.top - 100, window.innerHeight - previewHeight - 16))}px`;
                  hoverPreview.style.transform = 'scale(1)';
                }).catch(handleError);
              }).catch(handleError);
            });
            thumbContainer.addEventListener('pointerleave', (event) => {
              if (event.pointerType === 'mouse') {
                hoverRequestId += 1;
                hoverPreview.classList.add('hidden');
              }
            });
          }

          page.render({ canvasContext: context, viewport }).promise.then(() => {
            pagesRendered += 1;
            if (pagesRendered === pdf.numPages && !hasPageError) setState(card, 'loaded');
          }).catch((error) => {
            hasPageError = true;
            handleError(error);
          });
        }).catch((error) => {
          hasPageError = true;
          handleError(error);
        });
      }
    }).catch(handleError);
  }

  function initializeResearchPdfViewers() {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    }

    const pending = pdfViewers.map((options) => {
      const thumbnails = document.getElementById(options.thumbnailsId);
      const card = thumbnails && thumbnails.closest('[data-research-pdf-card]');
      if (!card) return null;

      setState(card, 'idle');
      const viewer = { options, card };
      cardsByViewer.set(card, viewer);
      return viewer;
    }).filter(Boolean);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const viewer = cardsByViewer.get(entry.target);
          if (!viewer) return;
          observer.unobserve(entry.target);
          setupPdfViewer(viewer.options, viewer.card);
          cardsByViewer.delete(entry.target);
        });
      }, { rootMargin: '400px 0px' });
      pending.forEach(({ card }) => observer.observe(card));
      return;
    }

    let checkQueued = false;
    const checkNearbyCards = () => {
      checkQueued = false;
      cardsByViewer.forEach((viewer, card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight + 400 && rect.bottom >= -400) {
          setupPdfViewer(viewer.options, card);
          cardsByViewer.delete(card);
        }
      });
    };
    const queueCheck = () => {
      if (checkQueued) return;
      checkQueued = true;
      window.requestAnimationFrame(checkNearbyCards);
    };
    window.addEventListener('scroll', queueCheck, { passive: true });
    window.addEventListener('resize', queueCheck);
    checkNearbyCards();
  }

  if (window.pdfjsLib) initializeResearchPdfViewers();
  else document.addEventListener('DOMContentLoaded', initializeResearchPdfViewers, { once: true });
})();
