// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const qrText = document.getElementById("qrText");
    const qrImage = document.getElementById("qrImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const generateBtn = document.getElementById("generateBtn"); // Assuming a button exists

    // Your deployed backend URL on Render
    const backendUrl = "https://qr-code-app-fdp6.onrender.com/api/qrcode";

    // Debugging: Check if elements exist
    if (!qrText || !qrImage || !downloadBtn || !generateBtn) {
        console.error("One or more elements not found! Check your HTML IDs.");
        return;
    }

    // Function to generate QR code
    window.generateQRCode = function () {
        const text = qrText.value.trim();
        if (!text) {
            alert("Please enter text or URL to generate a QR Code.");
            return;
        }

        // Show loading state
        generateBtn.textContent = "Generating...";
        generateBtn.disabled = true;
        qrImage.src = ""; // Clear previous QR code

        fetch(`${backendUrl}?q=${encodeURIComponent(text)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.qrCode) {
                    qrImage.src = data.qrCode;
                    qrImage.classList.remove("d-none");
                    downloadBtn.href = data.qrCode;
                    downloadBtn.classList.remove("d-none");
                } else {
                    console.error("Invalid response from server.", data);
                    alert("Failed to generate QR code. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error generating QR Code:", error);
                alert(`Error: ${error.message}`);
            })
            .finally(() => {
                // Reset loading state
                generateBtn.textContent = "Generate QR Code";
                generateBtn.disabled = false;
            });
    };

    // Function to refresh the page
    window.refreshPage = function () {
        location.reload();
    };
});
