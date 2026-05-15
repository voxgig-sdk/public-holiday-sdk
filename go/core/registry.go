package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAvailableCountryEntityFunc func(client *PublicHolidaySDK, entopts map[string]any) PublicHolidayEntity

var NewCountryInfoEntityFunc func(client *PublicHolidaySDK, entopts map[string]any) PublicHolidayEntity

var NewLongWeekendEntityFunc func(client *PublicHolidaySDK, entopts map[string]any) PublicHolidayEntity

var NewPublicHolidayEntityFunc func(client *PublicHolidaySDK, entopts map[string]any) PublicHolidayEntity

