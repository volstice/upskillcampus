
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

async function fetchIPDetails(patientId) {
    const sqlQuery = `SELECT * FROM IPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const ipDetails = result[0];

            document.querySelector('.text107').value = ipDetails.Serum-Iron;
            document.querySelector('.text108').value = ipDetails.TIBC;
            document.querySelector('.text109').value = ipDetails.Transferrin-Saturation;
            document.querySelector('.text110').value = ipDetails.Ferritin;



            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Iron Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Iron Profile details:', error);
        alert('Error fetching Iron Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchIPDetails(patientId);
});
