<?php
declare(strict_types=1);

// PublicHoliday SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PublicHolidayMakeContext
{
    public static function call(array $ctxmap, ?PublicHolidayContext $basectx): PublicHolidayContext
    {
        return new PublicHolidayContext($ctxmap, $basectx);
    }
}
