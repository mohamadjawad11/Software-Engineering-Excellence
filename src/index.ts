import logger from "./util/logger.js";
import { readCsv } from "./util/parser.js";


async function main() {
  const data = await readCsv('src/data/restaurant_sales_data.csv',true);
  data.forEach((row) => {
    logger.info(`Row: ${row.join(', ')}`);
  });
}

main();