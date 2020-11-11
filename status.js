let debuggingInfoShown = false;
			
function getSpinnerHTML(width, height) {
	return `<div class="spinner-border" style="width: ${width}rem; height: ${height}rem;" role="status"><span class="sr-only">Loading...</span></div>`;
}

function getCheckMarkHTML(width, height, color) {
	return `<svg width="${width}em" height="${height}em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`;
}

function getTableHTML(data) { 
	const headerItems = ['Name', 'IP', 'Status'];
	const tableElement = document.createElement('table');
	tableElement.classList.add('table');
	tableElement.classList.add('table-striped');
	const headerElement = document.createElement('thead');
	
	headerItems.forEach(val => {
		const th = document.createElement('th');
		th.innerText = val;
		headerElement.appendChild(th);
	});
	
	const bodyElement = document.createElement('tbody');
	
	data.forEach(serverDetails => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.innerText = serverDetails.Tags.filter(tag => tag.Key === 'Name')[0].Value;
		const td2 = document.createElement('td');
		td2.innerText = serverDetails.IP;
		const td3 = document.createElement('td');

		if (serverDetails.Status.Code === 16) {
			td3.innerHTML = getCheckMarkHTML(2, 2, '#228B22');
		}
		
		[td, td2, td3].forEach(child => {
			child.classList.add('align-middle');
			tr.appendChild(child)
		});
		bodyElement.appendChild(tr);
	});
	
	tableElement.appendChild(headerElement);
	tableElement.appendChild(bodyElement);
	
	return tableElement;
}

function getStatus() {
	document.getElementById("raw-json").innerText = 'Loading Data...';
	document.getElementById("table-container").innerHTML = getSpinnerHTML(3, 3);
	fetch('https://4kdsuad7ug.execute-api.us-west-2.amazonaws.com/Dev')
		.then(data => data.json())
		.then(data => {
			document.getElementById("table-container").innerHTML = '';
			document.getElementById("table-container").appendChild(getTableHTML(data));
			document.getElementById("raw-json").innerText = JSON.stringify(data);
		}).catch(error => {
		
		});
}

function onToggleDebuggingInformation() {
	debuggingInfoShown = !debuggingInfoShown;
	document.getElementById("debugging-information").style.visibility = debuggingInfoShown ? 'visible' : 'hidden';
}