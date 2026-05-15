# PublicHoliday SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PublicHolidayUtility.registrar = ->(u) {
  u.clean = PublicHolidayUtilities::Clean
  u.done = PublicHolidayUtilities::Done
  u.make_error = PublicHolidayUtilities::MakeError
  u.feature_add = PublicHolidayUtilities::FeatureAdd
  u.feature_hook = PublicHolidayUtilities::FeatureHook
  u.feature_init = PublicHolidayUtilities::FeatureInit
  u.fetcher = PublicHolidayUtilities::Fetcher
  u.make_fetch_def = PublicHolidayUtilities::MakeFetchDef
  u.make_context = PublicHolidayUtilities::MakeContext
  u.make_options = PublicHolidayUtilities::MakeOptions
  u.make_request = PublicHolidayUtilities::MakeRequest
  u.make_response = PublicHolidayUtilities::MakeResponse
  u.make_result = PublicHolidayUtilities::MakeResult
  u.make_point = PublicHolidayUtilities::MakePoint
  u.make_spec = PublicHolidayUtilities::MakeSpec
  u.make_url = PublicHolidayUtilities::MakeUrl
  u.param = PublicHolidayUtilities::Param
  u.prepare_auth = PublicHolidayUtilities::PrepareAuth
  u.prepare_body = PublicHolidayUtilities::PrepareBody
  u.prepare_headers = PublicHolidayUtilities::PrepareHeaders
  u.prepare_method = PublicHolidayUtilities::PrepareMethod
  u.prepare_params = PublicHolidayUtilities::PrepareParams
  u.prepare_path = PublicHolidayUtilities::PreparePath
  u.prepare_query = PublicHolidayUtilities::PrepareQuery
  u.result_basic = PublicHolidayUtilities::ResultBasic
  u.result_body = PublicHolidayUtilities::ResultBody
  u.result_headers = PublicHolidayUtilities::ResultHeaders
  u.transform_request = PublicHolidayUtilities::TransformRequest
  u.transform_response = PublicHolidayUtilities::TransformResponse
}
