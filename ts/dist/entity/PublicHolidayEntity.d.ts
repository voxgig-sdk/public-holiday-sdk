import { PublicHolidayEntityBase } from '../PublicHolidayEntityBase';
import type { PublicHolidaySDK } from '../PublicHolidaySDK';
import type { Control } from '../types';
import type { PublicHoliday, PublicHolidayLoadMatch, PublicHolidayListMatch } from '../PublicHolidayTypes';
declare class PublicHolidayEntity extends PublicHolidayEntityBase<PublicHoliday> {
    constructor(client: PublicHolidaySDK, entopts: any);
    make(this: PublicHolidayEntity): PublicHolidayEntity;
    load(this: any, reqmatch?: PublicHolidayLoadMatch, ctrl?: Control): Promise<PublicHolidayEntity>;
    list(this: any, reqmatch?: PublicHolidayListMatch, ctrl?: Control): Promise<PublicHolidayEntity[]>;
}
export { PublicHolidayEntity };
