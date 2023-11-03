const resizeCheckbox = document.getElementById('resize')

const compressedCheckbox = document.getElementById('compressed')

const changeMimetypeCheckbox = document.getElementById('change_mimetype')

resizeCheckbox.addEventListener('click', () => {
    document.getElementById('resize_option').hidden = !resizeCheckbox.checked;
})

compressedCheckbox.addEventListener('click', () => {
    document.getElementById('compressed_option').hidden = !compressedCheckbox.checked
})

changeMimetypeCheckbox.addEventListener('click', () => {
    document.getElementById('change_mimetype_option').hidden = !changeMimetypeCheckbox.checked
})
