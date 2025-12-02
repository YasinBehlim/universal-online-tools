// main.js - Fully functional tools

const modal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('tool-title');
const modalBody = document.getElementById('tool-body');
const closeBtn = document.querySelector('.close');

const tools = {
    'Word Counter': () => {
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
    },
    'Percentage Calculator': () => {
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
    },
    'QR Code Generator': () => {
        modalBody.innerHTML = `
            <input type="text" id="qr-text" placeholder="Enter text or URL" style="width:100%;margin-bottom:10px;padding:10px;">
            <button id="qr-btn">Generate QR Code</button>
            <div id="qr-result" style="margin-top:15px;"></div>
        `;
        document.getElementById('qr-btn').addEventListener('click', () => {
            const qrText = document.getElementById('qr-text').value;
            document.getElementById('qr-result').innerHTML = '';
            if(qrText.trim() === '') return;
            new QRCode(document.getElementById('qr-result'), { text: qrText, width: 150, height: 150 });
        });
    },
    'Base64 Encoder/Decoder': () => {
        modalBody.innerHTML = `
            <textarea id="base64-input" rows="5" style="width:100%"></textarea>
            <button id="encode-btn">Encode</button>
            <button id="decode-btn">Decode</button>
            <p id="base64-result"></p>
        `;
        document.getElementById('encode-btn').addEventListener('click', () => {
            const text = document.getElementById('base64-input').value;
            document.getElementById('base64-result').textContent = btoa(text);
        });
        document.getElementById('decode-btn').addEventListener('click', () => {
            try {
                const text = document.getElementById('base64-input').value;
                document.getElementById('base64-result').textContent = atob(text);
            } catch(e) {
                document.getElementById('base64-result').textContent = 'Invalid Base64';
            }
        });
    },
    'Random Number Generator': () => {
        modalBody.innerHTML = `
            <input type="number" id="min-value" placeholder="Min value" style="width:48%;margin-right:4%;padding:10px;">
            <input type="number" id="max-value" placeholder="Max value" style="width:48%;padding:10px;">
            <button id="rand-btn">Generate</button>
            <p id="rand-result"></p>
        `;
        document.getElementById('rand-btn').addEventListener('click', () => {
            const min = parseInt(document.getElementById('min-value').value);
            const max = parseInt(document.getElementById('max-value').value);
            if(isNaN(min) || isNaN(max) || min > max) {
                document.getElementById('rand-result').textContent = 'Invalid input';
            } else {
                const num = Math.floor(Math.random() * (max - min + 1)) + min;
                document.getElementById('rand-result').textContent = 'Random number: ' + num;
            }
        });
    },
    'Password Generator': () => {
        modalBody.innerHTML = `
            <input type="number" id="pass-length" placeholder="Password length" style="width:100%;margin-bottom:10px;padding:10px;">
            <button id="pass-btn">Generate Password</button>
            <p id="pass-result"></p>
        `;
        document.getElementById('pass-btn').addEventListener('click', () => {
            const len = parseInt(document.getElementById('pass-length').value);
            if(isNaN(len) || len <= 0) return;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            let pass = '';
            for(let i=0;i<len;i++) pass += chars.charAt(Math.floor(Math.random()*chars.length));
            document.getElementById('pass-result').textContent = pass;
        });
    },
    'Unit Converter': () => {
        modalBody.innerHTML = `
            <select id="unit-type" style="width:100%;margin-bottom:10px;padding:10px;">
                <option value="length">Length (m ↔ cm)</option>
                <option value="weight">Weight (kg ↔ g)</option>
                <option value="temperature">Temperature (°C ↔ °F)</option>
            </select>
            <input type="number" id="unit-value" placeholder="Enter value" style="width:100%;margin-bottom:10px;padding:10px;">
            <button id="unit-btn">Convert</button>
            <p id="unit-result"></p>
        `;
        document.getElementById('unit-btn').addEventListener('click', () => {
            const type = document.getElementById('unit-type').value;
            const val = parseFloat(document.getElementById('unit-value').value);
            let res = '';
            if(isNaN(val)) { document.getElementById('unit-result').textContent='Invalid input'; return; }
            if(type==='length') res = (val*100)+' cm / '+(val)+' m';
            if(type==='weight') res = (val*1000)+' g / '+(val)+' kg';
            if(type==='temperature') res = (val*9/5+32)+' °F / '+val+' °C';
            document.getElementById('unit-result').textContent = res;
        });
    },
    'BMI Calculator': () => {
        modalBody.innerHTML = `
            <input type="number" id="bmi-weight" placeholder="Weight (kg)" style="width:48%;margin-right:4%;padding:10px;">
            <input type="number" id="bmi-height" placeholder="Height (cm)" style="width:48%;padding:10px;">
            <button id="bmi-btn">Calculate BMI</button>
            <p id="bmi-result"></p>
        `;
        document.getElementById('bmi-btn').addEventListener('click', () => {
            const w = parseFloat(document.getElementById('bmi-weight').value);
            const h = parseFloat(document.getElementById('bmi-height').value)/100;
            if(isNaN(w)||isNaN(h)||h===0){document.getElementById('bmi-result').textContent='Invalid input';return;}
            const bmi = (w/(h*h)).toFixed(2);
            document.getElementById('bmi-result').textContent = 'BMI: '+bmi;
        });
    }
};

// Open modal and load tool
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        const toolName = card.textContent;
        modalTitle.textContent = toolName;
        if(tools[toolName]) tools[toolName]();
        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.onclick = () => modal.style.display='none';
window.onclick = (e) => { if(e.target==modal) modal.style.display='none'; }

// Search functionality
const searchInput = document.getElementById('tool-search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
});
