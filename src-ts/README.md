# Paperless-ngx TypeScript Backend

This is a TypeScript/Koa implementation of the Paperless-ngx backend, following the same architecture as the original Python/Django implementation.

## Project Structure

```
src-ts/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── common/                     # Shared utilities and middleware
│   │   ├── config/
│   │   │   └── database.ts         # TypeORM database configuration
│   │   ├── controllers/
│   │   │   └── BaseController.ts   # Base CRUD controller
│   │   ├── middleware/
│   │   │   ├── auth.ts             # Authentication middleware
│   │   │   ├── errorHandler.ts     # Error handling middleware
│   │   │   └── requestLogger.ts    # Request logging middleware
│   │   ├── models/                 # Shared models
│   │   └── utils/
│   │       └── logger.ts           # Winston logger configuration
│   │
│   ├── paperless/                  # Core paperless module
│   │   ├── config/
│   │   │   └── settings.ts         # Application configuration
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Group.ts
│   │   │   └── ApplicationConfiguration.ts
│   │   ├── routes/
│   │   └── version.ts
│   │
│   ├── documents/                  # Documents module
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── Document.ts
│   │   │   ├── Correspondent.ts
│   │   │   ├── DocumentType.ts
│   │   │   ├── Tag.ts
│   │   │   ├── StoragePath.ts
│   │   │   ├── Note.ts
│   │   │   ├── SavedView.ts
│   │   │   ├── ShareLink.ts
│   │   │   ├── PaperlessTask.ts
│   │   │   ├── UiSettings.ts
│   │   │   ├── CustomField.ts
│   │   │   ├── Workflow.ts
│   │   │   ├── WorkflowTrigger.ts
│   │   │   └── WorkflowAction.ts
│   │   ├── routes/
│   │   └── dataModels.ts           # DTOs and data structures
│   │
│   ├── paperless_mail/             # Mail fetching module
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── MailAccount.ts
│   │   │   ├── MailRule.ts
│   │   │   └── ProcessedMail.ts
│   │   └── routes/
│   │
│   ├── paperless_ai/               # AI/LLM integration (placeholder)
│   ├── paperless_tesseract/        # Tesseract OCR (placeholder)
│   ├── paperless_text/             # Plain text parsing
│   ├── paperless_tika/             # Apache Tika integration (placeholder)
│   └── paperless_remote/           # Remote parsing (Gotenberg) (placeholder)
│
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or SQLite for development)
- Redis (for task queue)

### Installation

```bash
cd src-ts
npm install
```

### Configuration

Copy the example environment file and configure:

```bash
cp ../.env.example .env
```

Key environment variables:
- `PAPERLESS_SECRET_KEY` - Secret key for JWT signing
- `PAPERLESS_DBHOST` - Database host
- `PAPERLESS_DBNAME` - Database name
- `PAPERLESS_DBUSER` - Database user
- `PAPERLESS_DBPASS` - Database password

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run build
npm start
```

## API Routes

The API follows the same structure as the Python implementation:

- `/api/documents/` - Document management
- `/api/correspondents/` - Correspondent management
- `/api/document_types/` - Document type management
- `/api/tags/` - Tag management
- `/api/storage_paths/` - Storage path management
- `/api/saved_views/` - Saved view management
- `/api/tasks/` - Background task management
- `/api/users/` - User management
- `/api/groups/` - Group management
- `/api/profile/` - User profile
- `/api/config/` - Application configuration
- `/api/mail_accounts/` - Mail account management
- `/api/mail_rules/` - Mail rule management
- `/api/search/` - Global search
- `/api/statistics/` - Application statistics
- `/api/status/` - System status

## Open Items / TODO

The following features require implementation:

### High Priority
- [ ] Authentication (JWT, session, OAuth)
- [ ] Document consumption pipeline
- [ ] File upload handling
- [ ] Background task queue (Bull/BullMQ)
- [ ] Full-text search (Elasticsearch/Meilisearch)

### Medium Priority
- [ ] OCR integration (Tesseract.js)
- [ ] PDF/A generation
- [ ] Document classification
- [ ] Matching algorithms
- [ ] Workflow execution

### Lower Priority
- [ ] AI/LLM integration
- [ ] Tika server integration
- [ ] Gotenberg integration
- [ ] WebSocket support for real-time updates
- [ ] Email notifications

### External Dependencies Needed
- Tesseract.js or system Tesseract for OCR
- Apache Tika server for Office documents
- Gotenberg for PDF conversion
- Redis for task queue
- Elasticsearch/Meilisearch for full-text search (optional)

## Migration from Python

This implementation follows the same database schema as the Python/Django version,
allowing for potential data migration. The TypeORM entities are designed to be
compatible with the existing PostgreSQL schema.

## License

GPL-3.0 (same as the main Paperless-ngx project)
