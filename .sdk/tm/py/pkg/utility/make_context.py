# PublicHoliday SDK utility: make_context

from projectname_sdk.core.context import PublicHolidayContext


def make_context_util(ctxmap, basectx):
    return PublicHolidayContext(ctxmap, basectx)
