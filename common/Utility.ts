import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";
import * as IntentLauncher from "expo-intent-launcher";
import { Platform } from "react-native";
import { ImageRequest, SizeRequest, Address } from "../constants/Dtos";
import HttpClient from "../services/HttpClient";
import moment from "moment";

export default class Utility {
    private static readonly EVICTION_FREQUENCY: string = Constants.manifest.extra.cache.imageEvictionFrequency;
    private static readonly DEFAULT_POSITION: {latitude: number, longitude: number} = Constants.manifest.extra.defaultCurrentPosition;
    public static readonly LINE_SEPARATOR: string = '\n';

    static convertImageToDto(uri: string): ImageRequest {
        var collection = uri.split('/');
        var nameAndFormat = collection[collection.length - 1];
        var parts = nameAndFormat.split('.');
        return new ImageRequest(nameAndFormat, 'image/' + parts[1], uri);
    }

    static calculateURLCacheValue(evictionFrequency: string, now: Date = new Date()): string {
        switch (evictionFrequency) {
            case 'daily':   return now.toLocaleDateString();
            case 'weekly':  return String(moment(now).week());
            case 'monthly': return String(now.getMonth());
            case 'yearly':  return now.getFullYear().toString();
            default:        return now.toISOString();
        }
    }

    static remoteURI(_localURI: string, goodId: number, size: SizeRequest): string {
      return HttpClient.findImageURL(goodId, size, {key: 'cache', value : Utility.calculateURLCacheValue(Utility.EVICTION_FREQUENCY)});
    }

    static assignChildState<S extends any>(path: string, value: Object, previousState: S): S {
        var pieces = path.split(".");
        var newState = Object.assign({}, previousState);
        var current = newState;
        for (var i = 0; i < pieces.length - 1; ++i) {
            var piece = pieces[i];
            if ("[object Object]" === current[piece].toString()) {
                current[piece] = Object.assign({}, current[piece]);
            } else if (typeof "object" === current[piece] /* array */) {
                current[piece] = current[piece].concat();
            }
            current = current[piece];
        }
        current[pieces[i]] = value;
        return newState;
    }

    static formatAddress(address: Address): string {
        return address.postalCode + ' ' + address.country + Utility.LINE_SEPARATOR + address.region + ", " + address.city + Utility.LINE_SEPARATOR + address.street + Utility.LINE_SEPARATOR + address.name;
    }

    static async currentLocation(callback?: () => Promise<boolean>): Promise<{latitude: number, longitude: number}> {
        const extreme = Utility.DEFAULT_POSITION;
        return new Promise(resolve => {
            Utility.obtainPermission([Permissions.LOCATION], false, async () => {
                var result: Location.LocationData = await Location.getCurrentPositionAsync({});
                resolve({latitude: result.coords.latitude, longitude: result.coords.longitude});
            }, () => resolve(extreme), callback);
        });
    }

    static todayMidnigth(): Date {
        return moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate();
    }

    static async obtainPermission(types: Permissions.PermissionType[], doLinking: boolean, onGranted: () => Promise<void>, onDenied: () => void, beforeProcessStep: () => Promise<boolean> = () => new Promise(resolve => resolve(true))) {
        var shouldRequestAgain = (value: Permissions.PermissionResponse) => (!value.granted && "granted" != value.status);
        let response = await Permissions.getAsync(...types);
        if (shouldRequestAgain(response)) {
            if (await beforeProcessStep().then(acknowledged => !acknowledged)) {
                onDenied();
                return;
            }
            if (doLinking) {
                if ("ios" === Platform.OS) {
                    await Linking.openURL("app-settings:");
                } else if ("android" === Platform.OS) {
                    const pkg = Constants.manifest.releaseChannel ? Constants.manifest.android.package : "host.exp.exponent";
                    await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, { data: 'package:' + pkg });
                }
            }
            response = await Permissions.askAsync(...types);
        } else {
            await onGranted();
            return;
        }
        if (shouldRequestAgain(response)) {
            onDenied();
        } else {
            await onGranted();
        }
    }
}
