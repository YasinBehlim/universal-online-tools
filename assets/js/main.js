// main.js

// Click functionality for all tools
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`${card.textContent} tool will open here.`);
    });
});

// Search functionality
const searchInput = document.getElementById('tool-search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
});
