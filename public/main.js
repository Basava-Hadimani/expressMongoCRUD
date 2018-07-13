var update = document.getElementById('update')

update.addEventListener('click', function () {
// Send PUT Request here
	fetch('quotes', {
	method: 'put',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify({
	'name': 'Darth Vader',
	'quote': 'I find your lack of faith disturbing.'
	})
	}).then(res => {
		if (res.ok) return res.json()
		})
		.then(data => {
		console.log(data)
	})
})