<?php
declare(strict_types=1);

// PublicHoliday SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PublicHolidayFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PublicHolidayBaseFeature();
            case "test":
                return new PublicHolidayTestFeature();
            default:
                return new PublicHolidayBaseFeature();
        }
    }
}
