// document.addEventListener('DOMContentLoaded', function () {
//     const galleryItems = [];

//     // Generate 100 sample items
//     for (let i = 1; i <= 100; i++) {
//         galleryItems.push({
//             id: i,
//             src: `../../assets/images/gallery/gallery_img_${i}.jpg`,
//             category: category,
//             alt: `Gallery photo ${i}`
//         });
//     }

//     let currentPage = 1;
//     const itemsPerPage = 20;
//     let filteredItems = [...galleryItems];
//     let currentFilter = 'all';
//     let currentIndex = 0;

//     // Initialize gallery
//     loadGalleryItems(filteredItems.slice(0, itemsPerPage));

//     // Load more button
//     document.getElementById('loadMoreBtn').addEventListener('click', function () {
//         currentPage++;
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         const nextItems = filteredItems.slice(startIndex, endIndex);

//         if (nextItems.length > 0) {
//             loadGalleryItems(nextItems, true);
//         }

//         if (endIndex >= filteredItems.length) {
//             this.style.display = 'none';
//         }
//     });

//     // Lightbox functionality
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImg = document.getElementById('lightboxImg');
//     const lightboxClose = document.getElementById('lightboxClose');
//     const lightboxPrev = document.getElementById('lightboxPrev');
//     const lightboxNext = document.getElementById('lightboxNext');

//     // Open lightbox
//     function openLightbox(src, index) {
//         lightboxImg.src = src;
//         currentIndex = index;
//         lightbox.classList.add('active');
//         document.body.style.overflow = 'hidden';
//     }

//     // Close lightbox
//     lightboxClose.addEventListener('click', function () {
//         lightbox.classList.remove('active');
//         document.body.style.overflow = '';
//     });

//     // Navigate lightbox
//     lightboxPrev.addEventListener('click', function () {
//         if (currentIndex > 0) {
//             currentIndex--;
//             lightboxImg.src = filteredItems[currentIndex].src;
//         }
//     });

//     lightboxNext.addEventListener('click', function () {
//         if (currentIndex < filteredItems.length - 1) {
//             currentIndex++;
//             lightboxImg.src = filteredItems[currentIndex].src;
//         }
//     });

//     // Close lightbox on outside click
//     lightbox.addEventListener('click', function (e) {
//         if (e.target === lightbox) {
//             lightbox.classList.remove('active');
//             document.body.style.overflow = '';
//         }
//     });

//     // Key navigation for lightbox
//     document.addEventListener('keydown', function (e) {
//         if (!lightbox.classList.contains('active')) return;

//         if (e.key === 'Escape') {
//             lightbox.classList.remove('active');
//             document.body.style.overflow = '';
//         } else if (e.key === 'ArrowLeft') {
//             lightboxPrev.click();
//         } else if (e.key === 'ArrowRight') {
//             lightboxNext.click();
//         }
//     });

//     // Function to load gallery items
//     function loadGalleryItems(items, append = false) {
//         const galleryGrid = document.getElementById('galleryGrid');

//         items.forEach((item, index) => {
//             const galleryItem = document.createElement('div');
//             galleryItem.className = 'gallery-item';
//             galleryItem.setAttribute('data-category', item.category);

//             galleryItem.innerHTML = `
//              <img src="${item.src}" alt="${item.alt}">
//              <div class="gallery-item-overlay">
//                  <i class="fas fa-search-plus"></i>
//              </div>
//          `;

//             // Add click event to open lightbox
//             galleryItem.addEventListener('click', function () {
//                 const actualIndex = filteredItems.findIndex(fItem => fItem.id === item.id);
//                 openLightbox(item.src, actualIndex);
//             });

//             if (append) {
//                 galleryGrid.appendChild(galleryItem);
//             } else {
//                 galleryGrid.innerHTML += galleryItem.outerHTML;
//             }
//         });

//         // Add click events for appended items
//         if (append) {
//             // No additional setup needed as events are added during creation
//         } else {
//             document.querySelectorAll('.gallery-item').forEach((item, index) => {
//                 item.addEventListener('click', function () {
//                     const src = this.querySelector('img').src;
//                     openLightbox(src, index);
//                 });
//             });
//         }
//     }

//     // Set first category as active by default
//     document.querySelector('.category-chip[data-category="all"]').style.backgroundColor = 'var(--accent-orange)';
//     document.querySelector('.category-chip[data-category="all"]').style.color = 'white';
// });

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = [];

    // Generate 100 sample items
    for (let i = 1; i <= 100; i++) {
        galleryItems.push({
            id: i,
            src: `../../assets/images/gallery/gallery_img_${i}.jpg`,
            category: 'all',
            alt: `Gallery photo ${i}`
        });
    }

    let currentPage = 1;
    const itemsPerPage = 20;
    let filteredItems = [...galleryItems];
    let currentIndex = 0;
    let visibleItems = [];

    // Load initial items
    loadGalleryItems(filteredItems.slice(0, itemsPerPage));

    // Load more button
    document.getElementById('loadMoreBtn').addEventListener('click', function () {
        currentPage++;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const nextItems = filteredItems.slice(startIndex, endIndex);

        if (nextItems.length > 0) {
            loadGalleryItems(nextItems, true);
        }

        if (endIndex >= filteredItems.length) {
            this.style.display = 'none';
        }
    });

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // Open lightbox
    function openLightbox(src, index) {
        lightboxImg.src = src;
        currentIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        lightboxPrev.style.display = (index === 0) ? 'none' : 'block';
        lightboxNext.style.display = (index === visibleItems.length - 1) ? 'none' : 'block';
    }

    // Close lightbox
    lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Lightbox navigation
    lightboxPrev.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            lightboxImg.src = visibleItems[currentIndex].src;
            openLightbox(visibleItems[currentIndex].src, currentIndex);
        }
    });

    lightboxNext.addEventListener('click', function () {
        if (currentIndex < visibleItems.length - 1) {
            currentIndex++;
            lightboxImg.src = visibleItems[currentIndex].src;
            openLightbox(visibleItems[currentIndex].src, currentIndex);
        }
    });

    // Key navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    });

    // Load gallery items
    function loadGalleryItems(items, append = false) {
        const galleryGrid = document.getElementById('galleryGrid');

        if (!append) {
            galleryGrid.innerHTML = '';
            visibleItems = [];
        }

        items.forEach((item) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);

            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.alt}">
                <div class="gallery-item-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;

            galleryItem.addEventListener('click', function () {
                const actualIndex = visibleItems.findIndex(fItem => fItem.id === item.id);
                openLightbox(item.src, actualIndex);
            });

            galleryGrid.appendChild(galleryItem);
            visibleItems.push(item);
        });
    }
});
