
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

async function fetchLFTDetails(patientId) {
    const sqlQuery = `SELECT * FROM LFTDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const cdpDetails = result[0];

            document.querySelector('.text74').value = lftDetails.Alanine-Aminotransferase;
            document.querySelector('.text75').value = lftDetails.Aspartate-Aminotransferase;
            document.querySelector('.text76').value = lftDetails.Alkaline-Phosphatase;
            document.querySelector('.text77').value = lftDetails.Total-Bilirubin;
            document.querySelector('.text78').value = lftDetails.Direct-Bilirubin;
            document.querySelector('.text79').value = lftDetails.Albumin;
            document.querySelector('.text80').value = lftDetails.Total-Protein;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No LFT details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching LFT details:', error);
        alert('Error fetching LFT details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchLFTDetails(patientId);
});
