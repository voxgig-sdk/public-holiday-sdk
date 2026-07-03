<?php
declare(strict_types=1);

// PublicHoliday SDK configuration

class PublicHolidayConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PublicHoliday",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://date.nager.at/api/v3",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "available_country" => [],
                    "country_info" => [],
                    "long_weekend" => [],
                    "public_holiday" => [],
                ],
            ],
            "entity" => [
        'available_country' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'country_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
          ],
          'name' => 'available_country',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/AvailableCountries',
                  'parts' => [
                    'AvailableCountries',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'country_info' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'border',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'common_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'country_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'official_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'region',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
          ],
          'name' => 'country_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'AT',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'country_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/CountryInfo/{CountryCode}',
                  'parts' => [
                    'CountryInfo',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'CountryCode' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'long_weekend' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'day_count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'end_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'need_bridge_day',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'start_date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'long_weekend',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'AT',
                        'kind' => 'param',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 2026,
                        'kind' => 'param',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/LongWeekend/{Year}/{CountryCode}',
                  'parts' => [
                    'LongWeekend',
                    '{year}',
                    '{country_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'CountryCode' => 'country_code',
                      'Year' => 'year',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country_code',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'long_weekend',
              ],
            ],
          ],
        ],
        'public_holiday' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'country_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'county',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'fixed',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'global',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'launch_year',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'local_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 8,
            ],
          ],
          'name' => 'public_holiday',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'AT',
                        'kind' => 'param',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 2026,
                        'kind' => 'param',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/PublicHolidays/{Year}/{CountryCode}',
                  'parts' => [
                    'PublicHolidays',
                    '{year}',
                    '{country_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'CountryCode' => 'country_code',
                      'Year' => 'year',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country_code',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/NextPublicHolidaysWorldwide',
                  'parts' => [
                    'NextPublicHolidaysWorldwide',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'AT',
                        'kind' => 'param',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/IsTodayPublicHoliday/{CountryCode}',
                  'parts' => [
                    'IsTodayPublicHoliday',
                    '{country_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'CountryCode' => 'country_code',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country_code',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'AT',
                        'kind' => 'param',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/NextPublicHolidays/{CountryCode}',
                  'parts' => [
                    'NextPublicHolidays',
                    '{country_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'CountryCode' => 'country_code',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country_code',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'is_today_public_holiday',
              ],
              [
                'next_public_holiday',
              ],
              [
                'public_holiday',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PublicHolidayFeatures::make_feature($name);
    }
}
