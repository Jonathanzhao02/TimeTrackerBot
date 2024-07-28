#!/bin/bash

/usr/bin/logger "== Startup script START =="

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add cloudflared
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add the repositories to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin cloudflared

/usr/bin/logger "== Cloudflared setup START =="

sudo mkdir ~/.cloudflared
cat <<EOF > ~/.cloudflared/cert.json
{
  "AccountTag"   : "${account_id}",
  "TunnelID"     : "${tunnel_id}",
  "TunnelSecret" : "${secret}"
}
EOF

cat <<EOF > ~/.cloudflared/config.yml
tunnel: ${tunnel_id}
credentials-file: /etc/cloudflared/cert.json
logfile: /var/log/cloudflared.log
loglevel: info

ingress:
  - hostname: ${http_domain}
    service: http://localhost:3000
  - hostname: ${ssh_domain}
    service: ssh://localhost:22
  - service: http_status:404
EOF

sudo mkdir -p /etc/cloudflared/
sudo cp ~/.cloudflared/cert.json /etc/cloudflared/
sudo cp ~/.cloudflared/config.yml /etc/cloudflared/

sudo cloudflared --config /etc/cloudflared/config.yml service install
sudo systemctl enable cloudflared
sudo systemctl enable cloudflared-update.timer
sudo systemctl start cloudflared
sudo systemctl start cloudflared-update.timer

/usr/bin/logger "== Cloudflared setup END =="

/usr/bin/logger "== Startup script END =="
