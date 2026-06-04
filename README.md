# PublicHoliday SDK

Look up public holidays, country info, and long weekends for 100+ countries

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Public Holiday API

[Nager.Date](https://date.nager.at) is an open-source service that publishes public holiday data for over 100 countries through a small JSON API. The project is community-maintained and hosted at `date.nager.at`, with contributions and sponsorship handled via GitHub.

What you get from the API:

- Public holidays for a given year and ISO 3166-1 alpha-2 country code (e.g. `GET /api/v3/PublicHolidays/{year}/{countryCode}`)
- The list of supported countries
- Per-country metadata such as region and bordering countries
- Long weekend computations for a given year and country
- Holiday records typically include the date, local name, English name, subdivision codes, and a type classification (Public, Bank, School, Authorities, Optional, Observance)

Operational notes: the API is served over HTTPS at `https://date.nager.at/api/v3`, requires no authentication, and has CORS enabled so it can be called directly from browsers. No rate limits are published, but please be a polite client.

## Try it

**TypeScript**
```bash
npm install public-holiday
```

**Python**
```bash
pip install public-holiday-sdk
```

**PHP**
```bash
composer require voxgig/public-holiday-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/public-holiday-sdk/go
```

**Ruby**
```bash
gem install public-holiday-sdk
```

**Lua**
```bash
luarocks install public-holiday-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PublicHolidaySDK } from 'public-holiday'

const client = new PublicHolidaySDK({})

// List all availablecountrys
const availablecountrys = await client.AvailableCountry().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o public-holiday-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "public-holiday": {
      "command": "/abs/path/to/public-holiday-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AvailableCountry** | The list of countries supported by the API, identified by ISO 3166-1 alpha-2 code and English name. | `/AvailableCountries` |
| **CountryInfo** | Per-country metadata such as common name, official name, region, and bordering countries. | `/CountryInfo/{CountryCode}` |
| **LongWeekend** | Computed long-weekend periods (a public holiday adjacent to a weekend, optionally with a bridge day) for a given year and country. | `/LongWeekend/{Year}/{CountryCode}` |
| **PublicHoliday** | Public holidays for a given year and country, available at `/api/v3/PublicHolidays/{year}/{countryCode}`, with fields like date, localName, name, countryCode, fixed flag, global flag, counties, launchYear, and types. | `/PublicHolidays/{Year}/{CountryCode}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from publicholiday_sdk import PublicHolidaySDK

client = PublicHolidaySDK({})

# List all availablecountrys
availablecountrys, err = client.AvailableCountry(None).list(None, None)
```

### PHP

```php
<?php
require_once 'publicholiday_sdk.php';

$client = new PublicHolidaySDK([]);

// List all availablecountrys
[$availablecountrys, $err] = $client->AvailableCountry(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/public-holiday-sdk/go"

client := sdk.NewPublicHolidaySDK(map[string]any{})

// List all availablecountrys
availablecountrys, err := client.AvailableCountry(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "PublicHoliday_sdk"

client = PublicHolidaySDK.new({})

# List all availablecountrys
availablecountrys, err = client.AvailableCountry(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("public-holiday_sdk")

local client = sdk.new({})

-- List all availablecountrys
local availablecountrys, err = client:AvailableCountry(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PublicHolidaySDK.test()
const result = await client.AvailableCountry().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PublicHolidaySDK.test(None, None)
result, err = client.AvailableCountry(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PublicHolidaySDK::test(null, null);
[$result, $err] = $client->AvailableCountry(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AvailableCountry(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PublicHolidaySDK.test(nil, nil)
result, err = client.AvailableCountry(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AvailableCountry(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Public Holiday API

- Upstream: [https://date.nager.at](https://date.nager.at)
- API docs: [https://date.nager.at/Api](https://date.nager.at/Api)

- Community-driven open-source project maintained by [Nager.Date](https://date.nager.at)
- Review the [Terms of Service](https://date.nager.at) and Privacy Policy before use
- Contributions, issue reports, and sponsorship are accepted via GitHub
- No explicit data-source attribution is published; verify holiday dates against authoritative sources where correctness matters

---

Generated from the Public Holiday API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
