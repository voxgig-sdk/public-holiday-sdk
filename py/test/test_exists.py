# ProjectName SDK exists test

import pytest
from publicholiday_sdk import PublicHolidaySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PublicHolidaySDK.test(None, None)
        assert testsdk is not None
