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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "counties", "req": false, "short": "If it is not global you found here the Federal states (ISO-3166-2)", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "countryCode", "req": false, "short": "ISO 3166-1 alpha-2 country code", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date", "name": "date", "req": false, "short": "The date of the holiday", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "fixed", "req": false, "short": "Is this public holiday every year on the same date", "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "name": "global", "req": false, "short": "Is this public holiday in every county (federal state)", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "launchYear", "req": false, "short": "The launch year of the public holiday", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "localName", "req": false, "short": "Local name of the holiday", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "name", "req": false, "short": "English name of the holiday", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "types", "req": false, "short": "The types of the public holiday.", "type": "`$ARRAY`", "index$": 8 }], "name": "public_holiday", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "AT", "kind": "param", "name": "country_code", "orig": "country_code", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 2026, "kind": "param", "name": "year", "orig": "year", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /PublicHolidays/{Year}/{CountryCode}", "json": "{\"operationId\":\"getPublicHolidays\",\"parameters\":[{\"description\":\"The year to retrieve holidays for\",\"in\":\"path\",\"name\":\"Year\",\"required\":true,\"schema\":{\"example\":2026,\"type\":\"integer\"}},{\"description\":\"ISO 3166-1 alpha-2 country code\",\"in\":\"path\",\"name\":\"CountryCode\",\"required\":true,\"schema\":{\"example\":\"AT\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"counties\":null,\"countryCode\":\"AT\",\"date\":\"2017-01-01\",\"fixed\":true,\"global\":true,\"launchYear\":1967,\"localName\":\"Neujahr\",\"name\":\"New Year's Day\",\"types\":[\"Public\"]},{\"counties\":null,\"countryCode\":\"AT\",\"date\":\"2017-01-06\",\"fixed\":true,\"global\":true,\"launchYear\":null,\"localName\":\"Heilige Drei Könige\",\"name\":\"Epiphany\",\"types\":[\"Public\"]}],\"schema\":{\"items\":{\"properties\":{\"counties\":{\"description\":\"If it is not global you found here the Federal states (ISO-3166-2)\",\"items\":{\"type\":\"string\"},\"nullable\":true,\"type\":\"array\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"AT\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the holiday\",\"example\":\"2017-01-01\",\"format\":\"date\",\"type\":\"string\"},\"fixed\":{\"description\":\"Is this public holiday every year on the same date\",\"example\":true,\"type\":\"boolean\"},\"global\":{\"description\":\"Is this public holiday in every county (federal state)\",\"example\":true,\"type\":\"boolean\"},\"launchYear\":{\"description\":\"The launch year of the public holiday\",\"example\":1967,\"nullable\":true,\"type\":\"integer\"},\"localName\":{\"description\":\"Local name of the holiday\",\"example\":\"Neujahr\",\"type\":\"string\"},\"name\":{\"description\":\"English name of the holiday\",\"example\":\"New Year's Day\",\"type\":\"string\"},\"types\":{\"description\":\"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)\",\"items\":{\"enum\":[\"Public\",\"Bank\",\"School\",\"Authorities\",\"Optional\",\"Observance\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of public holidays\"},\"400\":{\"description\":\"Invalid year or country code format\"},\"404\":{\"description\":\"Country not found or no holidays available for the specified year\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/PublicHolidays/{Year}/{CountryCode}", "rename": { "param": { "CountryCode": "country_code", "Year": "year" } }, "segments": [{ "lit": "PublicHolidays" }, { "var": "year" }, { "var": "country_code" }], "select": { "exist": ["country_code", "year"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /NextPublicHolidaysWorldwide", "json": "{\"operationId\":\"getNextPublicHolidaysWorldwide\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"counties\":{\"description\":\"If it is not global you found here the Federal states (ISO-3166-2)\",\"items\":{\"type\":\"string\"},\"nullable\":true,\"type\":\"array\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"AT\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the holiday\",\"example\":\"2017-01-01\",\"format\":\"date\",\"type\":\"string\"},\"fixed\":{\"description\":\"Is this public holiday every year on the same date\",\"example\":true,\"type\":\"boolean\"},\"global\":{\"description\":\"Is this public holiday in every county (federal state)\",\"example\":true,\"type\":\"boolean\"},\"launchYear\":{\"description\":\"The launch year of the public holiday\",\"example\":1967,\"nullable\":true,\"type\":\"integer\"},\"localName\":{\"description\":\"Local name of the holiday\",\"example\":\"Neujahr\",\"type\":\"string\"},\"name\":{\"description\":\"English name of the holiday\",\"example\":\"New Year's Day\",\"type\":\"string\"},\"types\":{\"description\":\"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)\",\"items\":{\"enum\":[\"Public\",\"Bank\",\"School\",\"Authorities\",\"Optional\",\"Observance\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with next public holidays worldwide\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/NextPublicHolidaysWorldwide", "segments": [{ "lit": "NextPublicHolidaysWorldwide" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "AT", "kind": "param", "name": "country_code", "orig": "country_code", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /IsTodayPublicHoliday/{CountryCode}", "json": "{\"operationId\":\"isTodayPublicHoliday\",\"parameters\":[{\"description\":\"ISO 3166-1 alpha-2 country code\",\"in\":\"path\",\"name\":\"CountryCode\",\"required\":true,\"schema\":{\"example\":\"AT\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}},{\"description\":\"Timezone offset in hours\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Today is a public holiday\"},\"204\":{\"description\":\"Today is not a public holiday\"},\"404\":{\"description\":\"Country not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/IsTodayPublicHoliday/{CountryCode}", "rename": { "param": { "CountryCode": "country_code" } }, "segments": [{ "lit": "IsTodayPublicHoliday" }, { "var": "country_code" }], "select": { "exist": ["country_code", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "AT", "kind": "param", "name": "country_code", "orig": "country_code", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /NextPublicHolidays/{CountryCode}", "json": "{\"operationId\":\"getNextPublicHolidays\",\"parameters\":[{\"description\":\"ISO 3166-1 alpha-2 country code\",\"in\":\"path\",\"name\":\"CountryCode\",\"required\":true,\"schema\":{\"example\":\"AT\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"counties\":{\"description\":\"If it is not global you found here the Federal states (ISO-3166-2)\",\"items\":{\"type\":\"string\"},\"nullable\":true,\"type\":\"array\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"AT\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the holiday\",\"example\":\"2017-01-01\",\"format\":\"date\",\"type\":\"string\"},\"fixed\":{\"description\":\"Is this public holiday every year on the same date\",\"example\":true,\"type\":\"boolean\"},\"global\":{\"description\":\"Is this public holiday in every county (federal state)\",\"example\":true,\"type\":\"boolean\"},\"launchYear\":{\"description\":\"The launch year of the public holiday\",\"example\":1967,\"nullable\":true,\"type\":\"integer\"},\"localName\":{\"description\":\"Local name of the holiday\",\"example\":\"Neujahr\",\"type\":\"string\"},\"name\":{\"description\":\"English name of the holiday\",\"example\":\"New Year's Day\",\"type\":\"string\"},\"types\":{\"description\":\"The types of the public holiday. Public (Bank holiday, banks and offices are closed), Bank (Bank holiday, banks and offices are closed), School (School holiday, schools are closed), Authorities (Authorities are closed), Optional (Majority of people take a day off), Observance (Optional festivity, no paid day off)\",\"items\":{\"enum\":[\"Public\",\"Bank\",\"School\",\"Authorities\",\"Optional\",\"Observance\"],\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with next public holidays\"},\"404\":{\"description\":\"Country not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/NextPublicHolidays/{CountryCode}", "rename": { "param": { "CountryCode": "country_code" } }, "segments": [{ "lit": "NextPublicHolidays" }, { "var": "country_code" }], "select": { "exist": ["country_code"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["is_today_public_holiday"], ["next_public_holiday"], ["public_holiday"]] }, "key$": "public_holiday", "name__orig": "public_holiday", "Name": "PublicHoliday", "name_": "public_holiday", "name-": "public-holiday", "NAME": "PUBLIC_HOLIDAY", "index$": 3 }, { "active": true, "entity": "public_holiday", "key$": "BasicPublicHolidayFlow", "kind": "basic", "name": "BasicPublicHolidayFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "public_holiday_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "public_holiday_ref01", "srcdatavar": "public_holiday_ref01_data", "suffix": "_dt0" }, "match": { "id": "public_holiday01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_holiday_ref01" } }], "index$": 1 }] }, 'PublicHoliday');
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
    let idmap = transform(['public_holiday01', 'public_holiday02', 'public_holiday03', 'is_today_public_holiday01', 'is_today_public_holiday02', 'is_today_public_holiday03', 'next_public_holiday01', 'next_public_holiday02', 'next_public_holiday03', 'public_holiday01', 'public_holiday02', 'public_holiday03'], {
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