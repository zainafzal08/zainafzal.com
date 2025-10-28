export const QUICK_LINKS = {
    "g:wj": "https://github.com/zainafzal08/Experiments/tree/master/worry-journal",
    "kf": "https://zainafzal08.github.io/kitty-font/",
};

export function getQuickLink(target: keyof typeof QUICK_LINKS) {
    return `${window.location.origin}?ql=${target}`;
}