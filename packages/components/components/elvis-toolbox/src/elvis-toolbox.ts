const throttle = (func: any, limit: number) => {
    let inThrottle: boolean | NodeJS.Timeout;
    return (...args: any) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = setTimeout(() => (inThrottle = false), limit);
        }
    };
};

export default { throttle: throttle }
