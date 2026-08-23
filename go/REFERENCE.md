# PublicHoliday Golang SDK Reference

Complete API reference for the PublicHoliday Golang SDK.


## PublicHolidaySDK

### Constructor

```go
func NewPublicHolidaySDK(options map[string]any) *PublicHolidaySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *PublicHolidaySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *PublicHolidaySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AvailableCountry(data map[string]any) PublicHolidayEntity`

Create a new `AvailableCountry` entity instance. Pass `nil` for no initial data.

#### `CountryInfo(data map[string]any) PublicHolidayEntity`

Create a new `CountryInfo` entity instance. Pass `nil` for no initial data.

#### `LongWeekend(data map[string]any) PublicHolidayEntity`

Create a new `LongWeekend` entity instance. Pass `nil` for no initial data.

#### `PublicHoliday(data map[string]any) PublicHolidayEntity`

Create a new `PublicHoliday` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AvailableCountryEntity

```go
availableCountry := client.AvailableCountry(nil)
fmt.Println(availableCountry.GetName()) // "available_country"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `name` | `string` | No | Country name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AvailableCountry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AvailableCountryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CountryInfoEntity

```go
countryInfo := client.CountryInfo(nil)
fmt.Println(countryInfo.GetName()) // "country_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `borders` | `[]any` | No | Bordering countries |
| `commonName` | `string` | No | Common name of the country |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `officialName` | `string` | No | Official name of the country |
| `region` | `string` | No | Region of the country |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CountryInfo(nil).Load(map[string]any{"id": "country_info_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CountryInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LongWeekendEntity

```go
longWeekend := client.LongWeekend(nil)
fmt.Println(longWeekend.GetName()) // "long_weekend"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dayCount` | `int` | No | Number of days in the long weekend |
| `endDate` | `string` | No | End date of the long weekend |
| `needBridgeDay` | `bool` | No | Whether a bridge day is needed |
| `startDate` | `string` | No | Start date of the long weekend |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LongWeekend(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LongWeekendEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicHolidayEntity

```go
publicHoliday := client.PublicHoliday(nil)
fmt.Println(publicHoliday.GetName()) // "public_holiday"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counties` | `[]any` | No | If it is not global you found here the Federal states (ISO-3166-2) |
| `countryCode` | `string` | No | ISO 3166-1 alpha-2 country code |
| `date` | `string` | No | The date of the holiday |
| `fixed` | `bool` | No | Is this public holiday every year on the same date |
| `global` | `bool` | No | Is this public holiday in every county (federal state) |
| `launchYear` | `int` | No | The launch year of the public holiday |
| `localName` | `string` | No | Local name of the holiday |
| `name` | `string` | No | English name of the holiday |
| `types` | `[]any` | No | The types of the public holiday. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PublicHoliday(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PublicHoliday(nil).Load(map[string]any{"country_code": "country_code"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicHolidayEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewPublicHolidaySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

