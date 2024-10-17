export const delayTime = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

