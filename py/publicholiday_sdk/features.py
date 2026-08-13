# PublicHoliday SDK feature factory

from publicholiday_sdk.feature.base_feature import PublicHolidayBaseFeature
from publicholiday_sdk.feature.test_feature import PublicHolidayTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PublicHolidayBaseFeature(),
        "test": lambda: PublicHolidayTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
