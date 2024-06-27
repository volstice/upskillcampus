// Function to execute SQL query
async function executeQuery(query) {
    const endpoint = 'YOUR_RDS_ENDPOINT'; // Replace with your AWS RDS endpoint
    const database = 'DATABASE_NAME'; // Replace with your database name
    const username = 'USERNAME'; // Replace with your database username
    const password = 'PASSWORD'; // Replace with your database password

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

// Example usage in the context of signup
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupButton = document.getElementById('signupButton');

    signupButton.addEventListener('click', async function (event) {
        event.preventDefault();

        // Get form input values
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const password = document.getElementById('password').value;
        const termsChecked = document.getElementById('termsCheckbox').checked;

        // Validate form data (simplified validation for demonstration)
        if (!email || !firstName || !lastName || !password || !termsChecked) {
            alert('Please fill in all fields and accept the terms.');
            return;
        }

        // Generate a random patient ID for demonstration
        const patientId = Math.floor(Math.random() * 99999) + 10000;


        // Construct your SQL query dynamically based on form inputs
        const sqlQuery = `INSERT INTO Users (Pid, Fname, Lname, Email, Password) VALUES ("${patientId}", ${firstName}", "${lastName}", "${email}", "${password}")`;

        try {
            const result= await executeQuery(sqlQuery);
            alert('User signed up successfully!');
            // Optionally, redirect to another page or perform additional actions
        } catch (error) {
            console.error('Error executing query:', error);
            alert('Error signing up. Please try again.');
        }
    });
});