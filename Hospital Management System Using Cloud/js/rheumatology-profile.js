
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

async function fetchRTDetails(patientId) {
    const sqlQuery = `SELECT * FROM RTDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const rtDetails = result[0];

            document.querySelector('.text158').value = rtDetails.RF;
            document.querySelector('.text159').value = rtDetails.Anti-CCP;
            document.querySelector('.text160').value = rtDetails.ANA;
            document.querySelector('.text161').value = rtDetails.CRP;
            document.querySelector('.text162').value = rtDetails.ESR;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Rheumatology Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Rheumatology Profile details:', error);
        alert('Error fetching Rheumatology Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchRTDetails(patientId);
});
