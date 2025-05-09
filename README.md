# ClickSalesMedia Website

# clicksalesmedia

## Server Deployment

### Deployment Process

1. Push changes to the GitHub repository
2. SSH into the server: `ssh root@49.13.238.33`
3. Navigate to the application directory: `cd /var/www/clicksalesmediaAI`
4. Pull the latest changes: `git pull origin main`
5. Make the deployment script executable: `chmod +x server-config/deploy.sh`
6. Run the deployment script: `./server-config/deploy.sh`

### Server Configuration

The server configuration files are located in the `server-config` directory:

- `nginx-config.conf`: Nginx configuration for serving the application
- `pm2-config.json`: PM2 configuration for running the Node.js application
- `deploy.sh`: Deployment script to apply configuration changes

### Troubleshooting

If you encounter 404 or 503 errors for static assets:

1. Check Nginx logs: `cat /var/log/nginx/error.log`
2. Check PM2 logs: `pm2 logs clicksalesmedia`
3. Ensure cache directories exist: `ls -la /var/cache/nginx/`
4. Restart Nginx: `systemctl restart nginx`
5. Restart the application: `pm2 restart clicksalesmedia`
