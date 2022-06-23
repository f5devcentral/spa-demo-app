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


Set up an NGINX Proxy in a docker container to create a proxy for the UDF Access method:

```shell
mkdir ~/nginx-proxy && cd nginx-proxy

cat <<'EOF' > proxy.conf
user www-data;
worker_processes auto;
worker_rlimit_nofile 8192;
pid /run/nginx.pid;

events {
    worker_connections 4096;
}

http {
    upstream spa {
        server 10.1.1.4:8081;
    }

    upstream api {
        server 10.1.1.4:8000;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://spa;
        }
        location /images {
            proxy_pass http://api/images;
        }
        location /api {
            proxy_pass http://api;
        }
    }
}
EOF

docker run --restart unless-stopped --name nginx-proxy-container -d -p 80:80 -v "$(pwd)/proxy.conf:/etc/nginx/nginx.conf:ro" nginx

```

