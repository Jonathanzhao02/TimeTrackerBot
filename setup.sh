# Add current user to docker sudo group
sudo usermod -aG docker $USER
newgrp docker

echo "Don't forget to ssh manually and add to known hosts!"

# ON CLIENT:

# docker compose -f compose-remote.yaml up -d
