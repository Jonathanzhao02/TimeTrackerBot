sudo usermod -aG docker $USER
newgrp docker
echo "Copy .env to / root in VM!"
echo "Don't forget to ssh manually and add to known hosts!"

# ON CLIENT:

# docker compose -f compose-remote.yaml up -d
