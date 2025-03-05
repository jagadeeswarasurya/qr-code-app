document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded!");

    const qrText = document.getElementById("qrText");
    const qrImage = document.getElementById("qrImage");
    const downloadBtn = document.getElementById("downloadBtn");

    // Debugging: Check if elements exist
    if (!qrText || !qrImage || !downloadBtn) {
        console.error("❌ One or more elements not found! Check your HTML IDs.");
        return;
    }

    // Your backend URL for QR Code generation
    const backendUrl = "https://qr-code-app-fdp6.onrender.com/api/qrcode";

    // Function to generate QR Code
    function generateQRCode() {
        const text = qrText.value.trim();
        if (!text) {
            alert("⚠ Please enter text or URL to generate a QR Code.");
            return;
        }

        // Show loading state
        qrImage.classList.add("d-none");
        downloadBtn.classList.add("d-none");

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
                    console.error("❌ Invalid response from server.", data);
                    alert("⚠ Failed to generate QR code. Please try again.");
                }
            })
            .catch(error => {
                console.error("❌ Error generating QR Code:", error);
                alert(`⚠ Error: ${error.message}`);
            });
    }

    // Attach functions to window for global access
    window.generateQRCode = generateQRCode;
    window.refreshPage = () => location.reload();
});
