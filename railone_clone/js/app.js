// Simple View Management
function switchView(viewId) {
    console.log("Switching to", viewId);

    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Show selected view
    document.getElementById(viewId).classList.add('active');

    // Update bottom nav state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        // Simple logic to match bottom nav with correct active state
        // In a real app we'd map this explicitly
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(viewId)) {
            item.classList.add('active');
        }
    });

    // Scroll top
    document.getElementById('main-content').scrollTop = 0;
}

// Add simple interactivity to Train details swap button
document.addEventListener('DOMContentLoaded', () => {
    const swapBtn = document.querySelector('.swap-btn');
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.station-selector input');
            if (inputs.length === 2) {
                const temp = inputs[0].value;
                inputs[0].value = inputs[1].value;
                inputs[1].value = temp;

                // Add a little spin animation
                swapBtn.style.transform = `translateY(-50%) rotate(180deg)`;
                setTimeout(() => {
                    swapBtn.style.transition = "none";
                    swapBtn.style.transform = `translateY(-50%) rotate(0deg)`;
                    setTimeout(() => swapBtn.style.transition = "all 0.25s", 50);
                }, 250);
            }
        });
    }

    const searchBtn = document.querySelector('.search-trains-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const originalText = searchBtn.innerText;
            searchBtn.innerText = "Searching...";
            searchBtn.style.opacity = "0.7";

            setTimeout(() => {
                searchBtn.innerText = "No Trains Found (Mock)";
                setTimeout(() => {
                    searchBtn.innerText = originalText;
                    searchBtn.style.opacity = "1";
                }, 2000);
            }, 1000);
        });
    }
});
