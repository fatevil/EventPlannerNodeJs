if (!isLoggedIn()) {
    window.location.href = "/index.html";
}

// current user name in the navbar
$('#currentUserLink').text(currentUser().name);

$('#logoutLink').click(function() {
    logout();
    window.location.href = "/index.html";
});