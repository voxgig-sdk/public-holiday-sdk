# PublicHoliday Python SDK Reference

Complete API reference for the PublicHoliday Python SDK.


## PublicHolidaySDK

### Constructor

```python
from public-holiday_sdk import PublicHolidaySDK

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
available_country = client.available_country
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.available_country.list({})
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
country_info = client.country_info
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `border` | ``$ARRAY`` | No |  |
| `common_name` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `official_name` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.country_info.load({"id": "country_info_id"})
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
long_weekend = client.long_weekend
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `day_count` | ``$INTEGER`` | No |  |
| `end_date` | ``$STRING`` | No |  |
| `need_bridge_day` | ``$BOOLEAN`` | No |  |
| `start_date` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.long_weekend.list({})
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
public_holiday = client.public_holiday
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | ``$STRING`` | No |  |
| `county` | ``$ARRAY`` | No |  |
| `date` | ``$STRING`` | No |  |
| `fixed` | ``$BOOLEAN`` | No |  |
| `global` | ``$BOOLEAN`` | No |  |
| `launch_year` | ``$INTEGER`` | No |  |
| `local_name` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.public_holiday.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.public_holiday.load({"id": "public_holiday_id"})
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

