/**
 * Paperless Text module
 * Corresponds to paperless_text Python module
 * 
 * Handles plain text documents without OCR
 * 
 * Open Items:
 * - Text file encoding detection
 * - Large file handling
 */

export interface TextParserResult {
  text: string;
  pageCount: number;
}

/**
 * Plain text parser
 */
export class TextParser {
  /**
   * Check if parser supports the given mime type
   */
  static supports(mimeType: string): boolean {
    const supportedTypes = [
      'text/plain',
      'text/csv',
      'text/html',
      'text/markdown',
      'text/xml',
      'application/json',
      'application/xml',
    ];
    return supportedTypes.includes(mimeType);
  }

  /**
   * Parse text file
   */
  async parse(filePath: string): Promise<TextParserResult> {
    const fs = await import('fs');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return {
      text: content,
      pageCount: 1,
    };
  }
}

export default TextParser;
