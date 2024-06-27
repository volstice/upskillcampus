// Function to execute SQL query
async function executeQuery(query) {
    const endpoint = 'YOUR_RDS_ENDPOINT';
    const database = 'DATABASE_NAME';
    const username = 'USERNAME';
    const password = 'PASSWORD';

    const url = `${endpoint}/executeQuery`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            database: database,
            username: username,
            password: password,
            query: query,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function fetchBMPDetails(patientId) {
    const sqlQuery = `SELECT * FROM BMPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const bmpDetails = result[0];

            document.querySelector('.text56').value = bmpDetails.Glucose;
            document.querySelector('.text57').value = bmpDetails.Calcium;
            document.querySelector('.text58').value = bmpDetails.Sodium;
            document.querySelector('.text59').value = bmpDetails.Potassium;
            document.querySelector('.text60').value = bmpDetails.Bicarbonate;
            document.querySelector('.text61').value = bmpDetails.Chloride;
            document.querySelector('.text62').value = bmpDetails.BUN;
            document.querySelector('.text63').value = bmpDetails.Creatinine;

            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No BMP details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching BMP details:', error);
        alert('Error fetching BMP details. Please try again.');
    }
}

// Example usage: Fetch and display BMP details for a given Patient ID
document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchBMPDetails(patientId);
});
