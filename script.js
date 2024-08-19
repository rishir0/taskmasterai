document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bugModal');
    const closeModalBtn = document.getElementById('closeModal');
    const disableModalBtn = document.getElementById('disableModal');
    const userId = firebase.auth().currentUser.uid;

    // Show modal on page load
    modal.style.display = 'flex';

    // Close modal
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Disable modal for current user
    disableModalBtn.addEventListener('click', function() {
        // Set a flag in localStorage to remember the user's preference
        localStorage.setItem('modalDisabled', true);
        modal.style.display = 'none';
    });

    // Check if the modal should be shown
    if (localStorage.getItem('modalDisabled') === 'true') {
        modal.style.display = 'none';
    }
});
