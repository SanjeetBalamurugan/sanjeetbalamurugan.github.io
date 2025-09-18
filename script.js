const username = "SanjeetBalamurugan";
const profileImg = document.getElementById('profile-img');
const usernameEl = document.getElementById('username');
const repoContainer = document.getElementById('repo-container');
const themeToggle = document.getElementById('theme-toggle');
const hero = document.querySelector('.hero');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxShrink = 60;
    const initialHeight = 90;
    const newHeight = Math.max(initialHeight - scrollY / 10, maxShrink);
    hero.style.height = `${newHeight}vh`;
    const scale = Math.max(1 - scrollY / 500, 0.35);
    hero.querySelector('img').style.width = `${120 * scale}px`;
    hero.querySelector('img').style.height = `${120 * scale}px`;
    hero.querySelector('h1').style.fontSize = `${2.8 * scale}rem`;
});

fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => {
        profileImg.src = user.avatar_url;
        usernameEl.textContent = user.name || user.login;
    })
    .catch(err => console.error('Error fetching profile:', err));

fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    .then(res => res.json())
    .then(repos => {
        if (!Array.isArray(repos)) return;
        repos.forEach((repo, i) => {
            const card = document.createElement('div');
            card.classList.add('repo-card');
            const a = document.createElement('a');
            a.href = repo.html_url;
            a.textContent = repo.name;
            a.target = "_blank";
            const desc = document.createElement('div');
            desc.classList.add('repo-desc');
            desc.textContent = repo.description ? repo.description : '';
            const stars = document.createElement('div');
            stars.classList.add('repo-stars');
            stars.textContent = `★ ${repo.stargazers_count}`;
            card.appendChild(a);
            card.appendChild(desc);
            card.appendChild(stars);
            repoContainer.appendChild(card);
            setTimeout(() => { card.classList.add('fade-in'); }, i * 100);
        });
        setTimeout(() => { repoContainer.classList.add('fade-in'); }, 50);
    })
    .catch(err => console.error('Error fetching repos:', err));
