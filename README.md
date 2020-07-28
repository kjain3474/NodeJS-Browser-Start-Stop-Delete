# NodeJS-Browser-Start-Stop-Delete
NodeJS App to Open and Close and Delete History for Specific Browser on Remote Machine through Rest API.

TechStack Used: NodeJS, Express.js, BAT Files

## Installing the project

```bash
git clone https://github.com/kjain3474/NodeJS-Browser-Start-Stop-Delete.git
npm install
```
## Start

```bash
npm start
```

On Browser type in the following API points to do the actions:

http://localhost:80/start?browser={browser}=&{url}=<url> should start the desired browser and open the URL in the same browser instance.
<br />
http://localhost:80/stop?browser={browser} should stop the given browser if it is running
<br />
http://localhost:80/cleanup?browser={browser} should clean up the browsing session for the given browser if has been stopped.
<br />

where,

{browser} = chrome/firefox

{url} = Any valid URL like: https://www.icarusinnovations.co