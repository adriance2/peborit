document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm form');
    const signupForm = document.querySelector('#signupForm form');
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    if (!document.getElementById('profile')) {
        const profileCircle = document.createElement('div');
        profileCircle.id = 'profile';
        profileCircle.classList.add('profile-circle');
        profileCircle.textContent = '?';
        profileCircle.onclick = handleProfileClick;
        document.querySelector('.nav-links').appendChild(profileCircle);
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateProfileCircle(loggedInUser);
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (authenticateUser(username, password)) {
            localStorage.setItem('loggedInUser', username);
            updateProfileCircle(username);
            closeModal();
        } else {
            alert('Invalid username or password.');
        }
    });

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('newUsername').value;
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;

        storeUser(username, email, password);
        alert('Signup successful! Please log in.');
        flipToLogin();
    });

    window.addEventListener('scroll', () => {
        navbar.style.transform = window.scrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollY = window.scrollY;
    });
});

function updateProfileCircle(username) {
    const profileCircle = document.getElementById('profile');
    profileCircle.textContent = username.charAt(0).toUpperCase();
    profileCircle.onclick = handleProfileClick; 
}

function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('content').classList.add('blur');
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('content').classList.remove('blur');
}

function flipToSignup() {
    document.querySelector('.form-container').classList.add('flipped');
    setTimeout(() => {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
    }, 300);
}

function flipToLogin() {
    document.querySelector('.form-container').classList.remove('flipped');
    setTimeout(() => {
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }, 300);
}

function storeUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

function authenticateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username && user.password === password);
}

function handleProfileClick() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        openModal();
    } else {
        const confirmLogout = confirm(`Are you sure you want to log out, ${loggedInUser}?`);
        if (confirmLogout) {
            logout();
        }
    }
}

function logout() {
    localStorage.removeItem('loggedInUser'); 
    const profileCircle = document.getElementById('profile');
    profileCircle.textContent = '?'; 
    profileCircle.onclick = handleProfileClick; 
    alert('You have been logged out.');
}