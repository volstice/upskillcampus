
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

async function fetchTPDetails(patientId) {
    const sqlQuery = `SELECT * FROM TPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const tpDetails = result[0];

            document.querySelector('.text189').value = tpDetails.TSH;
            document.querySelector('.text190').value = tpDetails.Thyroxine;
            document.querySelector('.text191').value = tpDetails.Triiodothyronine;
            document.querySelector('.text192').value = tpDetails.Total T4;
            document.querySelector('.text193').value = tpDetails.Total T3;
            document.querySelector('.text194').value = tpDetails.Reverse T3;
            document.querySelector('.text195').value = tpDetails.TPOAb;
            document.querySelector('.text195').value = tpDetails.TgAb;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Thyroid Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Thyroid Profile details:', error);
        alert('Error fetching Thyroid Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchTPDetails(patientId);
});
