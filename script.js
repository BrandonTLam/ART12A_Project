// --- Grid Randomizer ---
// Shuffles the grid items on page load for a non-linear experience.
window.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.video-grid');
    const items = Array.from(grid.querySelectorAll('.video-item'));

    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => grid.appendChild(item));
});

// --- Journal Content ---
// This has been updated with your 48-hour strike journal entry.
const journalData = {
    "1": {
        content: "The first day was difficult. I found myself reaching for my phone during quiet moments, like while eating or before bed. The automatic action showed me how deep the habit was."
    },
    "2": {
        content: "The initial silence felt strange, and I was restless. Without my usual YouTube videos or short content, the house seemed too quiet, and I had to find ways to fill the time."
    },
    "3": {
        content: "To fill this new space, I turned to other activities. I listened to music, went on walks, and read books. I even completed small tasks around my home that I had been putting off for weeks."
    },
    "4": {
        content: "On the second day, I noticed a real change. It wasn't about a specific activity, but a general feeling, my mind simply felt calmer and less cluttered."
    },
    "5": {
        content: "The most noticeable change was the freedom from the constant urge to check the app. That persistent thought in the back of my mind was finally gone."
    },
    "6": {
        content: "The strike proved how much I used it to simply avoid boredom, and it was a good test to understand my own habits better and find new ways to relax."
    },
    "7": {
        content: "The clock seemed to move slower. I paced around my house, unsure what to do. Every quiet moment was a reminder of the time I now had to fill."
    },
    "8": {
        content: "Ultimately, I realized I wasn't missing the content, just the constant distraction. The goal wasn't to stop being entertained, but to reclaim my own attention from the algorithm."
    }
};

// --- Application Logic ---
const modal = document.getElementById('journal-modal');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');
const videoItems = document.querySelectorAll('.video-item');
const endScreen = document.getElementById('end-screen');

const viewedEntries = new Set();

function openModal(entry) {
    modalBody.innerHTML = '';
    const textElement = document.createElement('p');
    textElement.textContent = entry.content;
    modalBody.appendChild(textElement);
    modal.className = 'modal-visible';
}

// MODIFICATION: The end screen check now happens when the modal is closed.
function closeModal() {
    modal.className = 'modal-hidden';
    // The check for the end condition is now called HERE.
    checkEndCondition();
}

// MODIFICATION: The setTimeout is removed for a more immediate feel.
function checkEndCondition() {
    // If all entries have been viewed...
    if (viewedEntries.size === videoItems.length) {
        // ...show the end screen immediately after the modal closes.
        endScreen.className = 'modal-visible';
    }
}

// Add click listeners to all video items
videoItems.forEach(item => {
    item.addEventListener('click', () => {
        const entryId = item.getAttribute('data-entry-id');
        const entry = journalData[entryId];
        if (entry) {
            openModal(entry);
            viewedEntries.add(entryId);
            // MODIFICATION: The checkEndCondition() call has been REMOVED from this spot.
        }
    });
});

// Add listeners to close the modal (no changes needed here)
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
