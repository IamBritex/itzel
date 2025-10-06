class Navbar {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.basePath = this.getBasePath();
        this.isMenuOpen = false;
    }

    async loadNavbar() {
        try {
            const response = await fetch(this.basePath + 'html/navbar.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('afterbegin', html);
            this.highlightCurrentPage();
            this.setupEventListeners();
            this.setupMobileMenu();
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    getBasePath() {
        // Si estamos en una página dentro de /html/, subimos un nivel
        return window.location.pathname.includes('/html/') ? '../' : './';
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'home';
    }

    highlightCurrentPage() {
        const links = document.querySelectorAll('.navbar a');
        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop().replace('.html', '');
            if (linkPage === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        const links = document.querySelectorAll('.navbar a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const icon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Cambiar el ícono
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');

            // Prevenir scroll cuando el menú está abierto
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                document.body.style.overflow = '';
                this.isMenuOpen = false;
            });
        });
    }
}

export default Navbar;