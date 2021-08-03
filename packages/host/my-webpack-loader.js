module.exports = function (content, map, meta) {
    content += `console.log(typeof __webpack_modules__[require.resolveWeak('@servicetitan/dependency')])\n`;
    content += `console.log(__webpack_modules__[require.resolveWeak('@servicetitan/dependency')])\n`;
    this.callback(null, content, map, meta);
    return;
};
