
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

document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const signinButton = document.getElementById('signinButton');

    signinButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const sqlQuery = `SELECT * FROM Users WHERE Email='${email}' AND Password='${password}'`;

        try {
            await executeQuery(sqlQuery);
            alert('Sign in successful!');
            window.location.href = 'account-landing-page.html';
        } catch (error) {
            console.error('Error executing query:', error);
            alert('Error signing in. Please try again.');
        }
    });
});
