loadHeader();
loadFooter();
loadSidebar();

function loadHeader() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            });
    });
}

function loadFooter() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            });
    });
}

function loadSidebar() {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('partials/sidebar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('sidebar').innerHTML = data;
            });
    });
}

function navigateToPage() {
    const mobileNav = document.getElementById('mobile-nav');
    const selectedPage = mobileNav.value;
    if(selectedPage) {
        window.location.href = selectedPage;
    }
}