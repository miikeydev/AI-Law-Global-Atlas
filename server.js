const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') {
    return 'no-cache, must-revalidate';
  }
  if (filePath.includes(`${path.sep}res${path.sep}`)) {
    return 'public, max-age=86400, stale-while-revalidate=604800';
  }
  if (ext === '.js' || ext === '.css') {
    return 'public, max-age=3600, stale-while-revalidate=86400';
  }
  return 'public, max-age=600';
}

function safeResolvePath(requestPath) {
  let decoded = requestPath;
  try {
    decoded = decodeURIComponent(requestPath);
  } catch (error) {
    return null;
  }
  const cleaned = decoded.replace(/^\/+/, '');
  const withIndex = cleaned === '' ? 'index.html' : cleaned;
  const absolutePath = path.resolve(ROOT_DIR, withIndex);
  const normalizedRoot = `${path.resolve(ROOT_DIR)}${path.sep}`;
  if (absolutePath !== path.resolve(ROOT_DIR) && !absolutePath.startsWith(normalizedRoot)) {
    return null;
  }
  return absolutePath;
}

function serveFile(filePath, res) {
  fs.stat(filePath, (statErr, stats) => {
    if (statErr) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const finalPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(finalPath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': getCacheControl(finalPath)
      });
      res.end(data);
    });
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const absolutePath = safeResolvePath(requestUrl.pathname);
  if (!absolutePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }
  serveFile(absolutePath, res);
});

server.listen(PORT, () => {
  console.log(`AIMAP server running on http://localhost:${PORT}`);
});
