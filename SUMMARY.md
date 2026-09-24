# Public Holiday API

An API for public holiday data. Supports over 100 countries. Provides information on holidays and long weekends. The API provides a simple way to query the holidays of over 100 countries, including long weekends. For IoT devices, there&#39;s an endpoint to check if today is a holiday.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 4 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AvailableCountry

Results: Successful response with list of available countries.

SDK operations: `list`.

Key fields to recognise:

- `countryCode`: ISO 3166-1 alpha-2 country code
- `name`: Country name

### CountryInfo

Results: Successful response with country information.

SDK operations: `load`.

Key fields to recognise:

- `borders`: Bordering countries
- `commonName`: Common name of the country
- `countryCode`: ISO 3166-1 alpha-2 country code
- `officialName`: Official name of the country
- `region`: Region of the country

### LongWeekend

Results: Successful response with list of long weekends.

SDK operations: `list`.

Key fields to recognise:

- `dayCount`: Number of days in the long weekend
- `endDate`: End date of the long weekend
- `needBridgeDay`: Whether a bridge day is needed
- `startDate`: Start date of the long weekend

### PublicHoliday

Results: Successful response with list of public holidays; Successful response with next public holidays worldwide; Today is a public holiday; Today is not a public holiday; Successful response with next public holidays.

SDK operations: `list`, `load`.

Key fields to recognise:

- `counties`: If it is not global you found here the Federal states (ISO-3166-2)
- `countryCode`: ISO 3166-1 alpha-2 country code
- `date`: The date of the holiday
- `fixed`: Is this public holiday every year on the same date
- `global`: Is this public holiday in every county (federal state)

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AvailableCountry | `list` | `GET /AvailableCountries` | See reference |
| CountryInfo | `load` | `GET /CountryInfo/{CountryCode}` | See reference |
| LongWeekend | `list` | `GET /LongWeekend/{Year}/{CountryCode}` | See reference |
| PublicHoliday | `list` | `GET /PublicHolidays/{Year}/{CountryCode}` | See reference |
| PublicHoliday | `list` | `GET /NextPublicHolidaysWorldwide` | See reference |
| PublicHoliday | `load` | `GET /IsTodayPublicHoliday/{CountryCode}` | See reference |
| PublicHoliday | `load` | `GET /NextPublicHolidays/{CountryCode}` | See reference |

## Connect to the API

- Production server: `https://date.nager.at/api/v3`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `public-holiday_list`: List records for an entity. Supported entities: `available_country`, `long_weekend`, `public_holiday`.
- `public-holiday_load`: Load one record for an entity. Supported entities: `country_info`, `public_holiday`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

