# 3d Configurator

A 3D configurator where users can upload 3d models and create interactive product configurators through the admin panel.

## Getting started

**Copy env file**

`cp ./example.env ./.env`

You might need to add google maps key to `VITE_MAP_KEY` env variable

**Start the Development Server** 

`docker compose up`

**Seed Initial Data**

Wait for the container to start before running this script

`./seed.sh`

**Configurator**

Visit [http://localhost:5173](http://localhost:5173)

**Admin Panel**

Visit [http://localhost:3000/admin](http://localhost:3000/admin)

Use these creds to login
```
email: admin@example.com
password: password
```

Visit models section in admin to see example models.