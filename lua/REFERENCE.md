# PublicHoliday Lua SDK Reference

Complete API reference for the PublicHoliday Lua SDK.


## PublicHolidaySDK

### Constructor

```lua
local sdk = require("public-holiday_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AvailableCountry(data)`

Create a new `AvailableCountry` entity instance. Pass `nil` for no initial data.

#### `CountryInfo(data)`

Create a new `CountryInfo` entity instance. Pass `nil` for no initial data.

#### `LongWeekend(data)`

Create a new `LongWeekend` entity instance. Pass `nil` for no initial data.

#### `PublicHoliday(data)`

Create a new `PublicHoliday` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AvailableCountryEntity

```lua
local available_country = client:AvailableCountry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `name` | `string` | No | Country name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AvailableCountry():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AvailableCountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CountryInfoEntity

```lua
local country_info = client:CountryInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `borders` | `table` | No | Bordering countries |
| `commonName` | `string` | No | Common name of the country |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `id` | `string` | No |  |
| `officialName` | `string` | No | Official name of the country |
| `region` | `string` | No | Region of the country |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CountryInfo():load({ id = "country_info_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LongWeekendEntity

```lua
local long_weekend = client:LongWeekend(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dayCount` | `number` | No | Number of days in the long weekend |
| `endDate` | `string` | No | End date of the long weekend |
| `needBridgeDay` | `boolean` | No | Whether a bridge day is needed |
| `startDate` | `string` | No | Start date of the long weekend |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LongWeekend():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LongWeekendEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicHolidayEntity

```lua
local public_holiday = client:PublicHoliday(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counties` | `table` | No | If it is not global you found here the Federal states (ISO-3166-2) |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `date` | `string` | No | The date of the holiday |
| `fixed` | `boolean` | No | Is this public holiday every year on the same date |
| `global` | `boolean` | No | Is this public holiday in every county (federal state) |
| `launchYear` | `number` | No | The launch year of the public holiday |
| `localName` | `string` | No | Local name of the holiday |
| `name` | `string` | No | English name of the holiday |
| `types` | `table` | No | The types of the public holiday. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PublicHoliday():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PublicHoliday():load({ country_code = "country_code" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicHolidayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

