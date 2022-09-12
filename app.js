const canvas = new Draw(document.querySelector('canvas'))
canvas.Setup()

canvas.SetWidth(800)
canvas.SetHeight(600)
canvas.SetBackgroundColor('#FFFFFF')

const thicknessInput = document.querySelector('#thickness')
const colorInput = document.querySelector('#color')
const zoomResetBtn = document.querySelector('#zoomReset')
const panResetBtn = document.querySelector('#panReset')
const clearBtn = document.querySelector('#clear')
const bgColorInput = document.querySelector('#bgcolor')
const saveBtn = document.querySelector('#save')


thicknessInput.addEventListener('input', (evt) => canvas.SetThickness(evt.target.value))
colorInput.addEventListener('input', (evt) => canvas.SetColor(evt.target.value))
bgColorInput.addEventListener('input', (evt) => canvas.SetBackgroundColor(evt.target.value))
document.addEventListener('wheel', (evt) => canvas.SetZoom(evt.deltaY))
zoomResetBtn.addEventListener('click', () => canvas.ResetZoom())
panResetBtn.addEventListener('click', () => canvas.ResetPan())
clearBtn.addEventListener('click', () => canvas.Clear())
saveBtn.addEventListener('click', () => canvas.DownloadCanvas())