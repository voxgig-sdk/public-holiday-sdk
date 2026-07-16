<?php
declare(strict_types=1);

// PublicHoliday SDK base feature

class PublicHolidayBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PublicHolidayContext $ctx, array $options): void {}
    public function PostConstruct(PublicHolidayContext $ctx): void {}
    public function PostConstructEntity(PublicHolidayContext $ctx): void {}
    public function SetData(PublicHolidayContext $ctx): void {}
    public function GetData(PublicHolidayContext $ctx): void {}
    public function GetMatch(PublicHolidayContext $ctx): void {}
    public function SetMatch(PublicHolidayContext $ctx): void {}
    public function PrePoint(PublicHolidayContext $ctx): void {}
    public function PreSpec(PublicHolidayContext $ctx): void {}
    public function PreRequest(PublicHolidayContext $ctx): void {}
    public function PreResponse(PublicHolidayContext $ctx): void {}
    public function PreResult(PublicHolidayContext $ctx): void {}
    public function PreDone(PublicHolidayContext $ctx): void {}
    public function PreUnexpected(PublicHolidayContext $ctx): void {}
}
