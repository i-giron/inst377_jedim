# Project Title:
Market4Farmers: Connecting Farmers To Customers In Need

# Project Description: 
This project is design to provide members of the public by using Prince George API database  with convenient access to information about Prince George farmer markets 
locations, and map direction.

# Target Browsers:
We are currently a site that will benefit the Android and the iOS users especially stakeholders such as WIC and SNAP participants to find information about Prince George
farmer market.

# User Manual Link:
[User Manual](https://github.com/ericTle1/inst377_jedim/blob/main/docs/user.md)

# Developer Manual:
## Installation and Dependencies
This project is stored in a Github repository, and you may fork it to your own repository and make modifications to it when cloned to your local repository. You may either choose to install GitHub Desktop or Git to clone it to your local repository. For GitHub Desktop installation and documentation, [click here](https://desktop.github.com/). For Git installation, [click here](https://git-scm.com/downloads), and for Git repository instructions, [click here](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)

Once you have cloned this project from GitHub into your local repository, you would need to install Node.js , npm, and Git in order for this project to work.
* To download and install Node.js, [click here](https://nodejs.org/en/download/). It should be noted that npm will automatically be installed along with node.js.
* If you haven't installed Git, [click here](https://git-scm.com/downloads)

Once you have installed Node.js, npm, and Git, open up gitbash console and navigate to your local repository that contains this project. Run the following code to navigate to your local repository. 
```
cd {project repository path}
```

Then, you would also need to install dependencies. In the file of package.json, you would find two sections: "dependencies" and "devDependencies." The "dependencies" section outlines the dependencies that are required for the application to function and the "devDependencies" section outlines the dependencies that are required for development of the project. Install dependencies from both section if you wish to modify or work on this project, otherwise, only install dependencies from the “dependencies.” Run the following command to install dependencies.
```
npm install –save {dependency}
```

You can also run this following command to install all dependencies.
```
npm i
````

### Project Structure
>### /docs 
Contains user manual and final report.

>### /src 
Front-end folder that contains images, html, css, and js files.

### /README.md
Introduces and explains our project.

>### package.json	
Contains project descriptions, properties, scripts, dependencies, license information, and more.

>### package-lock.json	
Records specific dependencies' version number that our application needs
