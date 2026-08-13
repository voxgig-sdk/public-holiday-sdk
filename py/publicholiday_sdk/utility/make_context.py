# PublicHoliday SDK utility: make_context

from publicholiday_sdk.core.context import PublicHolidayContext


def make_context_util(ctxmap, basectx):
    return PublicHolidayContext(ctxmap, basectx)
