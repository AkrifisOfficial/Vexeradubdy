// Функция для генерации HTML карточки даббера
function createDubberCard(dubber) {
    return `
    <div class="dubber-card">
        <div class="dubber-image">
            <img src="${dubber.image}" alt="${dubber.name}">
        </div>
        <div class="dubber-info">
            <h3>${dubber.name}</h3>
            <div class="dubber-role">${dubber.role}</div>
            <p>${dubber.description}</p>
            <div class="dubber-roles">
                <strong>Известные роли:</strong>
                <ul>
                    ${dubber.famousRoles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    `;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Вставляем карточки дабберов
    const dubbersContainer = document.getElementById('dubbersContainer');
    dubbersContainer.innerHTML = dubbersData.map(createDubberCard).join('');
    
    // Обработка формы вступления
    const showFormBtn = document.getElementById('showFormBtn');
    const applicationForm = document.getElementById('applicationForm');
    const joinForm = document.getElementById('joinForm');
    
    showFormBtn.addEventListener('click', function() {
        applicationForm.style.display = 'block';
        this.style.display = 'none';
    });
    
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        applicationForm.style.display = 'none';
        showFormBtn.style.display = 'inline-block';
        this.reset();
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Изменение фона шапки при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
    });
    
    // Подсветка активной ссылки
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
