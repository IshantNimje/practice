document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
    document.getElementById('note-form').addEventListener('submit', addNote);
    document.getElementById('search').addEventListener('input', searchNotes);
  });
  
  async function fetchNotes() {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const notes = await response.json();
      renderNotes(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  
  function renderNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <p>${note.date}</p>
        <p>${note.category}</p>
        <a href="/edit.html?id=${note._id}">Edit</a>
        <button onclick="deleteNote('${note._id}')">Delete</button>
      `;
      notesContainer.appendChild(noteElement);
    });
  }
  
  async function addNote(event) {
    event.preventDefault();
    const note = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      category: document.getElementById('category').value,
    };
  
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert(data.message);
      document.getElementById('note-form').reset();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }
  
  async function deleteNote(id) {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert(data.message);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
  
  function searchNotes(event) {
    const query = event.target.value.toLowerCase();
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
      const title = note.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query)) {
        note.style.display = '';
      } else {
        note.style.display = 'none';
      }
    });
  }
  