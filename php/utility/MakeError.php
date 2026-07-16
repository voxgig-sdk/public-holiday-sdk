<?php
declare(strict_types=1);

// PublicHoliday SDK utility: make_error

require_once __DIR__ . '/../core/Operation.php';
require_once __DIR__ . '/../core/Result.php';
require_once __DIR__ . '/../core/Error.php';

class PublicHolidayMakeError
{
    public static function call(?PublicHolidayContext $ctx, mixed $err): mixed
    {
        if ($ctx === null) {
            require_once __DIR__ . '/../core/Context.php';
            $ctx = new PublicHolidayContext([], null);
        }
        $op = $ctx->op ?? new PublicHolidayOperation([]);
        $opname = $op->name;
        if ($opname === '' || $opname === '_') {
            $opname = 'unknown operation';
        }

        $result = $ctx->result ?? new PublicHolidayResult([]);
        $result->ok = false;

        if ($err === null) {
            $err = $result->err;
        }
        if ($err === null) {
            $err = $ctx->make_error('unknown', 'unknown error');
        }

        $errmsg = ($err instanceof PublicHolidayError) ? $err->msg : (string)$err;
        $msg = "PublicHolidaySDK: {$opname}: {$errmsg}";
        $msg = ($ctx->utility->clean)($ctx, $msg);

        $result->err = null;
        $spec = $ctx->spec;

        if ($ctx->ctrl->explain) {
            $ctx->ctrl->explain['err'] = ['message' => $msg];
        }

        $sdk_err = new PublicHolidayError('', $msg, $ctx);
        $sdk_err->result = ($ctx->utility->clean)($ctx, $result);
        $sdk_err->spec = ($ctx->utility->clean)($ctx, $spec);
        if ($err instanceof PublicHolidayError) {
            $sdk_err->sdk_code = $err->sdk_code;
        }

        $ctx->ctrl->err = $sdk_err;

        // Fire PreUnexpected so observability features (metrics, telemetry,
        // audit, debug) close/record error paths that never reach PreDone
        // (e.g. a PrePoint rbac short-circuit). Fires after ctx.ctrl.err is set
        // so hooks can read the error; features guard against double-recording
        // when PreDone already fired.
        if (isset($ctx->utility) && isset($ctx->utility->feature_hook)) {
            ($ctx->utility->feature_hook)($ctx, "PreUnexpected");
        }

        if ($ctx->ctrl->throw_err === false) {
            return $result->resdata;
        }
        throw $sdk_err;
    }
}
