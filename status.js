let debuggingInfoShown = false;
			
function getSpinnerHTML(width, height) {
	return `<div class="spinner-border" style="width: ${width}rem; height: ${height}rem;" role="status"><span class="sr-only">Loading...</span></div>`;
}

function getCheckMarkHTML(width, height, color) {
	return `<svg width="${width}em" height="${height}em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`;
}

function getStopHTML(width, height, color) {
	return `<svg width="${width}em" height="${height}em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
}

function getQuestionHTML(width, height, color) {
	return `<svg width="${width}em" height="${height}em" viewBox="0 0 16 16" class="bi bi-question-circle-fill" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/></svg>`;
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
		} else if (serverDetails.Status.Code === 80) {
			td3.innerHTML = getStopHTML(2, 2, '#9F000F');
		} else {
			td3.innerHTML = getQuestionHTML(2, 2, '#000000');
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