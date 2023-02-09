getent group elasticsearch || groupadd elasticsearch
id -u elasticsearch &>/dev/null || useradd -g elasticsearch elasticsearch
mkdir -p esdata 
chmod -R 777  esdata
sudo docker-compose up -d