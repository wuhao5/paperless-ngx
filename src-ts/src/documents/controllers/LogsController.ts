/**
 * Logs Controller
 */

import { Context } from 'koa';
import fs from 'fs';
import path from 'path';
import { config } from '../../paperless/config/settings';

export class LogsController {
  /**
   * List available log files
   */
  async list(ctx: Context): Promise<void> {
    const logsDir = config.loggingDir;
    
    if (!fs.existsSync(logsDir)) {
      ctx.body = {
        count: 0,
        results: [],
      };
      return;
    }

    const files = fs.readdirSync(logsDir)
      .filter(file => file.endsWith('.log'))
      .map((file, index) => ({
        id: index + 1,
        name: file,
        path: path.join(logsDir, file),
        size: fs.statSync(path.join(logsDir, file)).size,
        modified: fs.statSync(path.join(logsDir, file)).mtime,
      }));

    ctx.body = {
      count: files.length,
      results: files,
    };
  }

  /**
   * Get specific log file content
   */
  async get(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    
    // List logs to get the file
    const logsDir = config.loggingDir;
    
    if (!fs.existsSync(logsDir)) {
      ctx.status = 404;
      ctx.body = { error: 'Logs directory not found' };
      return;
    }

    const files = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));
    
    if (id < 1 || id > files.length) {
      ctx.status = 404;
      ctx.body = { error: 'Log file not found' };
      return;
    }

    const filePath = path.join(logsDir, files[id - 1]);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Return last 1000 lines by default
    const lines = content.split('\n').slice(-1000);

    ctx.body = {
      name: files[id - 1],
      content: lines.join('\n'),
    };
  }
}

export default LogsController;
