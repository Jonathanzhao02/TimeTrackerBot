sudo usermod -aG docker $USER
newgrp docker
echo "Copy .env to / root in VM!"
echo "Don't forget to create docker context, ssh manually, and add to known hosts!"

echo "To setup cloudflared tunnel, reference https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/"

# cloudflared tunnel login
# cloudflared tunnel delete snowboy
# cloudflared tunnel create snowboy

# config.yml:
# tunnel: <uuid>
# credentials-file: ~/.cloudflared/<uuid>.json

# sudo mkdir /etc/cloudflared
# sudo cp ~/.cloudflared/config.yml /etc/cloudflared/config.yml
# sudo cloudflared service install

# sudo systemctl enable cloudflared
# sudo systemctl start cloudflared

# sudo systemctl enable cloudflared-update.timer
# sudo systemctl start cloudflared-update.timer

# ON CLIENT:

# docker compose -f compose-remote.yaml up -d
