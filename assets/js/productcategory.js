document.addEventListener('DOMContentLoaded', function() {
    // Get all category headers
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    // Automatically expand all categories
    categoryHeaders.forEach(header => {
        // Add active class to the header
        header.classList.add('active');
        
        // Get the category ID from the data attribute
        const categoryId = header.getAttribute('data-category');
        
        // Find the corresponding subcategories container
        const subcategoriesContainer = document.getElementById(`${categoryId}-subcategories`);
        
        // Add active class to show subcategories
        subcategoriesContainer.classList.add('active');
        
        // Update the toggle icon
        const toggleIcon = header.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.textContent = '×'; // Set the icon to the expanded state
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});