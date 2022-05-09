const lists = [];

const checkInput = (inputList) => {
  inputList.forEach((item) => {
    item.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem('Tasks'));
      const parent = item.parentNode;
      const grandParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(grandParent.children, parent);
      const status = tasks[index].complete;
      const line = parent.children.item(1);
      const dot = parent.children.item(2);
      const trash = parent.children.item(3);
      if (status) {
        item.removeAttribute('checked');
        dot.style.display = 'block';
        trash.style.display = 'none';
        line.classList.remove('lineThrough');
        tasks[index].complete = false;
      } else {
        item.setAttribute('checked', '');
        dot.style.display = 'none';
        trash.style.display = 'block';
        line.classList.add('lineThrough');
        tasks[index].complete = true;
      }
      localStorage.setItem('Tasks', JSON.stringify(tasks));
      lists.splice(0, lists.length, ...tasks);
    });
  });
};

const deleteEl = () => {
  const trashBtn = document.querySelectorAll('.fa-trash-o');
  trashBtn.forEach((element) => {
    const parentElement = element.parentNode;
    const grandParent = parentElement.parentNode;
    const index = Array.prototype.indexOf.call(grandParent.children, parentElement);
    const inputList = parentElement.children.item(0);
    element.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem('Tasks'));
      lists.splice(0, lists.length, ...tasks);
      if (inputList.hasAttribute('checked')) {
        parentElement.remove();
        lists.splice(index, 1);
      }
      for (let i = 0; i < lists.length; i += 1) {
        lists[i].index = i + 1;
      }
      localStorage.setItem('Tasks', JSON.stringify(lists));
    });
  });
};

const clearAllComplete = () => {
  const tasks = JSON.parse(localStorage.getItem('Tasks'));
  lists.splice(0, lists.length, ...tasks);
  const clearAllDone = document.querySelector('#clear');
  clearAllDone.addEventListener('click', () => {
    const filterList = lists.filter((item) => !item.complete, ...lists);
    for (let i = 0; i < filterList.length; i += 1) {
      filterList[i].index = i + 1;
    }
    localStorage.setItem('Tasks', JSON.stringify(filterList));
    document.location.reload();
  });
};

const updateDescription = () => {
  const labelCheck = document.querySelectorAll('.label_check');
  labelCheck.forEach((item) => {
    const parent = item.parentNode;
    const grandParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(grandParent.children, parent);
    item.addEventListener('change', () => {
      lists[index].description = item.value;
      localStorage.setItem('Tasks', JSON.stringify(lists));
    });
  });
};

const displayUI = () => {
  const listSection = document.querySelector('.list_section');
  const tasks = JSON.parse(localStorage.getItem('Tasks'));
  lists.splice(0, lists.length, ...tasks);
  let showList = '';
  tasks.forEach((todo) => {
    showList += `
              <div class="flex_check">
                      <input type="checkbox" class="input_checkBox">
                      <input type="text" class="label_check" value="${todo.description}">   
                      <i class="fa fa-ellipsis-vertical"></i>                            
                      <i class="fa fa-trash-o"></i>                            
              </div>
                  `;
  });
  listSection.innerHTML = showList;
  const inputList = document.querySelectorAll('.input_checkBox');
  checkInput(inputList);
  deleteEl();
  clearAllComplete();
  updateDescription();
};

const addLocalStorage = () => {
  const typeList = document.querySelector('.type-list');
  const newTodo = document.querySelector('#new-todo');
  typeList.addEventListener('keyup', (event) => {
    event.preventDefault();
    const data = newTodo.value;
    if (event.key === 'Enter' && data) {
      if (!lists) {
        // eslint-disable-next-line no-const-assign
        lists = [];
      }
      newTodo.value = '';
      const object = {
        description: data,
        complete: false,
        index: lists.length + 1,
      };
      lists.push(object);
      localStorage.setItem('Tasks', JSON.stringify(lists));
      displayUI();
    }
  });
};

const updateLocalStorage = () => {
  window.addEventListener('load', () => {
    displayUI();
    const inputList = document.querySelectorAll('.input_checkBox');
    const tasks = JSON.parse(localStorage.getItem('Tasks'));
    inputList.forEach((item) => {
      const parent = item.parentNode;
      const grandParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(grandParent.children, parent);
      const status = tasks[index].complete;
      const line = parent.children.item(1);
      const dot = parent.children.item(2);
      const trash = parent.children.item(3);
      if (status) {
        item.setAttribute('checked', '');
        dot.style.display = 'none';
        trash.style.display = 'block';
        line.classList.add('lineThrough');
        tasks[index].complete = true;
      }
    });
  });
};
updateLocalStorage();
addLocalStorage();
displayUI();