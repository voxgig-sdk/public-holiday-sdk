# PublicHoliday SDK utility: make_context

from core.context import PublicHolidayContext


def make_context_util(ctxmap, basectx):
    return PublicHolidayContext(ctxmap, basectx)
