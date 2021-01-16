window.onload = function() {
    document.getElementById("menu-icon").addEventListener("click", toggleAside);
    document.getElementById("aside-close-icon").addEventListener("click", toggleAside);
    var projects = document.getElementsByClassName("project")
    
    for (var i = 0; i < projects.length; i++) {
        projects[i].addEventListener("click", selectProject);
    }

    var imgs = document.getElementsByClassName("project-img")
    
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", openImgPreview);
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


function openImgPreview() {
    var imgSrc = this.src;
    var imgPreviewScreen = document.getElementById("img-preview-screen");
    var imgPreview = document.getElementById("img-preview");
    imgPreview.src = imgSrc;
    imgPreviewScreen.addEventListener("click", closeImgPreview)
    imgPreviewScreen.classList.remove("hidden");
}


function closeImgPreview() {
    this.classList.add("hidden");
}