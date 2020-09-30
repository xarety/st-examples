import chalk from 'chalk';

class Log {
    info(...text: string[]) {
        process.stdout.write(chalk.bold.cyan(...text) + '\n');
    }

    success(...text: string[]) {
        process.stdout.write(chalk.bold.green(...text) + '\n');
    }

    warning(...text: string[]) {
        process.stdout.write(chalk.bold.keyword('orange')(...text) + '\n');
    }

    error(...text: string[]) {
        process.stdout.write(chalk.bold.red(...text) + '\n');
    }
}

export const log = new Log();

export function logErrors(_0: any, _1: string, descriptor: PropertyDescriptor) {
    const origin = descriptor.value;

    if (typeof origin !== 'function') {
        return;
    }

    descriptor.value = function (...args: any[]) {
        try {
            const result = origin.apply(this, args);

            if (result instanceof Promise) {
                result.catch(e => {
                    log.error(e.toString());
                    throw e;
                });
            }

            return result;
        } catch (e) {
            log.error(e.toString());
            throw e;
        }
    };
}
