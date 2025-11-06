# XKCD Viewer and Downloader
A React app for viewing XKCD comics and requesting downloads via a Go-based [backend server](https://github.com/Cole-Parsons/XKCD-Scraper-HTTP-Server.git).  
This project demonstrates React state management, API integration, and client-server communication.  
---
## Features  
* View any XKCD Comic by number or load the latest one  
* Navigate to previous and next comics  
* Request downloads through connected Go backend  
* Uses AllOrigins API to bypass CORS restrictions  
---
# Installation   
```bash
git clone https://github.com/Cole-Parsons/XKCD-frontend.git
cd XKCD-frontend
npm install
npm run dev
# Ensure go server is running on port 8080
```
## Related Projects
[XKCD-Server](https://github.com/Cole-Parsons/XKCD-Scraper-HTTP-Server.git)  
[XKCD-Client](https://github.com/Cole-Parsons/XKCD-Client.git)  
---
## To run the entirety of the Scraper see:  
[Docker-compose](https://github.com/Cole-Parsons/XKCD-docker-compose.git)  
