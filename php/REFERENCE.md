# PublicHoliday PHP SDK Reference

Complete API reference for the PublicHoliday PHP SDK.


## PublicHolidaySDK

### Constructor

```php
require_once __DIR__ . '/publicholiday_sdk.php';

$client = new PublicHolidaySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PublicHolidaySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PublicHolidaySDK::test();
```


### Instance Methods

#### `AvailableCountry($data = null)`

Create a new `AvailableCountryEntity` instance. Pass `null` for no initial data.

#### `CountryInfo($data = null)`

Create a new `CountryInfoEntity` instance. Pass `null` for no initial data.

#### `LongWeekend($data = null)`

Create a new `LongWeekendEntity` instance. Pass `null` for no initial data.

#### `PublicHoliday($data = null)`

Create a new `PublicHolidayEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): PublicHolidayUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AvailableCountryEntity

```php
$available_country = $client->AvailableCountry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `name` | `string` | No | Country name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AvailableCountry()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AvailableCountryEntity`

Create a new `AvailableCountryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CountryInfoEntity

```php
$country_info = $client->CountryInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `borders` | `array` | No | Bordering countries |
| `commonName` | `string` | No | Common name of the country |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `id` | `string` | No |  |
| `officialName` | `string` | No | Official name of the country |
| `region` | `string` | No | Region of the country |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CountryInfo()->load(["id" => "country_info_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CountryInfoEntity`

Create a new `CountryInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LongWeekendEntity

```php
$long_weekend = $client->LongWeekend();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dayCount` | `int` | No | Number of days in the long weekend |
| `endDate` | `string` | No | End date of the long weekend |
| `needBridgeDay` | `bool` | No | Whether a bridge day is needed |
| `startDate` | `string` | No | Start date of the long weekend |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LongWeekend()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LongWeekendEntity`

Create a new `LongWeekendEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicHolidayEntity

```php
$public_holiday = $client->PublicHoliday();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counties` | `array` | No | If it is not global you found here the Federal states (ISO-3166-2) |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `date` | `string` | No | The date of the holiday |
| `fixed` | `bool` | No | Is this public holiday every year on the same date |
| `global` | `bool` | No | Is this public holiday in every county (federal state) |
| `launchYear` | `int` | No | The launch year of the public holiday |
| `localName` | `string` | No | Local name of the holiday |
| `name` | `string` | No | English name of the holiday |
| `types` | `array` | No | The types of the public holiday. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PublicHoliday()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PublicHoliday()->load(["country_code" => "country_code"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicHolidayEntity`

Create a new `PublicHolidayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new PublicHolidaySDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

