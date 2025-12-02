// main.js

document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`${card.textContent} tool will open here.`);
    });
});

