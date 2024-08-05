document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');
    if (noteId) {
      loadNoteDetails(noteId);
    }
  
    document.getElementById('edit-note-form').addEventListener('submit', function(event) {
      event.preventDefault();
      updateNote();
    });
  });
  
  async function loadNoteDetails(noteId) {
    try {
      const response = await fetch(`/api/notes/${noteId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const note = await response.json();
      document.getElementById('note-id').value = note._id;
      document.getElementById('title').value = note.title;
      document.getElementById('description').value = note.description;
      document.getElementById('date').value = note.date;
      document.getElementById('category').value = note.category;
    } catch (error) {
      console.error('Error loading note details:', error);
    }
  }
  
  async function updateNote() {
    const noteId = document.getElementById('note-id').value;
    const updatedNote = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      category: document.getElementById('category').value,
    };
  
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert(data.message);
      window.location.href = '/notes.html'; // Redirect back to the notes page
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
  