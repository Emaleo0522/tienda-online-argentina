// Estado global de la aplicación
let currentSection = 'featured';
let currentEditingProduct = null;
let currentEditingStory = null;
let currentImageData = null;
let currentStoryImageData = null;
let products = {
    featured: [
        {
            id: 1,
            name: 'Auriculares Negro One',
            price: '$8.500',
            description: 'Auriculares con calidad de sonido excepcional y comodidad superior para uso prolongado.',
            image: 'https://i.postimg.cc/ydMgrWqS/feature1.png',
            badge: 'NUEVO'
        },
        {
            id: 2,
            name: 'Parlante Beats Pill',
            price: '$58.000',
            description: 'Parlante portátil con sonido potente y graves profundos. Perfecto para cualquier ocasión.',
            image: 'https://i.postimg.cc/PJbx34zB/feature2.png',
            badge: 'NUEVO'
        },
        {
            id: 3,
            name: 'Apple AirPods',
            price: '$36.000',
            description: 'Experiencia de audio inalámbrica premium con cancelación de ruido y calidad Apple.',
            image: 'https://i.postimg.cc/KvF4K6mF/feature3.png',
            badge: 'NUEVO'
        },
        {
            id: 4,
            name: 'Smart Watch F9 Negro',
            price: '$29.000',
            description: 'Reloj inteligente con múltiples funciones de salud y notificaciones. Diseño elegante y moderno.',
            image: 'https://i.postimg.cc/RZp0DqKV/feature4.png',
            badge: 'NUEVO'
        }
    ],
    new: [
        {
            id: 1,
            name: 'Producto Nuevo 1',
            image: 'https://i.postimg.cc/Hs5KNNMJ/new1.png',
            badge: ''
        },
        {
            id: 2,
            name: 'Producto Nuevo 2',
            image: 'https://i.postimg.cc/sXq66PD9/new2.png',
            badge: ''
        },
        {
            id: 3,
            name: 'Producto Nuevo 3',
            image: 'https://i.postimg.cc/rs4hvdD6/new3.png',
            badge: ''
        },
        {
            id: 4,
            name: 'Producto Nuevo 4',
            image: 'https://i.postimg.cc/sDFH5JL3/new4.png',
            badge: ''
        },
        {
            id: 5,
            name: 'Producto Nuevo 5',
            image: 'https://i.postimg.cc/Bnph9fnv/new5.png',
            badge: ''
        },
        {
            id: 6,
            name: 'Producto Nuevo 6',
            image: 'https://i.postimg.cc/SKtDRL8F/new6.png',
            badge: ''
        }
    ]
};

let stories = [
    {
        id: 1,
        image: 'https://i.postimg.cc/ydMgrWqS/feature1.png',
        order: 1
    },
    {
        id: 2,
        image: 'https://i.postimg.cc/PJbx34zB/feature2.png',
        order: 2
    },
    {
        id: 3,
        image: 'https://i.postimg.cc/KvF4K6mF/feature3.png',
        order: 3
    }
];

let storeSettings = {
    name: 'SARA',
    description: 'Tienda de Productos',
    heroTitle: 'NUEVOS PRODUCTOS',
    heroButton: 'IR DE COMPRAS',
    newsletterTitle: 'NEWSLETTER CERTIFICADO',
    newsletterDescription: 'Promociones exclusivas, noticias de productos y ventas especiales. Calidad garantizada directo a vos'
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    initializeNavigation();
    renderCurrentSection();
    loadStoreSettings();
});

// Navegación entre secciones
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(`${section}-section`).classList.add('active');
    currentSection = section;
    
    if (section === 'featured' || section === 'new') {
        renderProducts(section);
    } else if (section === 'stories') {
        renderStories();
    }
}

// Renderizar productos
function renderProducts(section) {
    const container = document.getElementById(`${section}-products`);
    const sectionProducts = products[section] || [];
    
    if (sectionProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class='bx bx-package'></i>
                <h3>No hay productos</h3>
                <p>Agregá tu primer producto haciendo clic en "Agregar Producto"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sectionProducts.map(product => `
        <div class="product-card">
            <div class="product-header">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${product.price ? `<span class="product-price">${product.price}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-edit" onclick="editProduct('${section}', ${product.id})" title="Editar">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${section}', ${product.id})" title="Eliminar">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            
            ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
            </div>
            
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
    `).join('');
}

function renderCurrentSection() {
    if (currentSection === 'featured' || currentSection === 'new') {
        renderProducts(currentSection);
    } else if (currentSection === 'stories') {
        renderStories();
    }
}

// Renderizar Instagram Stories
function renderStories() {
    const container = document.getElementById('stories-container');
    const sortedStories = stories.sort((a, b) => a.order - b.order);
    
    if (sortedStories.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class='bx bxl-instagram'></i>
                <h3>No hay historias</h3>
                <p>Agregá tu primera historia haciendo clic en "Agregar Historia"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sortedStories.map(story => `
        <div class="story-card">
            <div class="story-header">
                <div class="story-number">${story.order}</div>
                <div class="story-actions">
                    <button class="btn-edit" onclick="editStory(${story.id})" title="Editar">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-delete" onclick="deleteStory(${story.id})" title="Eliminar">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            
            <div class="story-preview">
                ${story.image ? 
                    `<img src="${story.image}" alt="Historia ${story.order}">` :
                    `<div class="story-preview-empty">
                        <i class='bx bx-image'></i>
                        <span>Sin imagen</span>
                    </div>`
                }
            </div>
            
            <div class="story-description">Historia ${story.order}</div>
        </div>
    `).join('');
}

// CRUD de productos
function addProduct(section) {
    currentEditingProduct = null;
    document.getElementById('modal-title').textContent = 'Agregar Producto';
    
    // Mostrar/ocultar campos según la sección
    const priceGroup = document.getElementById('product-price').parentElement;
    const descGroup = document.getElementById('product-description').parentElement;
    
    if (section === 'featured') {
        priceGroup.style.display = 'block';
        descGroup.style.display = 'block';
    } else {
        priceGroup.style.display = 'none';
        descGroup.style.display = 'none';
    }
    
    // Limpiar formulario
    document.getElementById('product-form').reset();
    clearImagePreview();
    
    // Mostrar modal
    document.getElementById('product-modal').classList.add('active');
}

function editProduct(section, productId) {
    const product = products[section].find(p => p.id === productId);
    if (!product) return;
    
    currentEditingProduct = { section, id: productId };
    document.getElementById('modal-title').textContent = 'Editar Producto';
    
    // Mostrar/ocultar campos según la sección
    const priceGroup = document.getElementById('product-price').parentElement;
    const descGroup = document.getElementById('product-description').parentElement;
    
    if (section === 'featured') {
        priceGroup.style.display = 'block';
        descGroup.style.display = 'block';
    } else {
        priceGroup.style.display = 'none';
        descGroup.style.display = 'none';
    }
    
    // Llenar formulario con datos del producto
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price || '';
    document.getElementById('product-description').value = product.description || '';
    document.getElementById('product-image-url').value = product.image;
    document.getElementById('product-badge').value = product.badge || '';
    
    // Mostrar preview de imagen existente si es URL
    if (product.image && product.image.startsWith('http')) {
        showImagePreview(product.image);
    }
    
    // Mostrar modal
    document.getElementById('product-modal').classList.add('active');
}

function deleteProduct(section, productId) {
    if (confirm('¿Estás segura de que querés eliminar este producto?')) {
        products[section] = products[section].filter(p => p.id !== productId);
        renderProducts(section);
        saveToStorage();
        showToast('Producto eliminado correctamente');
    }
}

function saveProduct() {
    const form = document.getElementById('product-form');
    const formData = new FormData(form);
    
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const description = document.getElementById('product-description').value.trim();
    const imageUrl = document.getElementById('product-image-url').value.trim();
    const badge = document.getElementById('product-badge').value.trim();
    
    // Usar imagen subida o URL
    const image = currentImageData || imageUrl;
    
    if (!name || !image) {
        alert('El nombre y la imagen son obligatorios');
        return;
    }
    
    const productData = {
        name,
        image,
        badge
    };
    
    // Agregar campos específicos para productos destacados
    if (currentSection === 'featured') {
        productData.price = price;
        productData.description = description;
    }
    
    if (currentEditingProduct) {
        // Editar producto existente
        const { section, id } = currentEditingProduct;
        const productIndex = products[section].findIndex(p => p.id === id);
        if (productIndex !== -1) {
            products[section][productIndex] = { ...products[section][productIndex], ...productData };
        }
        showToast('Producto actualizado correctamente');
    } else {
        // Agregar nuevo producto
        const newId = Math.max(0, ...products[currentSection].map(p => p.id)) + 1;
        products[currentSection].push({
            id: newId,
            ...productData
        });
        showToast('Producto agregado correctamente');
    }
    
    renderProducts(currentSection);
    closeModal();
    saveToStorage();
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    currentEditingProduct = null;
    currentImageData = null;
    clearImagePreview();
}

// Configuración de la tienda
function loadStoreSettings() {
    document.getElementById('store-name').value = storeSettings.name;
    document.getElementById('store-description').value = storeSettings.description;
    document.getElementById('hero-title').value = storeSettings.heroTitle;
    document.getElementById('hero-button').value = storeSettings.heroButton;
    document.getElementById('newsletter-title').value = storeSettings.newsletterTitle;
    document.getElementById('newsletter-description').value = storeSettings.newsletterDescription;
}

function saveStoreSettings() {
    storeSettings = {
        name: document.getElementById('store-name').value,
        description: document.getElementById('store-description').value,
        heroTitle: document.getElementById('hero-title').value,
        heroButton: document.getElementById('hero-button').value,
        newsletterTitle: document.getElementById('newsletter-title').value,
        newsletterDescription: document.getElementById('newsletter-description').value
    };
}

// Persistencia de datos
function saveToStorage() {
    localStorage.setItem('saraAdminProducts', JSON.stringify(products));
    localStorage.setItem('saraAdminSettings', JSON.stringify(storeSettings));
    localStorage.setItem('saraAdminStories', JSON.stringify(stories));
}

function loadFromStorage() {
    const storedProducts = localStorage.getItem('saraAdminProducts');
    const storedSettings = localStorage.getItem('saraAdminSettings');
    const storedStories = localStorage.getItem('saraAdminStories');
    
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
    
    if (storedSettings) {
        storeSettings = JSON.parse(storedSettings);
    }
    
    if (storedStories) {
        stories = JSON.parse(storedStories);
    }
}

// Guardar todos los cambios
function saveChanges() {
    saveStoreSettings();
    saveToStorage();
    updateMainSite();
    showToast('¡Todos los cambios guardados correctamente!');
}

// Actualizar sitio principal
function updateMainSite() {
    // Esta función actualizará el index.html con los datos del admin
    // Por ahora solo guarda en localStorage para que lo lea la tienda
    localStorage.setItem('saraStoreData', JSON.stringify({
        products,
        settings: storeSettings,
        stories
    }));
}

// Toast de notificaciones
function showToast(message) {
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toast-message');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Eventos del teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Click fuera del modal para cerrar
document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ===== FUNCIONES DE MANEJO DE IMÁGENES =====

function triggerFileUpload() {
    document.getElementById('product-image-file').click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        alert('Por favor seleccioná un archivo de imagen válido');
        return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es muy grande. El tamaño máximo es 5MB');
        return;
    }

    // Leer archivo como base64
    const reader = new FileReader();
    reader.onload = function(e) {
        currentImageData = e.target.result;
        showImagePreview(currentImageData);
        
        // Limpiar URL si se sube archivo
        document.getElementById('product-image-url').value = '';
    };
    reader.readAsDataURL(file);
}

function showImagePreview(imageSrc) {
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    
    previewImg.src = imageSrc;
    preview.style.display = 'block';
}

function removeImage() {
    clearImagePreview();
    currentImageData = null;
    document.getElementById('product-image-file').value = '';
    document.getElementById('product-image-url').value = '';
}

function clearImagePreview() {
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    
    preview.style.display = 'none';
    previewImg.src = '';
}

// Drag and drop para imágenes
const uploadContainer = document.querySelector('.image-upload-container');

if (uploadContainer) {
    uploadContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadContainer.classList.add('image-upload-drag');
    });

    uploadContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadContainer.classList.remove('image-upload-drag');
    });

    uploadContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadContainer.classList.remove('image-upload-drag');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            
            // Simular selección de archivo
            const fileInput = document.getElementById('product-image-file');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            
            // Procesar archivo
            handleImageUpload({ target: { files: [file] } });
        }
    });
}

// Listener para URL de imagen
document.getElementById('product-image-url').addEventListener('input', function(e) {
    const url = e.target.value.trim();
    if (url && isValidImageUrl(url)) {
        currentImageData = null; // Limpiar imagen subida
        showImagePreview(url);
        document.getElementById('product-image-file').value = ''; // Limpiar archivo
    }
});

function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null || url.startsWith('data:image/');
}

// ===== INSTAGRAM STORIES MANAGEMENT =====

function addStory() {
    if (stories.length >= 5) {
        alert('Solo podés tener máximo 5 historias');
        return;
    }
    
    currentEditingStory = null;
    document.getElementById('story-modal-title').textContent = 'Agregar Historia';
    resetStoryForm();
    document.getElementById('story-modal').classList.add('active');
}

function editStory(storyId) {
    const story = stories.find(s => s.id === storyId);
    if (!story) return;
    
    currentEditingStory = storyId;
    document.getElementById('story-modal-title').textContent = 'Editar Historia';
    
    if (story.image) {
        showStoryPreview(story.image);
        currentStoryImageData = story.image;
    }
    
    document.getElementById('story-modal').classList.add('active');
}

function deleteStory(storyId) {
    if (confirm('¿Estás segura de que querés eliminar esta historia?')) {
        stories = stories.filter(s => s.id !== storyId);
        reorderStories();
        renderStories();
        saveToStorage();
        updateMainSite();
        showToast('Historia eliminada correctamente');
    }
}

function closeStoryModal() {
    document.getElementById('story-modal').classList.remove('active');
    currentEditingStory = null;
    currentStoryImageData = null;
    resetStoryForm();
}

function resetStoryForm() {
    document.getElementById('story-preview-container').style.display = 'none';
    document.getElementById('story-upload-area').style.display = 'block';
    document.getElementById('story-image-file').value = '';
    currentStoryImageData = null;
}

function saveStory() {
    if (!currentStoryImageData) {
        alert('Debés seleccionar una imagen para la historia');
        return;
    }
    
    if (currentEditingStory) {
        // Editar historia existente
        const storyIndex = stories.findIndex(s => s.id === currentEditingStory);
        if (storyIndex !== -1) {
            stories[storyIndex].image = currentStoryImageData;
        }
        showToast('Historia actualizada correctamente');
    } else {
        // Agregar nueva historia
        const newId = Math.max(0, ...stories.map(s => s.id)) + 1;
        const newOrder = stories.length + 1;
        
        stories.push({
            id: newId,
            image: currentStoryImageData,
            order: newOrder
        });
        showToast('Historia agregada correctamente');
    }
    
    renderStories();
    closeStoryModal();
    saveToStorage();
    updateMainSite();
}

function reorderStories() {
    stories = stories.map((story, index) => ({
        ...story,
        order: index + 1
    }));
}

// Funciones de upload para stories
function triggerStoryUpload() {
    document.getElementById('story-image-file').click();
}

function handleStoryImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        alert('Por favor seleccioná un archivo de imagen válido');
        return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es muy grande. El tamaño máximo es 5MB');
        return;
    }

    // Leer archivo como base64
    const reader = new FileReader();
    reader.onload = function(e) {
        currentStoryImageData = e.target.result;
        showStoryPreview(currentStoryImageData);
    };
    reader.readAsDataURL(file);
}

function showStoryPreview(imageSrc) {
    const previewContainer = document.getElementById('story-preview-container');
    const previewImg = document.getElementById('story-preview-img');
    const uploadArea = document.getElementById('story-upload-area');
    
    previewImg.src = imageSrc;
    previewContainer.style.display = 'block';
    uploadArea.style.display = 'none';
}

function removeStoryImage() {
    resetStoryForm();
    currentStoryImageData = null;
}

// Event listeners adicionales para stories
document.addEventListener('DOMContentLoaded', function() {
    const storyFileInput = document.getElementById('story-image-file');
    if (storyFileInput) {
        storyFileInput.addEventListener('change', handleStoryImageUpload);
    }
    
    // Drag and drop para stories
    const storyUploadArea = document.getElementById('story-upload-area');
    if (storyUploadArea) {
        storyUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            storyUploadArea.classList.add('dragover');
        });

        storyUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            storyUploadArea.classList.remove('dragover');
        });

        storyUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            storyUploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                handleStoryImageUpload({ target: { files: [file] } });
            }
        });
        
        storyUploadArea.addEventListener('click', triggerStoryUpload);
    }
    
    // Cerrar modal con click fuera
    const storyModal = document.getElementById('story-modal');
    if (storyModal) {
        storyModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeStoryModal();
            }
        });
    }
});