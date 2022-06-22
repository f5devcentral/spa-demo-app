# Build steps for monolith vm

Create Ubuntu 20.04 VM, 2 CPU, 4 GB RAM, 20 GB storage

### Docker

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

Install Docker

```shell
sudo apt-get update && sudo apt-get upgrade -y
sudo apt install -y net-tools apt-transport-https ca-certificates curl software-properties-common jq
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt-cache policy docker-ce
sudo apt install -y docker-ce docker-compose
sudo usermod -aG docker ${USER}
sudo su - ${USER}
```

Build "Monolithic" Docker container

Run Docker containers
```

```shell
git clone https://github.com/f5devcentral/spa-demo-app.git
cd spa-demo-app
docker-compose up -d
```









Services

http://localhost:8000/api/config/database
http://localhost:8000/api/inventory
http://localhost:8000/api/products
http://localhost:8000/api/products/123
http://localhost:8000/api/stats
http://localhost:8000/api/stats/database
http://localhost:8000/api/stats/inventory
http://localhost:8000/api/stats/inventory
http://localhost:8000/api/users/12345/cart
http://localhost:8000/api/recommendations
http://localhost:8081/
