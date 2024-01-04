<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static MANAGER()
 * @method static static WEB_DEVELOPER()
 * @method static static WEB_DESIGNER()
 */
final class Roles extends Enum
{
    const MANAGER = 'Manager';
    const WEB_DEVELOPER = 'Web Developer';
    const WEB_DESIGNER = 'Web Designer';
}
