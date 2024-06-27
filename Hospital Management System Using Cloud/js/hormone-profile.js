
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

async function fetchHPDetails(patientId) {
    const sqlQuery = `SELECT * FROM HPDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const hpDetails = result[0];

            document.querySelector('.text140').value = hpDetails.TSH;
            document.querySelector('.text141').value = hpDetails.Thyroxine;
            document.querySelector('.text142').value = hpDetails.Triiodothyronine;
            document.querySelector('.text143').value = hpDetails.Cortisol;
            document.querySelector('.text144').value = hpDetails.DHEA-S;
            document.querySelector('.text145').value = hpDetails.Progesterone;
            document.querySelector('.text146').value = hpDetails.Estradiol;
            document.querySelector('.text147').value = hpDetails.Testosterone;


            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No Cormone Profile details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching Hormone Profile details:', error);
        alert('Error fetching Hormone Profile details. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchHPDetails(patientId);
});
