
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

async function fetchRPDetails(patientId) {
    const sqlQuery = `SELECT * FROM RPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const rpDetails = result[0];

            document.querySelector('.text121').value = rpDetails.BUN;
            document.querySelector('.text122').value = rpDetails.Creatinine;
            document.querySelector('.text123').value = rpDetails.Uric-Acid;
            document.querySelector('.text124').value = rpDetails.Sodium;
            document.querySelector('.text125').value = rpDetails.Potassium;
            document.querySelector('.text126').value = rpDetails.Chloride;
            document.querySelector('.text127').value = rpDetails.Bicarbonate;
            document.querySelector('.text128').value = rpDetails.Phosphorus;
            document.querySelector('.text129').value = rpDetails.Calcium;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Renal Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Renal Profile details:', error);
        alert('Error fetching Renal Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchRPDetails(patientId);
});
