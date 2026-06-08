document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-contact-nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animate mobile menu button (hamburger to X)
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Typing Animation Effect
    const typingElement = document.getElementById('typing-element');
    const words = ["Full-Stack Developer", "Web Application Creator", "UI/UX Designer", "Problem Solver"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeEffect() {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typeDelay = 50; // Delete faster
        } else {
            // Add character
            typingElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typeDelay = 150; // Type normally
        }

        // Handle states
        if (!isDeleting && charIdx === currentWord.length) {
            // Finished typing, pause before deleting
            typeDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typeDelay = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeDelay);
    }

    if (typingElement) {
        typeEffect();
    }

    // 4. Skills Progress Bars Animation (Using IntersectionObserver)
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress-bar');

    if (skillsSection && progressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set width to target progress
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-progress');
                        bar.style.width = targetWidth;
                    });
                    // Once animated, we don't need to observe anymore
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsSection);
    }

    // 5. Portfolio/Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const projectType = card.getAttribute('data-project-type');
                
                if (filterValue === 'all' || projectType === filterValue) {
                    card.style.display = 'flex';
                    // Trigger a tiny fade-in scale animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Set display none after opacity animation completes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navMenuLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Detect which section occupies the main viewport area
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 7. Contact Form Handler (Simulated Submit with animations)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'กำลังส่งข้อมูล... <i class="fa-solid fa-circle-notch fa-spin"></i>';
            
            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                // Success state
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Green success gradient
                submitBtn.innerHTML = 'ส่งสำเร็จแล้ว! <i class="fa-solid fa-circle-check"></i>';
                
                // Show a modern notification alert
                const alertBox = document.createElement('div');
                alertBox.className = 'glass-card';
                alertBox.style.position = 'fixed';
                alertBox.style.bottom = '20px';
                alertBox.style.right = '20px';
                alertBox.style.padding = '1.2rem 2rem';
                alertBox.style.borderLeft = '4px solid #10b981';
                alertBox.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                alertBox.style.zIndex = '1000';
                alertBox.style.transition = 'all 0.5s ease';
                alertBox.style.transform = 'translateY(50px)';
                alertBox.style.opacity = '0';
                
                alertBox.innerHTML = `
                    <div style="display:flex; align-items:center; gap:0.8rem;">
                        <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:1.3rem;"></i>
                        <div>
                            <h4 style="margin:0; font-weight:700; font-size:0.95rem;">ส่งข้อความเรียบร้อย!</h4>
                            <p style="margin:0.2rem 0 0; font-size:0.85rem; color:#94a3b8;">ขอบคุณที่ติดต่อ ผมจะรีบตอบกลับโดยเร็วที่สุด</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(alertBox);
                
                // Animate entry
                setTimeout(() => {
                    alertBox.style.transform = 'translateY(0)';
                    alertBox.style.opacity = '1';
                }, 100);
                
                // Reset form
                contactForm.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    // Fade out notification
                    alertBox.style.transform = 'translateY(50px)';
                    alertBox.style.opacity = '0';
                    setTimeout(() => alertBox.remove(), 500);
                    
                    // Restore button
                    submitBtn.disabled = false;
                    submitBtn.style.background = ''; // reset to CSS default
                    submitBtn.innerHTML = originalBtnText;
                }, 4000);
                
            }, 1500);
        });
    }
});
