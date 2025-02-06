import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  // private async logToFile(entry: string, filename: string) {
  //   try {
  //     const timestamp = new Date().toISOString();
  //     const formattedEntry = `[${timestamp}] ${entry}\n`;
  //     const logPath = path.join(this.logDirectory, filename);

  //     // Menulis log ke file secara asynchronous
  //     await fsPromises.appendFile(logPath, formattedEntry, 'utf8');
  //   } catch (error) {
  //     super.error(`Failed to write to log file: ${error.message}`);
  //   }
  // }

  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(
          path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
          formattedEntry,
        );
      }

      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error)
        console.error(` Error creating log directory: ${e.message}`);
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);

    super.error(message, stackOrContext);
  }
}
