
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

async function fetchCBCDetails(patientId) {
    const sqlQuery = `SELECT * FROM CBCDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const cbcDetails = result[0];

            document.querySelector('.text10').value = cbcDetails.WBC;
            document.querySelector('.text11').value = cbcDetails.RBC;
            document.querySelector('.text12').value = cbcDetails.Hemoglobin;
            document.querySelector('.text13').value = cbcDetails.Hematocrit;
            document.querySelector('.text14').value = cbcDetails.Platelets;

            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No CBC details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching CBC details:', error);
        alert('Error fetching CBC details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchCBCDetails(patientId);
});
