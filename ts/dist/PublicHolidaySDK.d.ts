import { AvailableCountryEntity } from './entity/AvailableCountryEntity';
import { CountryInfoEntity } from './entity/CountryInfoEntity';
import { LongWeekendEntity } from './entity/LongWeekendEntity';
import { PublicHolidayEntity } from './entity/PublicHolidayEntity';
export type * from './PublicHolidayTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PublicHolidayEntityBase } from './PublicHolidayEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PublicHolidaySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AvailableCountry(entopts?: Record<string, any>): AvailableCountryEntity;
    CountryInfo(entopts?: Record<string, any>): CountryInfoEntity;
    LongWeekend(entopts?: Record<string, any>): LongWeekendEntity;
    PublicHoliday(entopts?: Record<string, any>): PublicHolidayEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PublicHolidaySDK;
    tester(testopts?: any, sdkopts?: any): PublicHolidaySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PublicHolidaySDK;
export { stdutil, config, BaseFeature, PublicHolidayEntityBase, PublicHolidaySDK, SDK, };
