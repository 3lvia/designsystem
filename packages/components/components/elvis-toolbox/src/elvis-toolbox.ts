export const throttle = (func: any, limit: number) => {
    let inThrottle: boolean | NodeJS.Timeout;
    return (...args: any) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = setTimeout(() => (inThrottle = false), limit);
        }
    };
};
export class a11y {
    outline = () => {
        // TODO: Add UNIQUE globally scoped variable & if guard to prevent seperate listeners for each component  
        document.body.classList.add('ewc-no-outline');
        document.documentElement.addEventListener('keydown', function (e) {
            if (e.keyCode === 9) {
                document.body.classList.remove('ewc-no-outline');
            }
        });

        document.documentElement.addEventListener(
            'click',
            function (event) {
                document.body.classList.add('ewc-no-outline');
            },
            false
        );
    }
}