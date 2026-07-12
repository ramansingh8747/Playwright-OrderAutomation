class Logger {
 static info(message) {
    const time = new Date().toLocaleString();
    console.log(`[${time}] [INFO] ${message}`);
}

    static error(message) {
        const time = new Date().toLocaleString();
        console.error(`[${time}] [ERROR] ${message}`);
    }
}

export { Logger };