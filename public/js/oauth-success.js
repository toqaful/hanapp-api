window.onload = function () {
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

    if (token) {
        // Save token to localStorage
        localStorage.setItem('token', token);

        // Optional: You can add other login state handling here
        console.log("OAuth token saved.");

        // Redirect to index.html after short delay
        setTimeout(() => {
        //   window.location.href = "/";
        }, 100); // Adjust delay as needed
    } else {
        document.body.innerHTML = "<h2>Error: Token not found in URL.</h2>";
    }
};