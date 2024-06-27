// Function to execute SQL query
async function executeQuery(query) {
    const endpoint = 'YOUR_RDS_ENDPOINT';
    const database = 'DATABASE_NAME';
    const username = 'USERNAME';
    const password = 'PASSWORD';

    const url = `${endpoint}/executeQuery`;
    const response = await fetch(url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            database: database, username: username, password: password, query: query,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


async function fetchUserDetails(patientId) {
    const sqlQuery = `SELECT * FROM PersonalDetails WHERE PatientID = "${patientId}"`;

    try {
        const result = await executeQuery(sqlQuery);

        if (result.length > 0) {
            const userDetails = result[0];

            document.getElementById('firstName').value = userDetails.FirstName;
            document.getElementById('lastName').value = userDetails.LastName;
            document.getElementById('dob').value = userDetails.DOB;
            document.getElementById('gender').value = userDetails.Gender;
            document.getElementById('maritalStatus').value = userDetails.MaritalStatus;
            document.getElementById('phone').value = userDetails.Phone;
            document.getElementById('otherContact').value = userDetails.OtherContact;
            document.getElementById('mothersName').value = userDetails.MothersName;
            document.getElementById('fathersName').value = userDetails.FathersName;
            document.getElementById('patientId').value = userDetails.PatientID;
            document.getElementById('addressLine1').value = userDetails.AddressLine1;
            document.getElementById('addressLine2').value = userDetails.AddressLine2;
            document.getElementById('additionalInfo').value = userDetails.AdditionalInfo;

            // Disable all input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.disabled = true);
        } else {
            alert('No user details found for the provided Patient ID.');
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
    }
}

// Example usage: Fetch and display details for a given Patient ID
document.addEventListener('DOMContentLoaded', () => {
    const patientId = 'PATIENT_ID_TO_FETCH';
    fetchUserDetails(patientId);
});