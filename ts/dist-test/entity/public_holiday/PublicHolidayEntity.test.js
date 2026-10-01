"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PublicHolidayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PUBLIC_HOLIDAY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PUBLIC_HOLIDAY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PublicHolidaySDK.test();
        const ent = testsdk.PublicHoliday();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_holiday.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "counties": { "a": true, "h": "Counties", "n": "counties", "r": false, "sh": "If it is not global you found here the Federal states (ISO-3166-2)", "t": "`$ARRAY`", "key$": "counties", "index$": 0 }, "countryCode": { "a": true, "h": "Country Code", "n": "countryCode", "r": false, "sh": "ISO 3166-1 alpha-2 country code", "t": "`$STRING`", "key$": "countryCode", "index$": 1 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": false, "sh": "The date of the holiday", "t": "`$STRING`", "key$": "date", "index$": 2 }, "fixed": { "a": true, "h": "Fixed", "n": "fixed", "r": false, "sh": "Is this public holiday every year on the same date", "t": "`$BOOLEAN`", "key$": "fixed", "index$": 3 }, "global": { "a": true, "h": "Global", "n": "global", "r": false, "sh": "Is this public holiday in every county (federal state)", "t": "`$BOOLEAN`", "key$": "global", "index$": 4 }, "launchYear": { "a": true, "h": "Launch Year", "n": "launchYear", "r": false, "sh": "The launch year of the public holiday", "t": "`$INTEGER`", "key$": "launchYear", "index$": 5 }, "localName": { "a": true, "h": "Local Name", "n": "localName", "r": false, "sh": "Local name of the holiday", "t": "`$STRING`", "key$": "localName", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "English name of the holiday", "t": "`$STRING`", "key$": "name", "index$": 7 }, "types": { "a": true, "h": "Types", "n": "types", "r": false, "sh": "The types of the public holiday.", "t": "`$ARRAY`", "key$": "types", "index$": 8 } }, "name": "public_holiday", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /PublicHolidays/{Year}/{CountryCode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "AT", "k": "param", "n": "country_code", "or": "CountryCode", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 2026, "k": "param", "n": "year", "or": "Year", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/PublicHolidays/{Year}/{CountryCode}", "q": { "exist": ["country_code", "year"] }, "r": { "param": { "CountryCode": "country_code", "Year": "year" } }, "s": [{ "lit": "PublicHolidays" }, { "var": "year" }, { "var": "country_code" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /NextPublicHolidaysWorldwide", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/NextPublicHolidaysWorldwide", "q": {}, "r": {}, "s": [{ "lit": "NextPublicHolidaysWorldwide" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /IsTodayPublicHoliday/{CountryCode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "AT", "k": "param", "n": "country_code", "or": "CountryCode", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/IsTodayPublicHoliday/{CountryCode}", "q": { "exist": ["country_code", "offset"] }, "r": { "param": { "CountryCode": "country_code" } }, "s": [{ "lit": "IsTodayPublicHoliday" }, { "var": "country_code" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /NextPublicHolidays/{CountryCode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "AT", "k": "param", "n": "country_code", "or": "CountryCode", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/NextPublicHolidays/{CountryCode}", "q": { "exist": ["country_code"] }, "r": { "param": { "CountryCode": "country_code" } }, "s": [{ "lit": "NextPublicHolidays" }, { "var": "country_code" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "public_holiday", "name__orig": "public_holiday", "Name": "PublicHoliday", "name_": "public_holiday", "name-": "public-holiday", "NAME": "PUBLIC_HOLIDAY", "index$": 3 }, { "active": true, "entity": "public_holiday", "key$": "BasicPublicHolidayFlow", "kind": "basic", "name": "BasicPublicHolidayFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "public_holiday_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "public_holiday_ref01", "srcdatavar": "public_holiday_ref01_data", "suffix": "_dt0" }, "m": { "id": "public_holiday01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_holiday_ref01" } }], "index$": 1 }] }, 'PublicHoliday', { "GET /PublicHolidays/{Year}/{CountryCode}": { "protocol": "http", "parameters": [{ "name": "Year", "in": "path", "description": "The year to retrieve holidays for", "required": true, "schema": { "type": "integer", "example": 2026 }, "index$": 0 }, { "name": "CountryCode", "in": "path", "description": "ISO 3166-1 alpha-2 country code", "required": true, "schema": { "type": "string", "minLength": 2, "maxLength": 2, "example": "AT" }, "index$": 1 }] }, "GET /NextPublicHolidaysWorldwide": { "protocol": "http", "parameters": [] }, "GET /IsTodayPublicHoliday/{CountryCode}": { "protocol": "http", "parameters": [{ "name": "CountryCode", "in": "path", "description": "ISO 3166-1 alpha-2 country code", "required": true, "schema": { "type": "string", "minLength": 2, "maxLength": 2, "example": "AT" }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Timezone offset in hours", "required": false, "schema": { "type": "integer" }, "index$": 1 }] }, "GET /NextPublicHolidays/{CountryCode}": { "protocol": "http", "parameters": [{ "name": "CountryCode", "in": "path", "description": "ISO 3166-1 alpha-2 country code", "required": true, "schema": { "type": "string", "minLength": 2, "maxLength": 2, "example": "AT" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let public_holiday_ref01_data = Object.values(setup.data.existing.public_holiday)[0];
        // LIST
        const public_holiday_ref01_ent = client.PublicHoliday();
        const public_holiday_ref01_match = {};
        const public_holiday_ref01_list = (await public_holiday_ref01_ent.list(public_holiday_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_holiday/PublicHolidayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PublicHolidaySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_holiday01', 'public_holiday02', 'public_holiday03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID': idmap,
        'PUBLIC_HOLIDAY_TEST_LIVE': 'FALSE',
        'PUBLIC_HOLIDAY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID'];
    const live = 'TRUE' === env.PUBLIC_HOLIDAY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PUBLIC_HOLIDAY_TEST_PUBLIC_HOLIDAY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PublicHolidaySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PUBLIC_HOLIDAY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PublicHolidayEntity.test.js.map