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

## 🛠️ Development Tools

### Exporter
Export and compile Form Templates:
```bash
npm run export -- --formDefPath=./form-templates/TestForm --outputPath=./export
```

**Available options:**
- `--formDefPath`: Path to Form Template folder
- `--outputPath`: Custom output folder
- `--outputPostfix`: Custom folder postfix
- `--switch`: Placeholder switch
- `--includeReplacableFiles`: Files for placeholder replacement
- `--excludeFiles`: Files to exclude from export
- `--updateVersionDate`: Update version date (default: true)
- `--compileFiles`: Compile TypeScript/SASS (default: true)
- `--formatHtml`: Format HTML files (default: true)
- `--templateVersion`: Set version (major/minor/patch/X.Y.Z)
- `--mapExcelFields`: Enable Excel field mapping

### Uploader
Upload Form Templates to server:
```bash
npm run upload
```

**Available options:**
- `-s, --server`: Server URL
- `-u, --user`: Username/ClientID
- `-p, --password`: Password/ClientSecret
- `-c, --client`: Client name/ID
- `-t, --templates`: Templates to upload
- `-D, --delete`: Delete files not uploaded
- `-d, --download`: Download as ZIP
- `--oauth`: Use OAuth authentication
- `--backup`: Download backup before upload

### Boilerplate Generator
Create new Form Template:
```bash
npm run createForm -- PROJECT_NAME --sass --ts --includes --index
```

### Translation Tools
Generate translation keys:
```bash
npm run generateTranslations -- --formDefPath=./form-templates/TestForm --langCultures=de-DE,en-US
```

Compare translations:
```bash
npm run compareTranslations -- source.xlsx target.xlsx --outFile=diff.json
```

### Email Template Compiler
Compile MJML email templates:
```bash
npm run email -- path/to/template.mjml -o output.txt
```

### HTML Migration Tools
Migrate HTML from v8 to v9:
```bash
node sources/htmlMigrateV9.js path/to/html/file
```

Migrate HTML templates:
```bash
node sources/htmlMigrateTemplate.js path/to/html/file
```

## ⚙️ Configuration Files

### Form Template Configuration (index.json)
Each Form Template folder can have an `index.json` file:
```json
{
    "title": "Form Title",
    "culture": "de-DE",
    "attachments": [],
    "flags": {
        "FormDev.PDFDebug": true,
        "Form.New": true,
        "Feature.Picture": true,
        "PDF": true
    },
    "catalogs": {
        "useProxy": true,
        "host": "example.hybridforms.net"
    }
}
```

### App Settings (appSettings.json)
Configure app-wide settings:
```json
{
    "googleMapsApiKey": {
        "value": "[YOUR_API_KEY]",
        "visibility": "ok"
    },
    "hfMap-MapLibreBaseMap": {
        "value": {
            "provider": "MapLibreGL",
            "mapConfig": {
                "center": [15.439504, 47.070713],
                "zoom": 14
            }
        }
    }
}
```

### Workflow Stages (stages.json)
Define form workflow stages:
```json
[
    {
        "id": 1,
        "name": "Draft",
        "color": "#6c757d",
        "isDefault": true
    },
    {
        "id": 2,
        "name": "Approved",
        "color": "#28a745"
    }
]
```

## 🔧 Advanced Features

### Excel Field Mapping
Create `*.mapping.xlsx` files and configuration JSON for automatic field mapping during export.

### Version Exclusion
Use `{{%exclude | version < 10.0.0}}` in HTML to exclude content for older versions.

### Proxy Configuration
For online catalogs, use reverse proxy:
```
http://localhost:8182/proxy/<host>/<request>
```

### Credentials (credentials.json)
For proxy authentication (base64 encoded password):
```json
{
    "accountName": "username",
    "password": "base64_encoded_password"
}
```

## 🚀 Development Workflow

1. **Create new Form Template:**
   ```bash
   npm run createForm -- MY_FORM --sass --ts
   ```

2. **Develop with LiveReload:**
   - Edit HTML/SCSS/TS files
   - Automatic browser refresh
   - Real-time compilation

3. **Test with local backend:**
   - Full server simulation
   - Workflow stages support
   - PDF generation

4. **Export for production:**
   ```bash
   npm run export -- --formDefPath=./form-templates/MY_FORM
   ```

5. **Upload to server:**
   ```bash
   npm run upload
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

### Port Conflicts
Ensure ports 8181, 8182, and 8183 are available:
```bash
lsof -i :8181
lsof -i :8182
lsof -i :8183
```

## Development

Start building your forms! The environment includes:
- Local webserver with integrated backend service
- LiveReload for automatic browser refresh
- TypeScript and SASS compilation
- Form template development tools
- PDF generation and debugging
- Email template compilation
- Translation management
- Workflow stage simulation

## Documentation

For detailed documentation, visit: https://manuals.hybridforms.net/ 