document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    // Toggle fields based on account type
    function toggleFields() {
        const individualFields = document.getElementById('individual-fields');
        const businessFields = document.getElementById('business-fields');
        
        const selectedType = document.querySelector('input[name="accountType"]:checked').value;
        
        if (selectedType === 'business') {
            individualFields.style.display = 'none';
            businessFields.style.display = 'block';
        } else {
            individualFields.style.display = 'block';
            businessFields.style.display = 'none';
        }
    }

    document.querySelectorAll('input[name="accountType"]').forEach((radio) => {
        radio.addEventListener('change', toggleFields);
    });

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent page reload on form submission
    
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
        };
    
        try {
            // Send the data to the backend
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});