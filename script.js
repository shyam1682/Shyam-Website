document.addEventListener('DOMContentLoaded', () => {
    const blob = document.getElementById('cursorBlob');
    const title = document.getElementById('mainTitle');

    // Smooth Mouse Follower
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        // Translate the blob with a slight lag for smoothness
        blob.style.transform = `translate(${clientX - 150}px, ${clientY - 150}px)`;
    });

    // Subtle Tilt effect on the title
    title.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY, target } = e;
        const { clientWidth, clientHeight } = target;
        
        const moveX = (offsetX - clientWidth / 2) / 10;
        const moveY = (offsetY - clientHeight / 2) / 10;
        
        target.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    title.addEventListener('mouseleave', (e) => {
        e.target.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });

    console.log("Welcome to Shyam Khambholja's website.");
});
