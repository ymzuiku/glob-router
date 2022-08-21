import fs from "fs-extra";
import { resolve } from "path";
const cwd = (...args: string[]) => resolve(process.cwd(), ...args);

export default async function (input: string, out: string, fileName: string) {
  const outPath = cwd(input, fileName);
  if (fs.existsSync(outPath)) {
    const data = await fs.readFile(outPath);
    if (String(data) != out) {
      await fs.writeFile(outPath, out);
    }
  } else {
    await fs.writeFile(outPath, out);
  }
}
