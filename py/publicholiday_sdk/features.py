# PublicHoliday SDK feature factory

from publicholiday_sdk.feature.base_feature import PublicHolidayBaseFeature
from publicholiday_sdk.feature.ratelimit_feature import PublicHolidayRatelimitFeature
from publicholiday_sdk.feature.retry_feature import PublicHolidayRetryFeature
from publicholiday_sdk.feature.test_feature import PublicHolidayTestFeature
from publicholiday_sdk.feature.timeout_feature import PublicHolidayTimeoutFeature


_FEATURES = {
    "base": lambda: PublicHolidayBaseFeature(),
    "ratelimit": lambda: PublicHolidayRatelimitFeature(),
    "retry": lambda: PublicHolidayRetryFeature(),
    "test": lambda: PublicHolidayTestFeature(),
    "timeout": lambda: PublicHolidayTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
