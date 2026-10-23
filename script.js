const STORAGE_KEY = "reading-list-books";
const MAX_TITLE_LENGTH = 60;
const STATUSES = ["Want to Read", "Reading", "Finished"];

const form = document.getElementById("bookForm");
const titleInput = document.getElementById("titleInput");
const statusInput = document.getElementById("statusInput");
const errorMsg = document.getElementById("errorMsg");
const charCount = document.getElementById("charCount");
const bookList = document.getElementById("bookList");
const emptyMsg = document.getElementById("emptyMsg");
const filterButtons = document.querySelectorAll(".chip");

let books = loadBooks();
let currentFilter = "All";

// ---------- Storage (browser only) ----------
function loadBooks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveBooks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
        /* storage unavailable - app still works for this session */
    }
}

// ---------- Validation ----------
function normalise(title) {
    // lowercase + collapse extra spaces, so "  Atomic   HABITS " === "atomic habits"
    return title.trim().replace(/\s+/g, " ").toLowerCase();
}

function validate(title) {
    if (title.trim() === "") return "Please enter a book title.";
    if (title.trim().length > MAX_TITLE_LENGTH) return "Book title must be 60 characters or fewer.";
    const exists = books.some(b => normalise(b.title) === normalise(title));
    if (exists) return "This book is already in your reading list.";
    return "";
}

// ---------- Actions ----------
function addBook(title, status) {
    books.push({ id: Date.now(), title: title.trim().replace(/\s+/g, " "), status });
    saveBooks();
    render();
}

function changeStatus(id, status) {
    const book = books.find(b => b.id === id);
    if (book) book.status = status;
    saveBooks();
    render();
}

function deleteBook(id) {
    books = books.filter(b => b.id !== id);
    saveBooks();
    render();
}

// ---------- Rendering ----------
function renderSummary() {
    document.getElementById("totalCount").textContent = books.length;
    document.getElementById("readingCount").textContent = books.filter(b => b.status === "Reading").length;
    document.getElementById("finishedCount").textContent = books.filter(b => b.status === "Finished").length;
}

function statusClass(status) {
    return "status-" + status.toLowerCase().replace(/\s+/g, "-");
}

function render() {
    renderSummary();
    bookList.innerHTML = "";

    if (books.length === 0) {
        emptyMsg.textContent = "Your reading list is empty. Add your first book.";
        emptyMsg.hidden = false;
        return;
    }

    const visible = currentFilter === "All" ? books : books.filter(b => b.status === currentFilter);

    if (visible.length === 0) {
        emptyMsg.textContent = `No books with status "${currentFilter}".`;
        emptyMsg.hidden = false;
        return;
    }
    emptyMsg.hidden = true;

    visible.forEach(book => {
        const li = document.createElement("li");
        li.className = "card book " + statusClass(book.status);

        const title = document.createElement("h3");
        title.textContent = book.title;

        const controls = document.createElement("div");
        controls.className = "book-controls";

        const select = document.createElement("select");
        select.setAttribute("aria-label", "Change status of " + book.title);
        STATUSES.forEach(s => {
            const opt = document.createElement("option");
            opt.textContent = s;
            opt.selected = s === book.status;
            select.appendChild(opt);
        });
        select.addEventListener("change", () => changeStatus(book.id, select.value));

        const del = document.createElement("button");
        del.className = "btn danger";
        del.textContent = "Delete";
        del.addEventListener("click", () => deleteBook(book.id));

        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = book.status;

        controls.append(select, del);
        li.append(badge, title, controls);
        bookList.appendChild(li);
    });
}

// ---------- Events ----------
form.addEventListener("submit", e => {
    e.preventDefault();
    const title = titleInput.value;
    const error = validate(title);
    errorMsg.textContent = error;
    if (error) return;
    addBook(title, statusInput.value);
    form.reset();
    charCount.textContent = "0 / 60";
    titleInput.focus();
});

titleInput.addEventListener("input", () => {
    const len = titleInput.value.trim().length;
    charCount.textContent = `${len} / ${MAX_TITLE_LENGTH}`;
    charCount.classList.toggle("over", len > MAX_TITLE_LENGTH);
    errorMsg.textContent = "";
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        render();
    });
});

render();
