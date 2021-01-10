window.onload = function() {
    document.getElementById("menu-icon").addEventListener("click", toggleAside);
    document.getElementById("aside-close-icon").addEventListener("click", toggleAside);
    var projects = document.getElementsByClassName("project")
    
    for (var i = 0; i < projects.length; i++) {
        projects[i].addEventListener("click", selectProject);
    }
}

function toggleAside() {

    window.scrollTo(0, 0);
    var main = document.getElementsByTagName("main");
    var sidebar = document.getElementById("sidebar");

    if(sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
        main[0].classList.remove("scroll-blocked");
    } else {
        sidebar.classList.add("show");
        main[0].classList.add("scroll-blocked");
    }
}

function selectProject() {

    var projects = document.getElementsByClassName("project")
    
    for (var i = 0; i < projects.length; i++) {
        projects[i].classList.remove("active-project");
    }

    this.classList.add("active-project");
}