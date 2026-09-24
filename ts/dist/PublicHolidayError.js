"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicHolidayError = void 0;
class PublicHolidayError extends Error {
    isPublicHolidayError = true;
    sdk = 'PublicHoliday';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PublicHolidayError = PublicHolidayError;
//# sourceMappingURL=PublicHolidayError.js.map