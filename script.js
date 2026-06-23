document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const closeMenu = document.querySelector('.close-menu');
    const sideLinks = document.querySelectorAll('.side-links a');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('header, section');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 280) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href").includes(current)) {
                item.classList.add("active");
            }
        });
    });
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideMenu.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }

    sideLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (sideMenu && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('active');
        }
    });
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                    entry.target.style.opacity = "1";
                    
                    if (entry.target.classList.contains('service-mega-card') || 
                        entry.target.classList.contains('feature-hex-card')) {
                        entry.target.style.transform = "translateY(0) rotateX(0) scale(1)";
                    }
                    
                    if (entry.target.classList.contains('gallery-item')) {
                        entry.target.style.transform = "translateY(0)";
                    }
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    const elementsToAnimate = document.querySelectorAll(
        '.reveal-container, .service-mega-card, .feature-hex-card, .gallery-item, .ultra-title, .rich-content, .about-content, .animate-reveal'
    );

    elementsToAnimate.forEach(el => {
        globalObserver.observe(el);
    });

    const aboutImg = document.querySelector('.reveal-container');
    if (aboutImg) {
        setTimeout(() => {
            aboutImg.classList.add('active');
            aboutImg.style.opacity = "1";
        }, 2000); 
    }
    const visualContainer = document.querySelector('.about-visual');
    const orb = document.querySelector('.bg-glow-orb');

    document.addEventListener('mousemove', (e) => {
        if (orb) {
            const moveX = (e.clientX - window.innerWidth / 2) / 25;
            const moveY = (e.clientY - window.innerHeight / 2) / 25;
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        if (visualContainer) {
            const imgWrapper = document.querySelector('.image-wrapper');
            const border = document.querySelector('.magical-border');
            const rect = visualContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (imgWrapper) imgWrapper.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.05)`;
            if (border) border.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
        }
    });
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
const modal = document.getElementById('reviewModal');
const openBtn = document.getElementById('openReviewModal');
const closeBtn = document.querySelector('.close-modal');

if (openBtn) {
    openBtn.onclick = () => modal.style.display = 'flex';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }
}
document.getElementById('sendWhatsappReview').onclick = function() {
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const stars = document.querySelector('input[name="stars"]:checked')?.value || "بدون نجوم";
    
    if(!name || !text) {
        alert("لطفاً، املأ اسمك ورأيك أولاً!");
        return;
    }

    const phoneNumber = "966576059864"; 
    const message = `أهلاً بصمة الإبداع، أود إضافة تقييم جديد:%0a
*الاسم:* ${name}%0a
*التقييم:* ${stars} نجوم%0a
*الرأي:* ${text}`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    modal.style.display = 'none';    
}