document.addEventListener('DOMContentLoaded', function () {
  //DOM 요소 가져오기
  const input = document.querySelector('.input');
  const enterButton = document.querySelector('.enter');
  const todoContainer = document.querySelector('.container');
  const currentDateSpan = document.getElementById('currentDate');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const datePicker = document.getElementById('datePicker');
  const themeBtn = document.querySelector('.theme');
  const body = document.body;
  const homeButton = document.querySelector('h2');
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close');
  const todoCountSpan = document.getElementById('todo-count');

  // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  function formatDateToYYYYMMDD(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }

  // 현재 선택된 날짜 (YYYY-MM-DD 형식)
  let currentDate = formatDateToYYYYMMDD(new Date());

  // YYYY-MM-DD 문자열을 "YYYY년 M월 D일" 형식으로 변환
  function formatDate(dateString) {
    const [y, m, d] = dateString.split('-').map(Number);
    return `${y}년 ${m}월 ${d}일`;
  }

  // 현재 날짜 상태를 UI에 반영
  function updateDateUI() {
    currentDateSpan.textContent = formatDate(currentDate);
    datePicker.value = currentDate;
    updateTodoCount();
  }

  // 할 일 리스트 불러오기 (로컬 스토리지)
  function loadTodos() {
    todoContainer.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem(currentDate)) || [];
    todos.forEach(({ id, text, completed }) => addTodoElement(id, text, completed));
    updateTodoCount();
  }

  // 새로운 할 일 요소 추가
  function addTodoElement(id, text, completed = false) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('draggable', true); /*드래그 가능 설정*/
    todoDiv.dataset.id = id; /*순서 저장용*/

    // 체크박스
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.classList.add('checkbox');

    checkbox.addEventListener('change', () => {
      // UI 클래스 토글 먼저
      if (checkbox.checked) {
        todoText.classList.add('completed');
      } else {
        todoText.classList.remove('completed');
      }

      // localStorage Update
      toggleComplete(id, checkbox.checked);

      /*console 확인용
            console.log(
                `Todo "${todoText.textContent}" completed:`,
                todoText.classList.contains("completed")
            );*/
    });

    // Todo 텍스트 요소 생성 (완료 시 CSS 클래스 적용)
    const todoText = document.createElement('span');
    todoText.textContent = text;
    if (completed) {
      todoText.classList.add('completed');
    }

    // 삭제버튼
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => removeTodo(id));

    todoDiv.append(checkbox, todoText, deleteButton);
    todoContainer.appendChild(todoDiv);

    // 드래그 이벤트 추가
    addDragAndDropListeners(todoDiv);
  }

  // 드래그 이벤트 함수
  let placeholder = null;

  function addDragAndDropListeners(item) {
    item.draggable = true;

    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
      placeholder = document.createElement('div');
      placeholder.classList.add('todo', 'placeholder');
      item.parentNode.insertBefore(placeholder, item.nextSibling);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      if (placeholder) {
        placeholder.parentNode.replaceChild(item, placeholder);
        placeholder = null;
        saveNewOrder(); // localStorage에 순서 저장
      }
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const container = item.parentNode;
      const draggingItem = document.querySelector('.dragging');
      if (draggingItem === item) return;

      const rect = item.getBoundingClientRect();
      const offset = e.clientY - rect.top;
      const middle = rect.height / 2;

      if (offset > middle) {
        container.insertBefore(placeholder, item.nextSibling);
      } else {
        container.insertBefore(placeholder, item);
      }
    });
  }

  // 순서 변경 후 LocalStorage에 저장
  function saveNewOrder() {
    const todos = [];
    todoContainer.querySelectorAll('.todo').forEach((todoDiv) => {
      const id = todoDiv.dataset.id;
      const text = todoDiv.querySelector('span').textContent;
      const completed = todoDiv.querySelector('input').checked;
      todos.push({ id, text, completed });
    });
    localStorage.setItem(currentDate, JSON.stringify(todos));
  }

  // 할 일 추가
  function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    const todos = JSON.parse(localStorage.getItem(currentDate)) || [];
    const newTodo = { id: crypto.randomUUID(), text, completed: false };

    todos.push(newTodo);
    localStorage.setItem(currentDate, JSON.stringify(todos));
    addTodoElement(newTodo.id, text);
    input.value = '';
    updateTodoCount();
  }

  // 할 일 삭제
  function removeTodo(id) {
    let todos = JSON.parse(localStorage.getItem(currentDate)) || [];
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(currentDate, JSON.stringify(todos));
    loadTodos();
  }

  // 완료 상태 체크박스
  function toggleComplete(id, isCompleted) {
    let todos = JSON.parse(localStorage.getItem(currentDate)) || [];
    todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: isCompleted } : todo));
    localStorage.setItem(currentDate, JSON.stringify(todos));
    loadTodos();
  }

  // Todo 개수 업데이트 함수 (체크된 항목 제외)
  function updateTodoCount() {
    const todos = JSON.parse(localStorage.getItem(currentDate)) || [];
    const activeTodos = todos.filter((todo) => !todo.completed).length;
    todoCountSpan.textContent = activeTodos;
  }

  // 현재 날짜를 기준으로 days 만큼 이동
  function changeDate(days) {
    const [y, m, d] = currentDate.split('-').map(Number);
    const newDate = new Date(y, m - 1, d);

    newDate.setDate(newDate.getDate() + days);
    currentDate = formatDateToYYYYMMDD(newDate);

    updateDateUI();
    loadTodos();
  }

  // 다크모드 설정
  function loadTheme() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    body.classList.toggle('dark-mode', isDarkMode);
    themeBtn.textContent = isDarkMode ? '☀️다크모드 해제' : '다크모드 설정🌙';
  }

  function toggleTheme() {
    const isDarkMode = body.classList.toggle('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️다크모드 해제' : '다크모드 설정🌙';
    localStorage.setItem('darkMode', isDarkMode);
  }

  // 사이드바 열기/닫기 기능
  function openSidebar() {
    sidebar.style.left = '0';
  }

  function closeSidebar() {
    sidebar.style.left = '-250px';
  }

  // 사이드바 외부 클릭 처리 - Early Return 패턴 적용
  function handleOutsideClick(event) {
    if (sidebar.contains(event.target) || hamburger.contains(event.target)) return;
    closeSidebar();
  }

  // Enter 입력 시 Todo 추가 (한글 IME 조합 중 입력 방지 <-- React에서 수정필요!)
  enterButton.addEventListener('click', addTodo);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  prevButton.addEventListener('click', () => changeDate(-1));
  nextButton.addEventListener('click', () => changeDate(1));

  datePicker.addEventListener('change', function () {
    currentDate = this.value;
    updateDateUI();
    loadTodos();
  });

  document.querySelectorAll('.weekBtn').forEach((button) => {
    button.addEventListener('click', () => changeDate(parseInt(button.dataset.days)));
  });

  // 홈 버튼 클릭 시 오늘 날짜로 이동
  homeButton.addEventListener('click', () => {
    currentDate = formatDateToYYYYMMDD(new Date());
    updateDateUI();
    loadTodos();
  });

  themeBtn.addEventListener('click', toggleTheme);
  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', handleOutsideClick);

  // 초기 실행
  updateDateUI();
  loadTodos();
  loadTheme();
});
