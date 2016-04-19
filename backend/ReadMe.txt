


How to install Node JS and NPM (Node Package Manager)
=====================================================

sudo yum install gcc-c++ make
sudo yum install openssl-devel
sudo yum install git
git clone https://github.com/nodejs/node.git
cd node

To install specific node version execute below two steps
===================
git tag -l (lists tags , will list various node versions available)
git checkout v4.4.2 (mention specific node version)
===================

./configure
make
sudo make install


node -v (To check installed node version)
npm list or npm list --depth=0 (To check node packages installed)


Add User’s Directory to BIN Paths to Install more Packages
==================
sudo su
nano /etc/sudoers

By this above command nano Editor will open  in this we need to find below line
Defaults secure_path = /sbin:/bin:/usr/sbin:/usr/bin
and on above line we add  “:/usr/local/bin” to the end of above line so it will look like below
Defaults secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin
Now we save this file and close the editor.
===================


Install Forever Package to keep the server up and running forever 
====================
sudo npm install forever

sudo forever start server.js (To keep the application up and running)
sudo forever list (To list the running processes)
sudo forever stop server.js (To stop the application )
sudo forever restart server.js (To Restart the application)
====================










