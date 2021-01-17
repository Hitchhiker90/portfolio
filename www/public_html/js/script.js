window.onload = function() {
    var asideProjectList = document.getElementById("projects");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var projects = JSON.parse(request.responseText)["projects"];
            projects.forEach(element => {
                listProjectInAside(element, asideProjectList)
            });

            for (var i = 1; i < asideProjectList.children.length; i++) {
                asideProjectList.children[i].addEventListener("click", function() {selectProject(this, projects)});
            }

            // Remove class that prevents css transitions firing on load
            document.getElementById("project-overview").classList.remove("preload");
            document.getElementById("sidebar").classList.remove("preload");
            
            trig = new Event('click');
            asideProjectList.children[1].dispatchEvent(trig);
        }
        
    };
    request.open('GET', 'assets/projects.json', true);
    request.send();
    
    document.getElementById("menu-icon").addEventListener("click", toggleAside);
    document.getElementById("aside-close-icon").addEventListener("click", toggleAside);
    
    var imgs = document.getElementsByClassName("project-img")
    
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", openImgPreview);
    }
}


function listProjectInAside(project, projectList) {
    var id = project["id"];
    var name = project["aside-name"];
    var desc = project["aside-desc"];
    var techs = [];
    project["aside-techs"].forEach(tech => {
        techs.push(tech);
    })
    
    projectList.innerHTML += '<article id="' + id + '" class="project"><h2 class="project-name">' + name + '</h2><p class="project-techs">' + techs.join(" - ") + '</p><p class="aside-desc project-desc">' + desc + '</p></article>';
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


async function selectProject(target, projectDict) {

    // Check if project not already selected
    if (target.classList.contains("active-project")) {
        return;
    }

    // Change the selection in the sidebar
    var projects = document.getElementsByClassName("project")
    
    for (var i = 0; i < projects.length; i++) {
        projects[i].classList.remove("active-project");
    }

    target.classList.add("active-project");
    
    // If on mobile, close the side menu
    var main = document.getElementsByTagName("main");
    var sidebar = document.getElementById("sidebar");
    if(sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
        main[0].classList.remove("scroll-blocked");
    }

    // On desktop, phase out the previous contents and wait for the transition to complete
    if (window.visualViewport.width >= 601) {
        document.getElementById("project-overview").classList.add("hidden");
        await new Promise(r => setTimeout(r, 250));
    }

    // Replace the project details in project overview
    projectDict.forEach(element => {
        if (element["id"] == target.getAttribute("id")) {
            
            // Name
            document.getElementById("project-overview-name").innerText = element["overview-name"];
            
            // Description
            var description = document.getElementById("project-overview-desc");
            description.innerHTML = "";

            element["overview-desc"].forEach(paragraph => {
                if (paragraph["type"] == "header") {
                    description.innerHTML += "<h2>" + paragraph["content"] + "</h2>";
                } else {
                    description.innerHTML += "<p class='main-desc project-desc'>" + paragraph["content"] + "</p>";
                }
            })

            // Images
            var desktopImages = document.getElementById("desktop-overview-imgs").children;
            for (var i = 0; i < desktopImages.length; i++) {
                desktopImages[i].setAttribute("src", "assets/" + element["images"][i]);
            }

            var mobileImagesTop = document.getElementById("mobile-overview-imgs-top").children;
            var mobileImagesBottom = document.getElementById("mobile-overview-imgs-bottom").children;
            for (var i = 0; i < mobileImagesTop.length; i++) {
                mobileImagesTop[i].setAttribute("src", "assets/" + element["images"][i]);
            }

            for (var i = 0; i < mobileImagesBottom.length; i++) {
                mobileImagesBottom[i].setAttribute("src", "assets/" + element["images"][i + mobileImagesTop.length]);
            }

            // Links
            var githubLinks = document.getElementsByClassName("github-link");
            for (var i = 0; i < githubLinks.length; i++) {
                githubLinks[i].setAttribute("href", element["github-link"]);
            }

            var demoLinks = document.getElementsByClassName("demo-link");
            for (var i = 0; i < demoLinks.length; i++) {
                demoLinks[i].setAttribute("href", element["demo-link"]);
            }
        }
    });

    // Phase in the new contents
    document.getElementById("project-overview").classList.remove("hidden");

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