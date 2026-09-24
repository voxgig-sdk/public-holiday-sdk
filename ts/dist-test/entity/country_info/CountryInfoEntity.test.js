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
(0, node_test_1.describe)('CountryInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PUBLIC_HOLIDAY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PUBLIC_HOLIDAY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PublicHolidaySDK.test();
        const ent = testsdk.CountryInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PUBLIC_HOLIDAY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'country_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "borders": { "a": true, "h": "Borders", "n": "borders", "r": false, "sh": "Bordering countries", "t": "`$ARRAY`", "key$": "borders", "index$": 0 }, "commonName": { "a": true, "h": "Common Name", "n": "commonName", "r": false, "sh": "Common name of the country", "t": "`$STRING`", "key$": "commonName", "index$": 1 }, "countryCode": { "a": true, "h": "Country Code", "n": "countryCode", "r": false, "sh": "ISO 3166-1 alpha-2 country code", "t": "`$STRING`", "key$": "countryCode", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "officialName": { "a": true, "h": "Official Name", "n": "officialName", "r": false, "sh": "Official name of the country", "t": "`$STRING`", "key$": "officialName", "index$": 4 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region of the country", "t": "`$STRING`", "key$": "region", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "country_info", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /CountryInfo/{CountryCode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "AT", "k": "param", "n": "id", "or": "country_code", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/CountryInfo/{CountryCode}", "q": { "exist": ["id"] }, "r": { "param": { "CountryCode": "id" } }, "s": [{ "lit": "CountryInfo" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "country_info", "name__orig": "country_info", "Name": "CountryInfo", "name_": "country_info", "name-": "country-info", "NAME": "COUNTRY_INFO", "index$": 1 }, { "active": true, "entity": "country_info", "key$": "BasicCountryInfoFlow", "kind": "basic", "name": "BasicCountryInfoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "country_info_ref01", "srcdatavar": "country_info_ref01_data", "suffix": "_dt0" }, "m": { "id": "country_info01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-country_info_ref01" } }], "index$": 0 }] }, 'CountryInfo', { "GET /CountryInfo/{CountryCode}": { "protocol": "http", "operationId": "getCountryInfo", "responses": { "200": { "description": "Successful response with country information", "content": { "application/json": { "schema": { "type": "object", "properties": { "commonName": { "type": "string", "description": "Common name of the country", "example": "Austria", "key$": "commonName" }, "officialName": { "type": "string", "description": "Official name of the country", "example": "Republic of Austria", "key$": "officialName" }, "countryCode": { "type": "string", "description": "ISO 3166-1 alpha-2 country code", "example": "AT", "key$": "countryCode" }, "region": { "type": "string", "description": "Region of the country", "example": "Europe", "key$": "region" }, "borders": { "type": "array", "items": { "type": "object", "properties": { "countryCode": { "type": "string", "description": "ISO 3166-1 alpha-2 country code", "example": "AT", "key$": "countryCode" }, "name": { "type": "string", "description": "Country name", "example": "Austria", "key$": "name" } }, "x-ref": "#/components/schemas/Country" }, "description": "Bordering countries", "key$": "borders" } }, "x-ref": "#/components/schemas/CountryInfo", "index$": 0 } } } }, "404": { "description": "Country not found" } }, "parameters": [{ "name": "CountryCode", "in": "path", "description": "ISO 3166-1 alpha-2 country code", "required": true, "schema": { "type": "string", "minLength": 2, "maxLength": 2, "example": "AT" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let country_info_ref01_data = Object.values(setup.data.existing.country_info)[0];
        // LOAD
        const country_info_ref01_ent = client.CountryInfo();
        const country_info_ref01_match_dt0 = {};
        country_info_ref01_match_dt0.id = country_info_ref01_data.id;
        const country_info_ref01_data_dt0 = (await country_info_ref01_ent.load(country_info_ref01_match_dt0)).data();
        (0, node_assert_1.default)(country_info_ref01_data_dt0.id === country_info_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/country_info/CountryInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PublicHolidaySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['country_info01', 'country_info02', 'country_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID': idmap,
        'PUBLIC_HOLIDAY_TEST_LIVE': 'FALSE',
        'PUBLIC_HOLIDAY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID'];
    const live = 'TRUE' === env.PUBLIC_HOLIDAY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PUBLIC_HOLIDAY_TEST_COUNTRY_INFO_ENTID'];
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
//# sourceMappingURL=CountryInfoEntity.test.js.map