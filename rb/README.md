# PublicHoliday Ruby SDK



The Ruby SDK for the PublicHoliday API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
gem install public-holiday-sdk
```

Or add to your `Gemfile`:

```ruby
gem "public-holiday-sdk"
```

Then run:

```bash
bundle install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "PublicHoliday_sdk"

client = PublicHolidaySDK.new({
  "apikey" => ENV["PUBLIC-HOLIDAY_APIKEY"],
})
```

### 2. List availablecountrys

```ruby
result, err = client.AvailableCountry().list
raise err if err

if result.is_a?(Array)
  result.each do |item|
    d = item.data_get
    puts "#{d["id"]} #{d["name"]}"
  end
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
raise err if err

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
end
```

### Prepare a request without sending it

```ruby
fetchdef, err = client.prepare({
  "path" => "/api/resource/{id}",
  "method" => "DELETE",
  "params" => { "id" => "example" },
})
raise err if err

puts fetchdef["url"]
puts fetchdef["method"]
puts fetchdef["headers"]
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = PublicHolidaySDK.test

result, err = client.PublicHoliday().load({ "id" => "test01" })
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = PublicHolidaySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
PUBLIC-HOLIDAY_TEST_LIVE=TRUE
PUBLIC-HOLIDAY_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### PublicHolidaySDK

```ruby
require_relative "PublicHoliday_sdk"
client = PublicHolidaySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = PublicHolidaySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PublicHolidaySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> [Hash, err]` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> [Hash, err]` | Build and send an HTTP request. |
| `AvailableCountry` | `(data) -> AvailableCountryEntity` | Create a AvailableCountry entity instance. |
| `CountryInfo` | `(data) -> CountryInfoEntity` | Create a CountryInfo entity instance. |
| `LongWeekend` | `(data) -> LongWeekendEntity` | Create a LongWeekend entity instance. |
| `PublicHoliday` | `(data) -> PublicHolidayEntity` | Create a PublicHoliday entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> [any, err]` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> [any, err]` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> [any, err]` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> [any, err]` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> [any, err]` | Remove an entity. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return `[any, err]`. The first value is a
`Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### AvailableCountry

| Field | Description |
| --- | --- |
| `country_code` |  |
| `name` |  |

Operations: List.

API path: `/AvailableCountries`

#### CountryInfo

| Field | Description |
| --- | --- |
| `border` |  |
| `common_name` |  |
| `country_code` |  |
| `official_name` |  |
| `region` |  |

Operations: Load.

API path: `/CountryInfo/{CountryCode}`

#### LongWeekend

| Field | Description |
| --- | --- |
| `day_count` |  |
| `end_date` |  |
| `need_bridge_day` |  |
| `start_date` |  |

Operations: List.

API path: `/LongWeekend/{Year}/{CountryCode}`

#### PublicHoliday

| Field | Description |
| --- | --- |
| `country_code` |  |
| `county` |  |
| `date` |  |
| `fixed` |  |
| `global` |  |
| `launch_year` |  |
| `local_name` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/PublicHolidays/{Year}/{CountryCode}`



## Entities


### AvailableCountry

Create an instance: `const available_country = client.AvailableCountry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```ts
const available_countrys = await client.AvailableCountry().list()
```


### CountryInfo

Create an instance: `const country_info = client.CountryInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `border` | ``$ARRAY`` |  |
| `common_name` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `official_name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```ts
const country_info = await client.CountryInfo().load({ id: 'country_info_id' })
```


### LongWeekend

Create an instance: `const long_weekend = client.LongWeekend()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `day_count` | ``$INTEGER`` |  |
| `end_date` | ``$STRING`` |  |
| `need_bridge_day` | ``$BOOLEAN`` |  |
| `start_date` | ``$STRING`` |  |

#### Example: List

```ts
const long_weekends = await client.LongWeekend().list()
```


### PublicHoliday

Create an instance: `const public_holiday = client.PublicHoliday()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `county` | ``$ARRAY`` |  |
| `date` | ``$STRING`` |  |
| `fixed` | ``$BOOLEAN`` |  |
| `global` | ``$BOOLEAN`` |  |
| `launch_year` | ``$INTEGER`` |  |
| `local_name` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$ARRAY`` |  |

#### Example: Load

```ts
const public_holiday = await client.PublicHoliday().load({ id: 'public_holiday_id' })
```

#### Example: List

```ts
const public_holidays = await client.PublicHoliday().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── PublicHoliday_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`PublicHoliday_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
moon = client.Moon
moon.load({ "planet_id" => "earth", "id" => "luna" })

# moon.data_get now returns the loaded moon data
# moon.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
