### Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)
The intent of the project was to create a recipe page that filters through a list of recipes to display. The user has the ability to view three pre-loaded recipes on website load, and the ability to load recipes that run through a filter of "tag" search (ie: "salad', 'sauce', 'lunch' etc) or a name search of choice. 

We at this moment were unable to create a website that met the full guidelines of the project expectations. Our project partially completes Iteration 2. The user has the ability to save recipes to cook, but ONLY through saving on the card itself. The ability to save on the recipe page itself does not work. However, the user can save recipes on the card itself and view "Recipes To Cook". The recipes that push however are incomplete and do not present ingredients or instructions. 

### Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)
1) Access the form here: https://github.com/Swatzell/whats-cookin
2) Copy the SSH repository URL git@github.com:Swatzell/whats-cookin.git
3) Open terminal and 'cd' into the directory you wish to clone 
4) Clone the repository by submitting `git clone git@github.com:Swatzell/whats-cookin.git`

### Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)
[serach results](https://ibb.co/VwCzd4n)
The website displays recipes based on search

### Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)
This project was given a little over a week, assigned on Friday March 22 and due on Monday April 1. The three participants are all into the second 6-week "module" of four. 

### Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)
Jarvis Bailey: https://github.com/baileyjarvis2814
David Swatzell: https://github.com/Swatzell
Zach Wolek: https://github.com/zachwolek/

### Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)
The learning goals were to apply iteration methods for large packs of data and presenting the information based on user preference. The other learning goal was to apply fetch calls with API, which we failed to bring the project to this point and intend to meet this learning goal before the commencement of the second part of this project. 

### Wins + Challenges:
[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)
1) We learned how to apply iteration methods in filtering and presenting data from large files
2) We learned how to integrate multiple sets of data by connecting common values from one to the next
3) We applied the skill of TDD test building to ensure the iterations would be functional before implementing on the live website





# What's Cookin'? Starter Kit

The details of this project are outlined in the <a href="https://frontend.turing.edu/projects/What%27sCookin-PartOne.html" target="\__blank">project spec</a>.

## Set Up

1. Within your group, decide on **one** person to have the project repository on their Github account. This person will *fork* this repository - on the top right corner of the page, click the fork button.
1. Add all group members and your PM as collaborators on the repo  
1. All group members should then clone down the forked repository. Since you don't want your project to be named "whats-cookin-starter-kit", add an optional argument after the repo url when cloning. The command should look like this: `git clone [remote-address] [what your group wants to name the repo]`.
1. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
1. Run `npm start` in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page).  
    - `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.  
        - This command is not specific to Webpack; make note of it for future use.
1. Do not run `npm audit fix --force`. This will update to the latest version of packages. We need to be using `webpack-dev-server@3.11.2` which is not the latest version. If you start to run into Webpack errors, first check that all group members are using the correct version.

## Testing

Mocha and chai are already set up, with a boilerplate test for you.