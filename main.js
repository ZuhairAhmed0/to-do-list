// Setting Up Variables

const theInput = document.querySelector('.add-task input');
const addButton = document.querySelector('.add-task .plus');
const tasksContainer = document.querySelector('.tasks-content');
const tasksCount = document.querySelector('.tasks-count span');
const tasksCompleted = document.querySelector('.tasks-completed span');
const noTaskMgs = document.querySelector('.no-tasks-message');

//focus On Input field
window.addEventListener('load', () => {
	theInput.focus();
	let i = 0;
	while (localStorage.getItem(i)) {
		tasksContainer.insertAdjacentHTML('beforeend', localStorage.getItem(i));
		i++;
	}
	CalculateTasks();
	noTaskMgs.remove();
});

//adding the Task

addButton.addEventListener('click', () => {
	if (theInput.value) {
		const noTaskMgs = document.querySelector('.no-tasks-message');
		if (document.body.contains(noTaskMgs)) {
			//Remmove No Tasks Message
			noTaskMgs.remove();
		}
      
		let html = `
      <span class="task-box">
         ${theInput.value} <span class="delete">Delete</span>
      </span>
      `;
		localStorage.setItem(document.querySelectorAll('.task-box').length, html);
		tasksContainer.insertAdjacentHTML('beforeend', html);
		theInput.value = '';
		theInput.focus();
		CalculateTasks();
	} else {
		//If Input Is Empty
		console.log('No Task');
	}
});

tasksContainer.addEventListener('click', (e) => {
	//delete task
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
		if (tasksContainer.childElementCount == 0) {
			tasksContainer.insertAdjacentHTML(
				'beforeend',
				`
         <span class="no-tasks-message">No Tasks to Show</span>
         `,
			);
		}
	}

	//completed task
	if (e.target.classList.contains('task-box')) {
		e.target.classList.toggle('finished');
	}

	// count tasks
	CalculateTasks();
});

function CalculateTasks() {
	// Calculate all tasks
	tasksCount.textContent = document.querySelectorAll('.task-box').length;
	//Calculate completed tasks
	tasksCompleted.textContent = document.querySelectorAll('.finished').length;
}
