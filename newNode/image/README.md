# Create Ethereum Images
**ethereum.sh**

**dockerfile**

# ethereum.sh
Excuse shell script when docker run container. It need add in Linux /root/.bashrc file. You can add by "echo ./ethereum.sh >> /root/.bashrc" command. Or use "dockerfile" to build docker image(ethereum) will be able to complete the deployment quickly

# dockerfile
You can use "sudo docker build -t ethereum ." command build docker images. Will install Ethereum, curl,node,npm,nvm,git,jq,pm2,screen library and so on.