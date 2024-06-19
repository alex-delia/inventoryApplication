document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.auto-resize-textarea');

    const autoResize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', autoResize);

    // Initial resize
    autoResize();
});