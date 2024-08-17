"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAndCompareContent = void 0;
function extractAndCompareContent(input1, input2) {
    const regex = /['"]([^'"]*)['"]/;
    const match1 = regex.exec(input1);
    const content1 = match1 && match1[1] ? match1[1] : input1;
    const match2 = regex.exec(input2);
    const content2 = match2 && match2[1] ? match2[1] : input2;
    return content1 === content2;
}
exports.extractAndCompareContent = extractAndCompareContent;
//# sourceMappingURL=string-and-id-compare.helper.js.map