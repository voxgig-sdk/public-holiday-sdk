import { PublicHolidayEntityBase } from '../PublicHolidayEntityBase';
import type { PublicHolidaySDK } from '../PublicHolidaySDK';
import type { Control } from '../types';
import type { LongWeekend, LongWeekendListMatch } from '../PublicHolidayTypes';
declare class LongWeekendEntity extends PublicHolidayEntityBase<LongWeekend> {
    constructor(client: PublicHolidaySDK, entopts: any);
    make(this: LongWeekendEntity): LongWeekendEntity;
    list(this: any, reqmatch?: LongWeekendListMatch, ctrl?: Control): Promise<LongWeekendEntity[]>;
}
export { LongWeekendEntity };
