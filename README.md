# HybridForms FormDev Environment

Form development environment for developing Form Templates locally with an integrated local backend service.

## Requirements

- Node.js >= 20.0
- Google Chrome
- Code Editor (Visual Studio Code recommended)

## QuickStart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mirosenski/HybridForms.git
   cd HybridForms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local webserver:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Web Client: http://localhost:8181
   - Backend Service: http://localhost:8182
   - LiveReload: http://localhost:8183

## Supported Flags for `npm start`

- `--path=[path to Form Templates]`
- `--include=[Form Template to be included in the service]`

Example:
```bash
npm start -- --path=relPath/to/your/form-templates --include=TestForm
```

## Troubleshooting

### Node.js Version Issues
If you get engine warnings, ensure you're using Node.js 20+:
```bash
nvm use 20
export PATH="$HOME/.nvm/versions/node/v20.19.3/bin:$PATH"
npm start
```

### Module Not Found Errors
If you encounter `hf-formdefexporter` errors, the module should be automatically installed. If not:
```bash
npm install hf-formdefexporter --save
```

## Development

Start building your forms! The environment includes:
- Local webserver with integrated backend service
- LiveReload for automatic browser refresh
- TypeScript and SASS compilation
- Form template development tools

## Documentation

For detailed documentation, visit: https://manuals.hybridforms.net/ 