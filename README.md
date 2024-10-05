# MyWeb

Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

To preview and run the project on your device:

1. Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2. In the terminal, run `npm install`
3. Run `npm start` to view project in browser

Steps for setting up git with node js to deploy static pages

1. git init
2. git add .
3. If you face ownership errors/issues execute the following accordingly in powershell admin -> takeown /F <directory> /R /D Y
4. Config name and email.
	git config --global user.email "<email id>"
	git config --global user.name "<name>"
5. Add git remote. git remote add origin <github link.git>

To push the project to github pages after setting up connection by following above steps

1. `npm run build` to build the project.
2. `npm run deploy` to push the react app to gh pages after building.