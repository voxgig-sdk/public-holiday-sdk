# PublicHoliday Ruby SDK Reference

Complete API reference for the PublicHoliday Ruby SDK.


## PublicHolidaySDK

### Constructor

```ruby
require_relative 'PublicHoliday_sdk'

client = PublicHolidaySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PublicHolidaySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = PublicHolidaySDK.test
```


### Instance Methods

#### `AvailableCountry(data = nil)`

Create a new `AvailableCountry` entity instance. Pass `nil` for no initial data.

#### `CountryInfo(data = nil)`

Create a new `CountryInfo` entity instance. Pass `nil` for no initial data.

#### `LongWeekend(data = nil)`

Create a new `LongWeekend` entity instance. Pass `nil` for no initial data.

#### `PublicHoliday(data = nil)`

Create a new `PublicHoliday` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AvailableCountryEntity

```ruby
available_country = client.AvailableCountry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `String` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AvailableCountry.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AvailableCountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CountryInfoEntity

```ruby
country_info = client.CountryInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `border` | `Array` | No |  |
| `common_name` | `String` | No |  |
| `country_code` | `String` | No |  |
| `official_name` | `String` | No |  |
| `region` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CountryInfo.load({ "id" => "country_info_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CountryInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LongWeekendEntity

```ruby
long_weekend = client.LongWeekend
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `day_count` | `Integer` | No |  |
| `end_date` | `String` | No |  |
| `need_bridge_day` | `Boolean` | No |  |
| `start_date` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.LongWeekend.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LongWeekendEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicHolidayEntity

```ruby
public_holiday = client.PublicHoliday
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `String` | No |  |
| `county` | `Array` | No |  |
| `date` | `String` | No |  |
| `fixed` | `Boolean` | No |  |
| `global` | `Boolean` | No |  |
| `launch_year` | `Integer` | No |  |
| `local_name` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PublicHoliday.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PublicHoliday.load({ "country_code" => "country_code" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicHolidayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = PublicHolidaySDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

