<?php
declare(strict_types=1);

// PublicHoliday SDK utility: prepare_body

class PublicHolidayPrepareBody
{
    public static function call(PublicHolidayContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
