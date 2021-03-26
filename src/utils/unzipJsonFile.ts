import * as fs from 'fs';
import * as path from 'path';
import { ungzip } from 'node-gzip';

export const unzipJsonFile = async (filePath: string) => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) { 
    const file = fs.readFileSync(fullPath);
    if (file) {
      const contents = await ungzip(file);
      if (contents) {
        return JSON.parse(contents.toString());
      }
    }
  }
  return null;
}