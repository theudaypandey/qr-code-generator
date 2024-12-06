document.addEventListener('DOMContentLoaded', function() {
    const qrText = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    const qrCode = document.getElementById('qr-code');
    const downloadLink = document.getElementById('download-link');

    generateBtn.addEventListener('click', generateQRCode);

    function generateQRCode() {
        const text = qrText.value.trim();
        if (text === '') {
            alert('Please enter some text or URL');
            return;
        }

        qrCode.innerHTML = '';
        downloadLink.classList.add('d-none');

        const qr = qrcode(0, 'L');
        qr.addData(text);
        qr.make();

        const qrImage = qr.createImgTag(5);
        qrCode.innerHTML = qrImage;

        const img = qrCode.querySelector('img');
        img.classList.add('img-fluid');

        makeDownloadable(img);
    }

    function makeDownloadable(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.classList.remove('d-none');
    }
});

