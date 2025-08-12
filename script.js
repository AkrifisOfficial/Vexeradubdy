// Общие функции для обеих страниц
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Загрузка дабберов на главной странице
    if (document.getElementById('dubbers-container')) {
        loadDubbers();
    }
});

// Загрузка дабберов из JSON
async function loadDubbers() {
    try {
        const response = await fetch('data/dubbers.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const dubbers = await response.json();
        renderDubbers(dubbers);
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('dubbers-container').innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <h3>Ошибка загрузки данных о дабберах</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Отображение дабберов на главной странице
function renderDubbers(dubbers) {
    const container = document.getElementById('dubbers-container');
    container.innerHTML = '';
    
    dubbers.forEach(dubber => {
        const card = document.createElement('div');
        card.className = 'dubber-card';
        
        // Создаем иконки для социальных сетей
        let socialIcons = '';
        if (dubber.socials && dubber.socials.length > 0) {
            socialIcons = dubber.socials.map(social => {
                // Определяем класс иконки в зависимости от названия
                let iconClass = '';
                switch(social.name.toLowerCase()) {
                    case 'vk': iconClass = 'fab fa-vk'; break;
                    case 'telegram': iconClass = 'fab fa-telegram'; break;
                    case 'youtube': iconClass = 'fab fa-youtube'; break;
                    case 'instagram': iconClass = 'fab fa-instagram'; break;
                    default: iconClass = 'fas fa-link';
                }
                
                return `<a href="${social.url}" target="_blank" class="social-icon" title="${social.name}">
                    <i class="${iconClass}"></i>
                </a>`;
            }).join('');
        }
        
        card.innerHTML = `
            <img src="${dubber.avatar}" alt="${dubber.name}" class="dubber-avatar">
            <div class="dubber-info">
                <h3 class="dubber-name">${dubber.name}</h3>
                <p class="dubber-role">${dubber.role}</p>
                <p>${dubber.bio}</p>
                <div class="dubber-socials">
                    ${socialIcons}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
