
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

async function fetchLPDetails(patientId) {
    const sqlQuery = `SELECT * FROM LPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const lpDetails = result[0];

            document.querySelector('.text173').value = lpDetails.Total-Cholesterol;
            document.querySelector('.text174').value = lpDetails.LDL;
            document.querySelector('.text175').value = lpDetails.HDL;
            document.querySelector('.text176').value = lpDetails.Triglycerides;
            document.querySelector('.text177').value = lpDetails.ApoA1;
            document.querySelector('.text178').value = lpDetails.ApoB;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Lipid Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Lipid Profile details:', error);
        alert('Error fetching Lipid Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchLPDetails(patientId);
});
