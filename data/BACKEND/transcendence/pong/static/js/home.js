import { initializeSPA, setupNavigation } from './spa.js';

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation('#btn-start');
    initializeSPA();
});
