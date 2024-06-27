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
    console.log('Query result:', data);
}

// Example usage in the context of adding personal details
document.addEventListener('DOMContentLoaded', () => {
    const addDetailsButton = document.querySelector('.button12');

    addDetailsButton.addEventListener('click', async function (event) {
        event.preventDefault();

        // Get form input values
        const firstName = document.querySelector('.text10').value;
        const lastName = document.querySelector('.text11').value;
        const dob = document.querySelector('.text12').value;
        const gender = document.querySelector('.text13').value;
        const maritalStatus = document.querySelector('.text14').value;
        const phone = document.querySelector('.text15').value;
        const otherContact = document.querySelector('.text16').value;
        const mothersName = document.querySelector('.text17').value;
        const fathersName = document.querySelector('.text18').value;
        const patientId = document.querySelector('.text19').value;
        const addressLine1 = document.querySelector('.text20').value;
        const addressLine2 = document.querySelector('.address-subfield').value;
        const additionalInfo = document.querySelector('.frame-child').value;

        // Validate form data (simplified validation for demonstration)
        if (!firstName || !lastName || !dob || !gender || !maritalStatus || !phone || !patientId || !addressLine1) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct your SQL query dynamically based on form inputs
        const sqlQuery = `INSERT INTO PersonalDetails (FirstName, LastName, DOB, Gender, MaritalStatus, Phone, OtherContact, MothersName, FathersName, PatientID, AddressLine1, AddressLine2, AdditionalInfo) VALUES ("${firstName}", "${lastName}", "${dob}", "${gender}", "${maritalStatus}", "${phone}", "${otherContact}", "${mothersName}", "${fathersName}", "${patientId}", "${addressLine1}", "${addressLine2}", "${additionalInfo}")`;

        try {
            await executeQuery(sqlQuery);
            alert('Details added successfully!');
            window.location.href = "personal-details-added.html";
        } catch (error) {
            console.error('Error executing query:', error);
            alert('Error adding details. Please try again.');
        }
    });
});

