import { PublicHolidayEntityBase } from '../PublicHolidayEntityBase';
import type { PublicHolidaySDK } from '../PublicHolidaySDK';
import type { Control } from '../types';
import type { AvailableCountry, AvailableCountryListMatch } from '../PublicHolidayTypes';
declare class AvailableCountryEntity extends PublicHolidayEntityBase<AvailableCountry> {
    constructor(client: PublicHolidaySDK, entopts: any);
    make(this: AvailableCountryEntity): AvailableCountryEntity;
    list(this: any, reqmatch?: AvailableCountryListMatch, ctrl?: Control): Promise<AvailableCountryEntity[]>;
}
export { AvailableCountryEntity };
