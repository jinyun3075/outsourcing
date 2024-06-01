document.addEventListener('DOMContentLoaded', function() {
    const videoLinks = document.querySelectorAll('.pop');
    const overlay = document.getElementById('videoOverlay');
    const overlayVideo = document.getElementById('overlayVideo');
    const closeButton = document.getElementById('closeButton');

    videoLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            const src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            overlayVideo.src = src;
            overlay.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        overlayVideo.src = '';
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            overlayVideo.src = '';
        }
    });
});