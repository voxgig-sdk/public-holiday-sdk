# PublicHoliday Python SDK Reference

Complete API reference for the PublicHoliday Python SDK.


## PublicHolidaySDK

### Constructor

```python
from publicholiday_sdk import PublicHolidaySDK

client = PublicHolidaySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PublicHolidaySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PublicHolidaySDK.test()
```


### Instance Methods

#### `AvailableCountry(data=None)`

Create a new `AvailableCountryEntity` instance. Pass `None` for no initial data.

#### `CountryInfo(data=None)`

Create a new `CountryInfoEntity` instance. Pass `None` for no initial data.

#### `LongWeekend(data=None)`

Create a new `LongWeekendEntity` instance. Pass `None` for no initial data.

#### `PublicHoliday(data=None)`

Create a new `PublicHolidayEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AvailableCountryEntity

```python
available_country = client.AvailableCountry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AvailableCountry().list()
for available_country in results:
    print(available_country)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AvailableCountryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CountryInfoEntity

```python
country_info = client.CountryInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `border` | `list` | No |  |
| `common_name` | `str` | No |  |
| `country_code` | `str` | No |  |
| `official_name` | `str` | No |  |
| `region` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CountryInfo().load({"id": "country_info_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LongWeekendEntity

```python
long_weekend = client.LongWeekend()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `day_count` | `int` | No |  |
| `end_date` | `str` | No |  |
| `need_bridge_day` | `bool` | No |  |
| `start_date` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LongWeekend().list()
for long_weekend in results:
    print(long_weekend)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LongWeekendEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicHolidayEntity

```python
public_holiday = client.PublicHoliday()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `str` | No |  |
| `county` | `list` | No |  |
| `date` | `str` | No |  |
| `fixed` | `bool` | No |  |
| `global` | `bool` | No |  |
| `launch_year` | `int` | No |  |
| `local_name` | `str` | No |  |
| `name` | `str` | No |  |
| `type` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PublicHoliday().list()
for public_holiday in results:
    print(public_holiday)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PublicHoliday().load({"country_code": "country_code"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicHolidayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = PublicHolidaySDK({
    "feature": {
        "test": {"active": True},
    },
})
```

