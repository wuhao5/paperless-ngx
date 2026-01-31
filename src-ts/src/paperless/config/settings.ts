/**
 * Configuration settings for Paperless-ngx
 * Matches the structure of the Python settings.py
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

export interface DatabaseConfig {
  type: 'postgres' | 'sqlite' | 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

export interface OcrConfig {
  language: string;
  outputType: string;
  mode: string;
  pages?: number;
  imageDpi?: number;
  clean: string;
  deskew: boolean;
  rotatePagesEnabled: boolean;
  rotatePagesThreshold: number;
  maxImagePixels?: number;
  colorConversionStrategy: string;
  userArgs?: Record<string, string>;
  skipArchiveFile: string;
}

export interface ConsumerConfig {
  pollingInterval: number;
  deleteDuplicates: boolean;
  recursive: boolean;
  ignoredPatterns: string[];
  barcodesEnabled: boolean;
  barcodeTiffSupport: boolean;
  barcodeString: string;
  barcodeRetainSplitPages: boolean;
  enableAsnBarcode: boolean;
  asnBarcodePrefix: string;
  barcodeUpscale: number;
  barcodeDpi: number;
  barcodeMaxPages: number;
  enableTagBarcode: boolean;
  tagBarcodeMapping: Record<string, string>;
  tagBarcodeSplit: boolean;
}

export interface AIConfig {
  enabled: boolean;
  llmEmbeddingBackend?: string;
  llmEmbeddingModel?: string;
  llmBackend?: string;
  llmModel?: string;
  llmApiKey?: string;
  llmEndpoint?: string;
}

export interface Config {
  environment: string;
  debug: boolean;
  secretKey: string;
  port: number;
  baseUrl: string;
  
  // Paths
  dataDir: string;
  mediaRoot: string;
  staticRoot: string;
  originalsDir: string;
  archiveDir: string;
  thumbnailDir: string;
  consumptionDir: string;
  loggingDir: string;
  
  // Database
  database: DatabaseConfig;
  
  // Redis
  redis: RedisConfig;
  
  // OCR
  ocr: OcrConfig;
  
  // Consumer
  consumer: ConsumerConfig;
  
  // AI
  ai: AIConfig;
  
  // Misc
  auditLogEnabled: boolean;
  timeZone: string;
  enableCompression: boolean;
  convertBinaryToAsync: boolean;
  filenameFormat?: string;
  filenameFormatRemoveNone: boolean;
  taskWorkers: number;
}

function getEnvString(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

function getEnvJson<T>(key: string, defaultValue: T): T {
  const value = process.env[key];
  if (!value) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

const dataDir = getEnvString('PAPERLESS_DATA_DIR', '/data');

export const config: Config = {
  environment: getEnvString('NODE_ENV', 'development'),
  debug: getEnvBoolean('PAPERLESS_DEBUG', false),
  secretKey: getEnvString('PAPERLESS_SECRET_KEY', 'change-me-in-production'),
  port: getEnvNumber('PAPERLESS_PORT', 8000),
  baseUrl: getEnvString('PAPERLESS_URL', 'http://localhost:8000'),
  
  // Paths
  dataDir,
  mediaRoot: getEnvString('PAPERLESS_MEDIA_ROOT', path.join(dataDir, 'media')),
  staticRoot: getEnvString('PAPERLESS_STATIC_ROOT', path.join(dataDir, 'static')),
  originalsDir: getEnvString('PAPERLESS_ORIGINALS_DIR', path.join(dataDir, 'media', 'documents', 'originals')),
  archiveDir: getEnvString('PAPERLESS_ARCHIVE_DIR', path.join(dataDir, 'media', 'documents', 'archive')),
  thumbnailDir: getEnvString('PAPERLESS_THUMBNAIL_DIR', path.join(dataDir, 'media', 'documents', 'thumbnails')),
  consumptionDir: getEnvString('PAPERLESS_CONSUMPTION_DIR', '/consume'),
  loggingDir: getEnvString('PAPERLESS_LOGGING_DIR', path.join(dataDir, 'log')),
  
  // Database
  database: {
    type: getEnvString('PAPERLESS_DBENGINE', 'postgres') as 'postgres' | 'sqlite' | 'mysql',
    host: getEnvString('PAPERLESS_DBHOST', 'localhost'),
    port: getEnvNumber('PAPERLESS_DBPORT', 5432),
    username: getEnvString('PAPERLESS_DBUSER', 'paperless'),
    password: getEnvString('PAPERLESS_DBPASS', 'paperless'),
    database: getEnvString('PAPERLESS_DBNAME', 'paperless'),
  },
  
  // Redis
  redis: {
    host: getEnvString('PAPERLESS_REDIS_HOST', 'localhost'),
    port: getEnvNumber('PAPERLESS_REDIS_PORT', 6379),
    password: process.env.PAPERLESS_REDIS_PASSWORD,
  },
  
  // OCR
  ocr: {
    language: getEnvString('PAPERLESS_OCR_LANGUAGE', 'eng'),
    outputType: getEnvString('PAPERLESS_OCR_OUTPUT_TYPE', 'pdfa'),
    mode: getEnvString('PAPERLESS_OCR_MODE', 'skip'),
    pages: process.env.PAPERLESS_OCR_PAGES ? getEnvNumber('PAPERLESS_OCR_PAGES', 0) : undefined,
    imageDpi: process.env.PAPERLESS_OCR_IMAGE_DPI ? getEnvNumber('PAPERLESS_OCR_IMAGE_DPI', 300) : undefined,
    clean: getEnvString('PAPERLESS_OCR_CLEAN', 'clean'),
    deskew: getEnvBoolean('PAPERLESS_OCR_DESKEW', true),
    rotatePagesEnabled: getEnvBoolean('PAPERLESS_OCR_ROTATE_PAGES', true),
    rotatePagesThreshold: parseFloat(getEnvString('PAPERLESS_OCR_ROTATE_PAGES_THRESHOLD', '12.0')),
    maxImagePixels: process.env.PAPERLESS_OCR_MAX_IMAGE_PIXELS 
      ? parseFloat(process.env.PAPERLESS_OCR_MAX_IMAGE_PIXELS) 
      : undefined,
    colorConversionStrategy: getEnvString('PAPERLESS_OCR_COLOR_CONVERSION_STRATEGY', 'RGB'),
    userArgs: getEnvJson<Record<string, string>>('PAPERLESS_OCR_USER_ARGS', {}),
    skipArchiveFile: getEnvString('PAPERLESS_OCR_SKIP_ARCHIVE_FILE', 'never'),
  },
  
  // Consumer
  consumer: {
    pollingInterval: getEnvNumber('PAPERLESS_CONSUMER_POLLING', 5),
    deleteDuplicates: getEnvBoolean('PAPERLESS_CONSUMER_DELETE_DUPLICATES', false),
    recursive: getEnvBoolean('PAPERLESS_CONSUMER_RECURSIVE', false),
    ignoredPatterns: getEnvJson<string[]>('PAPERLESS_CONSUMER_IGNORE_PATTERNS', []),
    barcodesEnabled: getEnvBoolean('PAPERLESS_CONSUMER_ENABLE_BARCODES', false),
    barcodeTiffSupport: getEnvBoolean('PAPERLESS_CONSUMER_BARCODE_TIFF_SUPPORT', false),
    barcodeString: getEnvString('PAPERLESS_CONSUMER_BARCODE_STRING', 'PATCHT'),
    barcodeRetainSplitPages: getEnvBoolean('PAPERLESS_CONSUMER_BARCODE_RETAIN_SPLIT_PAGES', false),
    enableAsnBarcode: getEnvBoolean('PAPERLESS_CONSUMER_ENABLE_ASN_BARCODE', false),
    asnBarcodePrefix: getEnvString('PAPERLESS_CONSUMER_ASN_BARCODE_PREFIX', 'ASN'),
    barcodeUpscale: parseFloat(getEnvString('PAPERLESS_CONSUMER_BARCODE_UPSCALE', '1.5')),
    barcodeDpi: getEnvNumber('PAPERLESS_CONSUMER_BARCODE_DPI', 300),
    barcodeMaxPages: getEnvNumber('PAPERLESS_CONSUMER_BARCODE_MAX_PAGES', 5),
    enableTagBarcode: getEnvBoolean('PAPERLESS_CONSUMER_ENABLE_TAG_BARCODE', false),
    tagBarcodeMapping: getEnvJson<Record<string, string>>('PAPERLESS_CONSUMER_TAG_BARCODE_MAPPING', {}),
    tagBarcodeSplit: getEnvBoolean('PAPERLESS_CONSUMER_TAG_BARCODE_SPLIT', false),
  },
  
  // AI
  ai: {
    enabled: getEnvBoolean('PAPERLESS_AI_ENABLED', false),
    llmEmbeddingBackend: process.env.PAPERLESS_LLM_EMBEDDING_BACKEND,
    llmEmbeddingModel: process.env.PAPERLESS_LLM_EMBEDDING_MODEL,
    llmBackend: process.env.PAPERLESS_LLM_BACKEND,
    llmModel: process.env.PAPERLESS_LLM_MODEL,
    llmApiKey: process.env.PAPERLESS_LLM_API_KEY,
    llmEndpoint: process.env.PAPERLESS_LLM_ENDPOINT,
  },
  
  // Misc
  auditLogEnabled: getEnvBoolean('PAPERLESS_AUDIT_LOG_ENABLED', true),
  timeZone: getEnvString('TZ', 'UTC'),
  enableCompression: getEnvBoolean('PAPERLESS_ENABLE_COMPRESSION', true),
  convertBinaryToAsync: getEnvBoolean('PAPERLESS_CONVERT_BINARY_TO_ASYNC', false),
  filenameFormat: process.env.PAPERLESS_FILENAME_FORMAT,
  filenameFormatRemoveNone: getEnvBoolean('PAPERLESS_FILENAME_FORMAT_REMOVE_NONE', false),
  taskWorkers: getEnvNumber('PAPERLESS_TASK_WORKERS', 1),
};

export default config;
