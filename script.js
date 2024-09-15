let history = [];
const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retrieveButton = document.getElementById('retrieveButton');
const fontSizePicker = document.getElementById('fontSizePicker');

const canvasContext = canvas.getContext('2d');

colorPicker.addEventListener('change', (e) => {
    canvasContext.strokeStyle = e.target.value;
});

canvasColor.addEventListener('change', (e) => {
    canvasContext.fillStyle = e.target.value;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        canvasContext.beginPath();
        canvasContext.moveTo(lastX, lastY);
        canvasContext.lineTo(e.offsetX, e.offsetY);
        canvasContext.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

fontSizePicker.addEventListener('change', (e) => {
    canvasContext.lineWidth = e.target.value;
});

clearButton.addEventListener('click', () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const currentBackgroundColor = canvasContext.fillStyle;
    const currentSignatureColor = canvasContext.strokeStyle;

    const offScreenCanvas = document.createElement('canvas');
    const offScreenContext = offScreenCanvas.getContext('2d');
    offScreenCanvas.width = canvas.width;
    offScreenCanvas.height = canvas.height;

    offScreenContext.fillStyle = '#FFFFFF';

    if (currentSignatureColor === '#FFFFFF') {
        offScreenContext.fillStyle = '#000000';
    }

    offScreenContext.fillRect(0, 0, offScreenCanvas.width, offScreenCanvas.height);

    offScreenContext.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = offScreenCanvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            canvasContext.drawImage(img, 0, 0);
        };
    }
});
