const isDev = import.meta.env.DEV;

type LogLevel = "log" | "info" | "warn" | "error";

function createLogger(level: LogLevel) {
  return (...args: unknown[]) => {
    if (isDev) {
      console[level](`[${level.toUpperCase()}]`, ...args);
    }
  };
}

export const logger = {
  log: createLogger("log"),
  info: createLogger("info"),
  warn: createLogger("warn"),
  error: createLogger("error"),
};
