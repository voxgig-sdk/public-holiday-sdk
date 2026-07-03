# PublicHoliday Golang SDK



The Golang SDK for the PublicHoliday API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/public-holiday-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/public-holiday-sdk/go=../path/to/github.com/voxgig-sdk/public-holiday-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/public-holiday-sdk/go"
    "github.com/voxgig-sdk/public-holiday-sdk/go/core"
)

func main() {
    client := sdk.NewPublicHolidaySDK(map[string]any{
        "apikey": os.Getenv("PUBLIC-HOLIDAY_APIKEY"),
    })
```

### 2. List availablecountrys

```go
    result, err := client.AvailableCountry(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewPublicHolidaySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewPublicHolidaySDK

```go
func NewPublicHolidaySDK(options map[string]any) *PublicHolidaySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *PublicHolidaySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PublicHolidaySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AvailableCountry` | `(data map[string]any) PublicHolidayEntity` | Create a AvailableCountry entity instance. |
| `CountryInfo` | `(data map[string]any) PublicHolidayEntity` | Create a CountryInfo entity instance. |
| `LongWeekend` | `(data map[string]any) PublicHolidayEntity` | Create a LongWeekend entity instance. |
| `PublicHoliday` | `(data map[string]any) PublicHolidayEntity` | Create a PublicHoliday entity instance. |

### Entity interface (PublicHolidayEntity)

All entities implement the `PublicHolidayEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### AvailableCountry

| Field | Description |
| --- | --- |
| `"country_code"` |  |
| `"name"` |  |

Operations: List.

API path: `/AvailableCountries`

#### CountryInfo

| Field | Description |
| --- | --- |
| `"border"` |  |
| `"common_name"` |  |
| `"country_code"` |  |
| `"official_name"` |  |
| `"region"` |  |

Operations: Load.

API path: `/CountryInfo/{CountryCode}`

#### LongWeekend

| Field | Description |
| --- | --- |
| `"day_count"` |  |
| `"end_date"` |  |
| `"need_bridge_day"` |  |
| `"start_date"` |  |

Operations: List.

API path: `/LongWeekend/{Year}/{CountryCode}`

#### PublicHoliday

| Field | Description |
| --- | --- |
| `"country_code"` |  |
| `"county"` |  |
| `"date"` |  |
| `"fixed"` |  |
| `"global"` |  |
| `"launch_year"` |  |
| `"local_name"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/PublicHolidays/{Year}/{CountryCode}`



## Entities


### AvailableCountry

Create an instance: `available_country := client.AvailableCountry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.AvailableCountry(nil).List(nil, nil)
```


### CountryInfo

Create an instance: `country_info := client.CountryInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `border` | ``$ARRAY`` |  |
| `common_name` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `official_name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.CountryInfo(nil).Load(map[string]any{"id": "country_info_id"}, nil)
```


### LongWeekend

Create an instance: `long_weekend := client.LongWeekend(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `day_count` | ``$INTEGER`` |  |
| `end_date` | ``$STRING`` |  |
| `need_bridge_day` | ``$BOOLEAN`` |  |
| `start_date` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.LongWeekend(nil).List(nil, nil)
```


### PublicHoliday

Create an instance: `public_holiday := client.PublicHoliday(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.PublicHoliday(nil).Load(map[string]any{"id": "public_holiday_id"}, nil)
```

#### Example: List

```go
results, err := client.PublicHoliday(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/public-holiday-sdk/go/
├── public-holiday.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/public-holiday-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
