document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const contactList = document.getElementById('contactList');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const text = e.target.result;
                parseCSV(text);
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid CSV file.');
        }
    }

    function parseCSV(text) {
        const lines = text.split('\n');
        contactList.innerHTML = '';
        lines.forEach(line => {
            const [name, phone] = line.split(',');
            if (name && phone) {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact';
                contactDiv.textContent = `Name: ${name.trim()} - Phone: ${phone.trim()}`;
                contactList.appendChild(contactDiv);
            }
        });
    }
});
