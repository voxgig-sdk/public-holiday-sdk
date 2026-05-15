<?php
declare(strict_types=1);

// PublicHoliday SDK utility: result_headers

class PublicHolidayResultHeaders
{
    public static function call(PublicHolidayContext $ctx): ?PublicHolidayResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
