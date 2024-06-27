
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

async function fetchCDPDetails(patientId) {
    const sqlQuery = `SELECT * FROM CDPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const cdpDetails = result[0];

            document.querySelector('.text91').value = cdpDetails.Fasting-Glucose;
            document.querySelector('.text92').value = cdpDetails.Hemoglobin;
            document.querySelector('.text93').value = cdpDetails.Insulin;
            document.querySelector('.text94').value = cdpDetails.C-Peptide;
            document.querySelector('.text95').value = cdpDetails.Glucagon;
            document.querySelector('.text96').value = cdpDetails.Fructosamine;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No CDP details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching CDP details:', error);
        alert('Error fetching CDP details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchCDPDetails(patientId);
});
