package voxgigpublicholidaysdk

import (
	"github.com/voxgig-sdk/public-holiday-sdk/go/core"
	"github.com/voxgig-sdk/public-holiday-sdk/go/entity"
	"github.com/voxgig-sdk/public-holiday-sdk/go/feature"
	_ "github.com/voxgig-sdk/public-holiday-sdk/go/utility"
)

// Type aliases preserve external API.
type PublicHolidaySDK = core.PublicHolidaySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PublicHolidayEntity = core.PublicHolidayEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PublicHolidayError = core.PublicHolidayError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAvailableCountryEntityFunc = func(client *core.PublicHolidaySDK, entopts map[string]any) core.PublicHolidayEntity {
		return entity.NewAvailableCountryEntity(client, entopts)
	}
	core.NewCountryInfoEntityFunc = func(client *core.PublicHolidaySDK, entopts map[string]any) core.PublicHolidayEntity {
		return entity.NewCountryInfoEntity(client, entopts)
	}
	core.NewLongWeekendEntityFunc = func(client *core.PublicHolidaySDK, entopts map[string]any) core.PublicHolidayEntity {
		return entity.NewLongWeekendEntity(client, entopts)
	}
	core.NewPublicHolidayEntityFunc = func(client *core.PublicHolidaySDK, entopts map[string]any) core.PublicHolidayEntity {
		return entity.NewPublicHolidayEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPublicHolidaySDK = core.NewPublicHolidaySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
