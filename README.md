# Easy Node Patch Server
Used to create an external patch server to communicate with Jamf Pro

This relies on using a Node JS server to run and report our JSON patch files to the Jamf Pro Server.

## Getting Started

Here is what we will need to get us started with this project. First we need to install a few Prerequisites

### Prerequisites

We need to install NPM and create a symlink from nodejs to node

```
sudo apt install git
sudo apt install npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### Installing

Once we have those two Prerequisetes installed and set, we need to clone the repo and install our node package.

```
cd /home/<Your_User>
git clone https://github.com/Chronolis/nodePatchServer.git
cd nodePatchServer/
npm install patch-1.0.0.tgz
```

## Running the server

Once we have the patch package installed, as well as node set up and symlinked, we can run our server by firing off the following command

Make sure we are in the nodePatchServer folder.
```
node index.js
App listening on port 3000!
````

Once this is installed you can navigate to localhost:3000 or SERVER_IP:3000 and access your Patch Server!

