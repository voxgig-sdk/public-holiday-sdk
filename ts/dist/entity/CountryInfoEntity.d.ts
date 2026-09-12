import { PublicHolidayEntityBase } from '../PublicHolidayEntityBase';
import type { PublicHolidaySDK } from '../PublicHolidaySDK';
import type { Control } from '../types';
import type { CountryInfo, CountryInfoLoadMatch } from '../PublicHolidayTypes';
declare class CountryInfoEntity extends PublicHolidayEntityBase<CountryInfo> {
    constructor(client: PublicHolidaySDK, entopts: any);
    make(this: CountryInfoEntity): CountryInfoEntity;
    load(this: any, reqmatch?: CountryInfoLoadMatch, ctrl?: Control): Promise<CountryInfoEntity>;
}
export { CountryInfoEntity };
