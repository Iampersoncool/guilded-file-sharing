const form = document.querySelector('form')
const fileLink = document.querySelector('.file-link')
const copyBtn = document.querySelector('.copy-btn')

form.onsubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData()
  const [file] = e.target.querySelector('input[type=file]').files
  console.log(file)

  formData.append('file', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) return alert('Error uploading file')

  const fileUrl = await response.text()
  fileLink.value = fileUrl
}

copyBtn.onclick = (e) => {
  if (fileLink.value.trim() === '') return

  navigator.clipboard.writeText(fileLink.value)
}
