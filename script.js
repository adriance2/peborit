function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('content').classList.add('blur');
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('content').classList.remove('blur');
}

function flipToSignup() {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.add('flipped');
    setTimeout(() => {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
    }, 300); 
}

function flipToLogin() {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.remove('flipped');
    setTimeout(() => {
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }, 300); 
}

document.addEventListener('DOMContentLoaded', () => {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    const articleLinks = document.querySelector('.article-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            navbar.style.transform = 'translateY(-100%)';
            articleLinks.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            articleLinks.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
});