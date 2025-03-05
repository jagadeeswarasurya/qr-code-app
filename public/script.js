// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const qrText = document.getElementById("qrText");
    const qrImage = document.getElementById("qrImage");
    const downloadBtn = document.getElementById("downloadBtn");

    // Your deployed backend URL on Render
    const backendUrl = "https://qr-code-app-fdp6.onrender.com/api/qrcode";

    // Debugging: Check if elements exist
    if (!qrText || !qrImage || !downloadBtn) {
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

        fetch(`${backendUrl}?text=${encodeURIComponent(text)}`)
            .then(response => response.json())
            .then(data => {
                if (data.qrCode) {
                    qrImage.src = data.qrCode;
                    qrImage.classList.remove("d-none");
                    downloadBtn.href = data.qrCode;
                    downloadBtn.classList.remove("d-none");
                } else {
                    console.error("Invalid response from server.");
                }
            })
            .catch(error => {
                console.error("Error generating QR Code:", error);
            });
    };

    // Function to refresh the page
    window.refreshPage = function () {
        location.reload();
    };
});
