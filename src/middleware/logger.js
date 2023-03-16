import { format, createLogger, transports } from "winston";
const { combine, label, json } = format;
import winstonDailyRotateFile from "winston-daily-rotate-file";

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "7d",
});

const logger = createLogger({
  level: "debug",
  format: format.combine(format.timestamp(),format.json()),
  transports: [fileRotateTransport, new transports.Console()],
});

export default logger;