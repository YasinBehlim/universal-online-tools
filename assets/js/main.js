// main.js

// Modal elements
const modal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('tool-title');
const modalBody = document.getElementById('tool-body');
const closeBtn = document.querySelector('.close');

// Click on tool card
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        const toolName = card.textContent;
        modalTitle.textContent = toolName;

        // Clear previous content
        modalBody.innerHTML = '';

        // Example tools functionality
        if (toolName === 'Word Counter') {
            modalBody.innerHTML = `
                <textarea id="word-input" rows="5" style="width:100%"></textarea>
                <button id="count-btn">Count Words</button>
                <p id="word-result"></p>
            `;
            document.getElementById('count-btn').addEventListener('click', () => {
                const text = document.getElementById('word-input').value;
                const count = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
                document.getElementById('word-result').textContent = 'Word count: ' + count;
            });
        } else if (toolName === 'Percentage Calculator') {
            modalBody.innerHTML = `
                <input type="number" id="percent-value" placeholder="Enter value" style="width:100%;margin-bottom:10px;padding:10px;">
                <input type="number" id="percent-total" placeholder="Enter total" style="width:100%;margin-bottom:10px;padding:10px;">
                <button id="percent-btn">Calculate %</button>
                <p id="percent-result"></p>
            `;
            document.getElementById('percent-btn').addEventListener('click', () => {
                const value = parseFloat(document.getElementById('percent-value').value);
                const total = parseFloat(document.getElementById('percent-total').value);
                if(isNaN(value) || isNaN(total) || total === 0) {
                    document.getElementById('percent-result').textContent = 'Invalid input';
                } else {
                    const result = (value / total * 100).toFixed(2);
                    document.getElementById('percent-result').textContent = 'Result: ' + result + '%';
                }
            });
        } else if (toolName === 'QR Code Generator') {
            modalBody.innerHTML = `
                <input type="text" id="qr-text" placeholder="Enter text or URL" style="width:100%;margin-bottom:10px;padding:10px;">
                <button id="qr-btn">Generate QR Code</button>
                <div id="qr-result" style="margin-top:15px;"></div>
            `;
            document.getElementById('qr-btn').addEventListener('click', () => {
                const qrText = document.getElementById('qr-text').value;
                document.getElementById('qr-result').innerHTML = '';
                if(qrText.trim() === '') return;
                // Use QRCode.js library if included
                new QRCode(document.getElementById('qr-result'), {
                    text: qrText,
                    width: 150,
                    height: 150
                });
            });
        } else {
            modalBody.innerHTML = '<p>Functionality coming soon...</p>';
        }

        // Show modal
        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close when clicking outside modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Search functionality
const searchInput = document.getElementById('tool-search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
});
