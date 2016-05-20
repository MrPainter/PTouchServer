#!/bin/sh
NODE_VERSION=4.4.0
NVM_VERSION=0.31.0
MONGO_VERSION=3.2.4

SERVER_DIR="LocalServerApp"

sudo echo "Local server installation started."

#Command line developer tools
#xcode-select --install

#
# Check if Homebrew is installed
# UNINSTALL Brew if required ~/ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
echo "Check if Homebrew is installed..."
which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    echo "Installing brew package manager..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    brew update
fi

sudo chmod 0755 /usr/local
sudo chgrp wheel /usr/local

#Install NVM
echo "Check if NVM is installed..."
command -v nvm
if [[ $? != 0 ]] ; then
    # Install Homebrew
    echo "Installing NVM package ..."
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | bash
    echo 'export NVM_DIR="$HOME/.nvm"' >>~/.bash_profile
    echo 'source $HOME/.nvm/nvm.sh' >>~/.bash_profile
    source ~/.bash_profile
else
    echo "NVM installation does not required."
fi

#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${NODE_VERSION}"
node --version | grep ${NODE_VERSION}
if [[ $? != 0 ]] ; then
    # Install Node
    echo "Installing NodeJS..."
    nvm install ${NODE_VERSION}
    source ~/.bash_profile
fi

#
# Check if Mongo is installed and at the right version
#

echo "Checking for MongoDB version ${MONGO_VERSION}"
mongod --version | grep ${MONGO_VERSION}
if [[ $? != 0 ]] ; then
    # Install Mongo
    echo "Installing MongoDB..."
    # cd `brew --prefix`
    # $(brew versions mongodb | grep ${MONGO_VERSION} | cut -c 16- -)
    brew install mongodb
    brew switch mongodb ${MONGO_VERSION}
else
    echo "MongoDB installation does not required."
fi

echo "CURRENT DIR:"
pwd
cd $(dirname "$0")/$SERVER_DIR

echo "Installing server packages..."
sudo npm run preinstall
sudo npm install
echo "Server packages installed!"

cd ..

#MONGO_SH="mongod"
RUN_SH="run_server.sh"

#echo "Generating mongo script..."
#echo "mongod" >> $MONGO_SH

rm $RUN_SH

echo "Generating run_server script"

if [[ "$OSTYPE" == "linux-gnu" ]]; then
        # ...
elif [[ "$OSTYPE" == "darwin"* ]]; then
	echo "osascript -e 'tell application \"Terminal\"" >> $RUN_SH
	echo "do script with command \"mongod\"" >> $RUN_SH
	echo "end tell'" >> $RUN_SH
elif [[ "$OSTYPE" == "cygwin" ]]; then
        # POSIX compatibility layer and Linux environment emulation for Windows
elif [[ "$OSTYPE" == "msys" ]]; then
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
elif [[ "$OSTYPE" == "win32" ]]; then
        # I'm not sure this can happen.
elif [[ "$OSTYPE" == "freebsd"* ]]; then
        # ...
else
		echo "ERROR: Please contact script provider. Error code: ins001. Details: Platform was not identified."
		echo "Thank you for your collaboration!"
        return
fi

echo "sleep 3" >> $RUN_SH
echo 'cd "$(dirname "$0")"' >> $RUN_SH
echo "cd $SERVER_DIR" >> $RUN_SH
echo "sails lift" >> $RUN_SH

chmod 755 $RUN_SH

echo "-------  -    -    -"
echo "   |      \  / \  / "
echo "   |       \/   \/  "

echo "Thank you for your time!"
read -p "Installation script completed! Press any key to exit..."
