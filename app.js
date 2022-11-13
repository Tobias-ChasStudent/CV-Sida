/* Projects */
//Get the main area
const divProjects = document.querySelector(".projects");

//Fetch the portfolio JSON file
function portfolioJSON() { 
    fetch("../portfolio.json")
    //Tell js it's a json file
    .then((Response) => Response.json())
    //Do something with the data
    .then((data) => {
        //Get the array of projects
        let arrPortfolio = data.Projects
        //console.log(arrPortfolio);
        
        //Loop through each one and create an element in divProjects
        arrPortfolio.forEach(element => {
            //Get the key of the element
            let itemKey = Object.keys(element)

            //Create an ID
            let itemID = itemKey.toString()
            itemID = itemID.replace(" ", "-")
            //console.log(itemKey);
            //console.log(element[itemKey]);
            
            //Create the article box for the project
            let project = document.createElement("article")
            project.id = itemID
            
            //Create the title and append it to the article
            let header = document.createElement("h3")
            header.textContent = itemKey
            project.appendChild(header)
            
            //Create the text and append it to the article
            let text = document.createElement("p")
            text.textContent = element[itemKey]
            project.appendChild(text)
            
            //Append the project to divProjects
            divProjects.appendChild(project)
        });
    })
    .then(() => {
        //Get the "My Projects" article
        const articleMyProjects = document.querySelector("#My-Projects")

        //Get the modal window
        const sectionModal = document.querySelector(".modal")

        //Get the modal content
        const divModalContent = document.querySelector(".modal-content")

        //Get the close modal button
        const closeModal = document.querySelector("#closeModal")

        //Add event listener to the article to display a modal
        articleMyProjects.addEventListener("click", () => {
            //Display the modal
            sectionModal.classList.add("displayModal")
            document.querySelector("body").style.overflow = "hidden"
        })

        sectionModal.addEventListener("click", (e) => {
            //If the target was not divModalContent
            if (e.target == sectionModal || e.target == closeModal) {
                //Hide the modal
                sectionModal.classList.remove("displayModal")
                document.querySelector("body").style.overflow = "scroll"
                console.log("Hide");
            }
        })
        //Fetch the github api
        fetch("https://api.github.com/users/Tobias-ChasStudent/repos")
        //Tell js the response is in json
        .then((Response) => Response.json())
        .then((data) => {
            //Create a div for the projects
            let projectDiv = document.createElement("div")
            projectDiv.id = "projectDiv"

            //Create a waiting message
            let waitingMessage = document.createElement("h3")
            waitingMessage.textContent = "We are loading in the projects, please wait"
            projectDiv.appendChild(waitingMessage)

            //Loop through each project
            data.forEach(element => {
                if (element.stargazers_count == 1) {
                    //Log all the details
                    console.log(element.name + ": " + element.description + "\n" + "Repo URL:" + element.html_url + "\n" + "Pages URL:" + "https://tobias-chasstudent.github.io/" + element.name);
                    //Create an aside for the project
                    let asideProject = document.createElement("aside")
                    
                    //Create the title for the project
                    let titleProject = document.createElement("h3")
                    titleProject.textContent = element.name
                    asideProject.appendChild(titleProject)

                    //Create the img for the project
                    let imgProject = document.createElement("img")
                    imgProject.setAttribute("src", "../images/" + element.name + ".png")
                    asideProject.appendChild(imgProject)

                    //Create the desc for the project
                    let descProject = document.createElement("p")
                    descProject.textContent = element.description
                    asideProject.appendChild(descProject)

                    //Append the aside to the modal
                    projectDiv.appendChild(asideProject)
                }

            });
            waitingMessage.style.display = "none"
            divModalContent.appendChild(projectDiv)
        })
    })
}
portfolioJSON()
