#!/bin/sh

brew uninstall mongodb
brew cleanup

cd $HOME
sudo rm -rf .nvm

RUN_SH="run_server.sh"
rm $RUN_SH

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"

SERVER_DIR="LocalServerApp"

rm -rf "node_modules"

open ~/.bash_profile