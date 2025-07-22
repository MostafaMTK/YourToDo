'use strict';
const ul = document.querySelector('.list ul');
const remaining = document.querySelector('.remaining span');
const inputData = document.querySelector('.input input');
const addBtn = document.querySelector('.input button');
const showAll = function () {
  [
    ...document.querySelectorAll('.normal-li'),
    ...document.querySelectorAll('.done-li'),
  ].forEach(function (item) {
    item.classList.remove('hidden');
  });
};
const addTask = function (e) {
  e.preventDefault();
  if (inputData.value === '') {
    const error = document.querySelector('.error');
    error.classList.add('show-error');
    error.textContent = 'Please Type The Task First';
    setTimeout(function () {
      error.classList.remove('show-error');
      error.textContent = '';
    }, 3000);
  } else {
    document.querySelector('.filters #all').checked = true;
    showAll();
    const newTask = document.createElement('li');
    const newDiv = document.createElement('div');
    newDiv.id = `task-${
      document.querySelectorAll('.normal').length +
      document.querySelectorAll('.finished').length
    }`;
    newDiv.classList.add('normal');
    newTask.classList.add('normal-li');
    newDiv.textContent = inputData.value;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    newTask.appendChild(newDiv);
    newTask.appendChild(deleteBtn);
    ul.appendChild(newTask);
    remaining.textContent = Number(remaining.textContent) + 1;
    inputData.value = '';
    newDiv.addEventListener('click', function () {
      newDiv.classList.toggle('normal');
      newDiv.classList.toggle('finished');
      newTask.classList.toggle('normal-li');
      newTask.classList.toggle('done-li');
      remaining.textContent = document.querySelectorAll('.normal').length;
    });
    deleteBtn.addEventListener('click', function () {
      ul.removeChild(newTask);
      remaining.textContent = Number(remaining.textContent) - 1;
      newTask.remove();
    });
  }
};
const loadData = function () {
  if (localStorage.getItem('tasksN')) {
    console.log(localStorage.getItem('tasksN'));
    JSON.parse(localStorage.getItem('tasksN')).forEach(function (item) {
      const newTask = document.createElement('li');
      const newDiv = document.createElement('div');
      newDiv.id = `task-${
        document.querySelectorAll('.normal').length +
        document.querySelectorAll('.finished').length
      }`;
      newDiv.classList.add('normal');
      newTask.classList.add('normal-li');
      newDiv.textContent = item;
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      newTask.appendChild(newDiv);
      newTask.appendChild(deleteBtn);
      ul.appendChild(newTask);
      remaining.textContent = Number(remaining.textContent) + 1;
      newDiv.addEventListener('click', function () {
        newDiv.classList.toggle('normal');
        newDiv.classList.toggle('finished');
        newTask.classList.toggle('normal-li');
        newTask.classList.toggle('done-li');
        remaining.textContent = document.querySelectorAll('.normal').length;
      });
      deleteBtn.addEventListener('click', function () {
        ul.removeChild(newTask);
        remaining.textContent = Number(remaining.textContent) - 1;
        newTask.remove();
      });
    });
  }
  if (localStorage.getItem('tasksD')) {
    JSON.parse(localStorage.getItem('tasksD')).forEach(function (item) {
      const newTask = document.createElement('li');
      const newDiv = document.createElement('div');
      newDiv.id = `task-${
        document.querySelectorAll('.normal').length +
        document.querySelectorAll('.finished').length
      }`;
      newDiv.classList.add('finished');
      newTask.classList.add('done-li');
      newDiv.textContent = item;
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      newTask.appendChild(newDiv);
      newTask.appendChild(deleteBtn);
      ul.appendChild(newTask);
      newDiv.addEventListener('click', function () {
        newDiv.classList.toggle('normal');
        newDiv.classList.toggle('finished');
        newTask.classList.toggle('normal-li');
        newTask.classList.toggle('done-li');
        remaining.textContent = document.querySelectorAll('.normal').length;
      });
      deleteBtn.addEventListener('click', function () {
        ul.removeChild(newTask);
        remaining.textContent = Number(remaining.textContent) - 1;
        newTask.remove();
      });
    });
  }
};
loadData();
addBtn.addEventListener('click', addTask);
document.querySelector('.filters #all').addEventListener('click', showAll);
document.querySelector('.filters #done').addEventListener('click', function () {
  document.querySelectorAll('.done-li').forEach(function (item) {
    item.classList.remove('hidden');
  });
  document.querySelectorAll('.normal-li').forEach(function (item) {
    item.classList.add('hidden');
  });
});
document.querySelector('.filters #todo').addEventListener('click', function () {
  document.querySelectorAll('.normal-li').forEach(function (item) {
    item.classList.remove('hidden');
  });
  document.querySelectorAll('.done-li').forEach(function (item) {
    item.classList.add('hidden');
  });
});
document.querySelector('.save button').addEventListener('click', function () {
  const dataN = [];
  document.querySelectorAll('.normal').forEach(function (item) {
    dataN.push(item.textContent);
  });
  const dataD = [];
  document.querySelectorAll('.finished').forEach(function (item) {
    dataD.push(item.textContent);
  });
  localStorage.setItem('tasksN', JSON.stringify(dataN));
  localStorage.setItem('tasksD', JSON.stringify(dataD));
  console.log(localStorage.getItem('tasksN'), localStorage.getItem('tasksD'));
});
