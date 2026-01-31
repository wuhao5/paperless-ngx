/**
 * Paperless Remote module
 * Corresponds to paperless_remote Python module
 * 
 * Handles remote document parsing using external services
 * 
 * Open Items:
 * - Gotenberg integration for PDF generation
 * - Remote OCR service support
 */

export interface RemoteParserResult {
  text: string;
  archivePath?: string;
  pageCount: number;
}

export interface RemoteConfig {
  gotenbergUrl?: string;
  timeout: number;
}

/**
 * Remote document parser using Gotenberg or similar
 * TODO: Implement Gotenberg client
 */
export class RemoteParser {
  private config: RemoteConfig;

  constructor(config?: Partial<RemoteConfig>) {
    this.config = {
      gotenbergUrl: config?.gotenbergUrl || process.env.PAPERLESS_GOTENBERG_URL,
      timeout: config?.timeout || 120000,
    };
  }

  /**
   * Check if parser supports the given mime type
   */
  static supports(mimeType: string): boolean {
    // Remote parser supports converting various formats to PDF
    const supportedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/html',
      'application/xhtml+xml',
    ];
    return supportedTypes.includes(mimeType);
  }

  /**
   * Parse document using remote service
   * TODO: Implement Gotenberg integration
   */
  async parse(filePath: string): Promise<RemoteParserResult> {
    // TODO: Implement remote parsing
    return {
      text: '',
      pageCount: 1,
    };
  }

  /**
   * Convert document to PDF using Gotenberg
   * TODO: Implement PDF conversion
   */
  async convertToPdf(filePath: string, outputPath: string): Promise<void> {
    // TODO: Implement PDF conversion
  }
}

export default RemoteParser;
