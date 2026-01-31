function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.remove('hidden');
  }
}

const checklistTasks = [
  "Matikan lampu saat tidak digunakan",
  "Bawa botol minum sendiri",
  "Gunakan transportasi umum atau sepeda",
  "Pisahkan sampah organik dan anorganik",
  "Kurangi penggunaan plastik sekali pakai",
  "Gunakan kipas angin daripada AC",
  "Matikan keran saat menyikat gigi",
  "Gunakan tas belanja kain",
  "Makan makanan lokal dan musiman",
  "Tanam tanaman di rumah"
];

function loadChecklist() {
  const checklistContainer = document.getElementById("checklist");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const saved = JSON.parse(localStorage.getItem("greenChecklist")) || [];

  checklistContainer.innerHTML = '';
  
  checklistTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center space-x-3 p-2 hover:bg-green-50 rounded";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = saved[index] || false;
    checkbox.className = "w-5 h-5 text-green-600 cursor-pointer";
    
    const label = document.createElement("label");
    label.textContent = task;
    label.className = "text-gray-800 cursor-pointer flex-grow";
    
    checkbox.addEventListener("change", function() {
      const checkboxes = document.querySelectorAll("#checklist input[type='checkbox']");
      const checked = [...checkboxes].filter(cb => cb.checked).length;
      const percent = Math.round((checked / checklistTasks.length) * 100);
      progressBar.style.width = percent + "%";
      progressText.textContent = `${percent}% selesai`;
      localStorage.setItem("greenChecklist", JSON.stringify([...checkboxes].map(cb => cb.checked)));
    });
    
    li.appendChild(checkbox);
    li.appendChild(label);
    checklistContainer.appendChild(li);
  });

  const checkboxes = document.querySelectorAll("#checklist input[type='checkbox']");
  const checked = [...checkboxes].filter(cb => cb.checked).length;
  const percent = Math.round((checked / checklistTasks.length) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% selesai`;
}

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let komitmenTasks = JSON.parse(localStorage.getItem("greenTasks")) || [];

function saveTasks() {
  localStorage.setItem("greenTasks", JSON.stringify(komitmenTasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  komitmenTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-green-100 p-3 rounded hover:bg-green-200";

    const label = document.createElement("label");
    label.className = "flex items-center space-x-2 cursor-pointer flex-grow";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.className = "w-5 h-5 text-green-600 cursor-pointer";
    checkbox.addEventListener("change", () => {
      komitmenTasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.done ? "line-through text-gray-500" : "text-gray-800";

    label.appendChild(checkbox);
    label.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.type = "button";
    deleteBtn.className = "text-red-500 hover:text-red-700 ml-2";
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      komitmenTasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== "") {
    komitmenTasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

loadChecklist();
renderTasks();
showSection('home');