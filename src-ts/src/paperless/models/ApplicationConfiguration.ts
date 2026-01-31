/**
 * Application Configuration entity - Singleton model for app-wide settings
 * Corresponds to paperless.models.ApplicationConfiguration
 */

import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum OutputTypeChoices {
  PDF = 'pdf',
  PDF_A = 'pdfa',
  PDF_A1 = 'pdfa-1',
  PDF_A2 = 'pdfa-2',
  PDF_A3 = 'pdfa-3',
}

export enum ModeChoices {
  SKIP = 'skip',
  REDO = 'redo',
  FORCE = 'force',
  SKIP_NO_ARCHIVE = 'skip_noarchive',
}

export enum ArchiveFileChoices {
  NEVER = 'never',
  WITH_TEXT = 'with_text',
  ALWAYS = 'always',
}

export enum CleanChoices {
  CLEAN = 'clean',
  FINAL = 'clean-final',
  NONE = 'none',
}

export enum ColorConvertChoices {
  UNCHANGED = 'LeaveColorUnchanged',
  RGB = 'RGB',
  INDEPENDENT = 'UseDeviceIndependentColor',
  GRAY = 'Gray',
  CMYK = 'CMYK',
}

export enum LLMEmbeddingBackend {
  OPENAI = 'openai',
  HUGGINGFACE = 'huggingface',
}

export enum LLMBackend {
  OPENAI = 'openai',
  OLLAMA = 'ollama',
}

const DEFAULT_SINGLETON_INSTANCE_ID = 1;

@Entity('paperless_applicationconfiguration')
export class ApplicationConfiguration {
  @PrimaryColumn({ type: 'int', default: DEFAULT_SINGLETON_INSTANCE_ID })
  id: number = DEFAULT_SINGLETON_INSTANCE_ID;

  // OCR Settings
  @Column({ type: 'varchar', length: 8, nullable: true, name: 'output_type' })
  outputType?: OutputTypeChoices;

  @Column({ type: 'int', nullable: true })
  pages?: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  language?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  mode?: ModeChoices;

  @Column({ type: 'varchar', length: 16, nullable: true, name: 'skip_archive_file' })
  skipArchiveFile?: ArchiveFileChoices;

  @Column({ type: 'int', nullable: true, name: 'image_dpi' })
  imageDpi?: number;

  @Column({ type: 'varchar', length: 16, nullable: true, name: 'unpaper_clean' })
  unpaperClean?: CleanChoices;

  @Column({ type: 'boolean', nullable: true })
  deskew?: boolean;

  @Column({ type: 'boolean', nullable: true, name: 'rotate_pages' })
  rotatePages?: boolean;

  @Column({ type: 'float', nullable: true, name: 'rotate_pages_threshold' })
  rotatePagesThreshold?: number;

  @Column({ type: 'float', nullable: true, name: 'max_image_pixels' })
  maxImagePixels?: number;

  @Column({ type: 'varchar', length: 32, nullable: true, name: 'color_conversion_strategy' })
  colorConversionStrategy?: ColorConvertChoices;

  @Column({ type: 'jsonb', nullable: true, name: 'user_args' })
  userArgs?: Record<string, string>;

  // App Settings
  @Column({ type: 'varchar', length: 48, nullable: true, name: 'app_title' })
  appTitle?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'app_logo' })
  appLogo?: string;

  // Barcode Settings
  @Column({ type: 'boolean', nullable: true, name: 'barcodes_enabled' })
  barcodesEnabled?: boolean;

  @Column({ type: 'boolean', nullable: true, name: 'barcode_enable_tiff_support' })
  barcodeEnableTiffSupport?: boolean;

  @Column({ type: 'varchar', length: 32, nullable: true, name: 'barcode_string' })
  barcodeString?: string;

  @Column({ type: 'boolean', nullable: true, name: 'barcode_retain_split_pages' })
  barcodeRetainSplitPages?: boolean;

  @Column({ type: 'boolean', nullable: true, name: 'barcode_enable_asn' })
  barcodeEnableAsn?: boolean;

  @Column({ type: 'varchar', length: 32, nullable: true, name: 'barcode_asn_prefix' })
  barcodeAsnPrefix?: string;

  @Column({ type: 'float', nullable: true, name: 'barcode_upscale' })
  barcodeUpscale?: number;

  @Column({ type: 'int', nullable: true, name: 'barcode_dpi' })
  barcodeDpi?: number;

  @Column({ type: 'int', nullable: true, name: 'barcode_max_pages' })
  barcodeMaxPages?: number;

  @Column({ type: 'boolean', nullable: true, name: 'barcode_enable_tag' })
  barcodeEnableTag?: boolean;

  @Column({ type: 'jsonb', nullable: true, name: 'barcode_tag_mapping' })
  barcodeTagMapping?: Record<string, string>;

  @Column({ type: 'boolean', nullable: true, name: 'barcode_tag_split' })
  barcodeTagSplit?: boolean;

  // AI Settings
  @Column({ type: 'boolean', nullable: true, default: false, name: 'ai_enabled' })
  aiEnabled?: boolean;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'llm_embedding_backend' })
  llmEmbeddingBackend?: LLMEmbeddingBackend;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'llm_embedding_model' })
  llmEmbeddingModel?: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'llm_backend' })
  llmBackend?: LLMBackend;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'llm_model' })
  llmModel?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, name: 'llm_api_key' })
  llmApiKey?: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'llm_endpoint' })
  llmEndpoint?: string;

  @BeforeInsert()
  @BeforeUpdate()
  ensureSingletonId() {
    this.id = DEFAULT_SINGLETON_INSTANCE_ID;
  }
}

export default ApplicationConfiguration;
