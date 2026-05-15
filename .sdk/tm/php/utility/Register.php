<?php
declare(strict_types=1);

// PublicHoliday SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PublicHolidayUtility::setRegistrar(function (PublicHolidayUtility $u): void {
    $u->clean = [PublicHolidayClean::class, 'call'];
    $u->done = [PublicHolidayDone::class, 'call'];
    $u->make_error = [PublicHolidayMakeError::class, 'call'];
    $u->feature_add = [PublicHolidayFeatureAdd::class, 'call'];
    $u->feature_hook = [PublicHolidayFeatureHook::class, 'call'];
    $u->feature_init = [PublicHolidayFeatureInit::class, 'call'];
    $u->fetcher = [PublicHolidayFetcher::class, 'call'];
    $u->make_fetch_def = [PublicHolidayMakeFetchDef::class, 'call'];
    $u->make_context = [PublicHolidayMakeContext::class, 'call'];
    $u->make_options = [PublicHolidayMakeOptions::class, 'call'];
    $u->make_request = [PublicHolidayMakeRequest::class, 'call'];
    $u->make_response = [PublicHolidayMakeResponse::class, 'call'];
    $u->make_result = [PublicHolidayMakeResult::class, 'call'];
    $u->make_point = [PublicHolidayMakePoint::class, 'call'];
    $u->make_spec = [PublicHolidayMakeSpec::class, 'call'];
    $u->make_url = [PublicHolidayMakeUrl::class, 'call'];
    $u->param = [PublicHolidayParam::class, 'call'];
    $u->prepare_auth = [PublicHolidayPrepareAuth::class, 'call'];
    $u->prepare_body = [PublicHolidayPrepareBody::class, 'call'];
    $u->prepare_headers = [PublicHolidayPrepareHeaders::class, 'call'];
    $u->prepare_method = [PublicHolidayPrepareMethod::class, 'call'];
    $u->prepare_params = [PublicHolidayPrepareParams::class, 'call'];
    $u->prepare_path = [PublicHolidayPreparePath::class, 'call'];
    $u->prepare_query = [PublicHolidayPrepareQuery::class, 'call'];
    $u->result_basic = [PublicHolidayResultBasic::class, 'call'];
    $u->result_body = [PublicHolidayResultBody::class, 'call'];
    $u->result_headers = [PublicHolidayResultHeaders::class, 'call'];
    $u->transform_request = [PublicHolidayTransformRequest::class, 'call'];
    $u->transform_response = [PublicHolidayTransformResponse::class, 'call'];
});
