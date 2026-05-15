<?php
declare(strict_types=1);

// PublicHoliday SDK utility: feature_add

class PublicHolidayFeatureAdd
{
    public static function call(PublicHolidayContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
