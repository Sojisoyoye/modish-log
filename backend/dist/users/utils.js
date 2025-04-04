"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = void 0;
const formatNumber = (value) => {
    const num = Number(value);
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
};
exports.formatNumber = formatNumber;
